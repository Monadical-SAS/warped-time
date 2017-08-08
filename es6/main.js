/*
    Usage:
        window.store = createStore(combineReducers({time, ...}))

        window.time = new WarpedTime(window.store)

        time.getWarpedTime() => 3241
        window.store.dispatch({type: 'SET_TIME_WARP', speed: -1})
        time.getWarpedTime() = 3100

*/

import {select, time} from './reducers.js'
import {TimeControls, TimeControlsComponent, ServerTimeControls} from './controls.js'


class WarpedTime {
    constructor(store=null, speed, server_time, warped_time) {
        this.store = store
        this.speed = 1
        this._lastTime = (new Date).getTime()
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

        if (store) {
            this.store.subscribe(this.handleStateChange.bind(this))
        }
    }

    setSpeed(speed) {
        this.speed = speed
    }

    getSystemTime() {
        return (new Date).getTime()
    }

    getActualTime() {
        return this.getSystemTime() + this.server_offset
    }

    setActualTime(server_time, duration) {
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
        return this._currTime
    }

    setWarpedTime(timestamp, duration) {
        if (duration) {
            // TODO: gradual syncing not implemented yet
            debugger
        } else {
            this._lastTime = timestamp
            this._curTime = this.getActualTime()
            return this.getWarpedTime()
        }
    }

    handleStateChange() {
        this.setSpeed(select(this.store.getState()).speed)
    }
}

export {WarpedTime, time, TimeControls, TimeControlsComponent}
