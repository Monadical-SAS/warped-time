/*
    Usage:
        window.store = createStore(combineReducers({time, ...}))

        window.time = new WarpedTime(window.store)

        time.getWarpedTime() => 3241
        window.store.dispatch({type: 'SET_SPEED', speed: -1})
        time.getWarpedTime() = 3100

*/

import {select_time, time} from './reducers.js'


class WarpedTime {
    constructor({store, speed, server_time, warped_time,
                 genesis_time, timeSource=Date}={}) {
        this.store = store
        this.timeSource = timeSource
        this.speed = 1
        this._lastTime = timeSource.now()
        this._currTime = this._lastTime
        this.server_offset = 0

        if (speed !== undefined) {
            this.setSpeed(speed)
        }
        if (server_time !== undefined) {
            this.setActualTime(server_time)
        }
        if (warped_time !== undefined) {
            this.setWarpedTime(warped_time)
        }
        this.genesis_time = genesis_time || this.getWarpedTime()
        this.most_future_time = this.getWarpedTime()

        if (store) {
            this.store.subscribe(this.handleStateChange.bind(this))
        }
    }

    setSpeed(speed) {
        raise_if_not_number(speed, '@WarpedTime.setSpeed')
        this.speed = speed
        return this.getWarpedTime()
    }

    getSystemTime() {
        return this.timeSource.now()
    }

    getActualTime() {
        return this.getSystemTime() + this.server_offset
    }

    setActualTime(server_time, duration) {
        raise_if_not_number(server_time, '@WarpedTime.setActualTime')
        const system_time = this.getSystemTime()
        const final_offset = server_time - system_time

        if (duration) {
            debugger
            // TODO: test this gradual adjustment code
            const step_time = 10
            const total_steps = duration/step_time
            const step_amt = (final_offset - this.server_offset)/total_steps
            let step = 0
            const adjuster = () => {
                this.server_offset += step_amt
                step += 1
                if (step < total_steps && this.server_offset != final_offset) {
                    setTimemout(adjuster, 10)
                }
            }
            return this.getActualTime()
        } else {
            this.server_offset = final_offset
            return this.getActualTime()
        }
    }

    getWarpedTime() {
        const actualTime = this.getActualTime()
        this._currTime += (actualTime - this._lastTime) * this.speed
        this._lastTime = actualTime
        this.most_future_time = Math.max(this.most_future_time, this._currTime)
        return this._currTime
    }

    setWarpedTime(timestamp, duration) {
        raise_if_not_number(timestamp, '@WarpedTime.setWarpedTime')
        if (duration) {
            // TODO: gradual syncing not implemented yet
            console.error('Passing 2nd argument duration is not supported yet.')
            debugger
        } else {
            this._lastTime = this.getActualTime()
            this._currTime = timestamp
            return this.getWarpedTime()
        }
    }

    handleStateChange() {
        const speed = select_time(this.store.getState()).speed
        if (speed !== null) {
            this.setSpeed(speed)
        }
        const warped_time = select_time(this.store.getState()).warped_time
        if (warped_time !== null) {
            this.setWarpedTime(warped_time)
        }
    }
}

const raise_if_not_number = (n, msg) => {
    if (!(typeof n === 'number')) {
        throw `Expected a number but got ${typeof n}.${msg? '\n' + msg : ''}`
    }
}


export {WarpedTime, time}
