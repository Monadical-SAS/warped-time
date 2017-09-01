import {WarpedTime, Tick} from './main.js'

import {TimeControls} from './controls.js'

// util functions
const assert = (val, error_msg) => {
    if (!val) {
        console.log(`[X] AssertionError: ${error_msg} (${val})`)
    } else {
        process ? process.stdout.write('.') : console.log('.')
    }
}

const assert_fuzzy_equal_time = (val1, val2, error_msg) => {
    assert(Math.abs(val1 - val2) < 25, error_msg)
}


// Tests with a real time source
const start_time = Date.now()
const time_passed = () => Date.now() - start_time

const wt1 = new WarpedTime()

assert_fuzzy_equal_time(wt1.genesis_time, start_time,
                        'wt.genesis_time - start_time == '
                        + (wt1.genesis_time - start_time)
                        + ' but should be ~0')

assert_fuzzy_equal_time(wt1.getWarpedTime(), Date.now(),
                        'wt.getWarpedTime() - Date.now() == '
                        + (wt1.getWarpedTime() - Date.now())
                        + ' but should be ~0')


wt1.setSpeed(0.1)
setTimeout(
    () => assert_fuzzy_equal_time(wt1.getWarpedTime(), start_time + time_passed() / 10,
                                  'wt.getWarpedTime() - start_time + time_passed / 10 == '
                                  + (wt1.getWarpedTime() - start_time + time_passed() / 10)
                                  + ' but should be ~0.'
                                  + ' start_time=' + start_time
                                  + ' time_passed=' + time_passed())
    , 100
)

const wt2 = new WarpedTime()
const t = 500
wt2.setWarpedTime(t)
const speed = 5
wt2.setSpeed(speed)
const delay = 100
setTimeout(
    () => assert_fuzzy_equal_time(wt2.getWarpedTime(), t + (delay * speed),
                                  'wt.getWarpedTime() - t + (delay * speed) == '
                                  + (wt2.getWarpedTime() - t + (delay * speed))
                                  + ' but should be ~0')
    , delay
)


// Tests with time_source mocked out
const time_source_mock = {
    now: () => 100
}

const wt3 = new WarpedTime({
    timeSource: time_source_mock,
})
assert(wt3.genesis_time === 100, `expected 5, got ${wt3.genesis_time}`)

wt3.setSpeed(2)
assert(wt3.speed === 2, `expected 2, got ${wt3.speed}`)

wt3.setWarpedTime(5)
assert(wt3.getWarpedTime() === 5, `expected 5, got ${wt3.getWarpedTime()}`)

time_source_mock.now = () => 110

// should be 2 * 10 + 5
assert(wt3.getWarpedTime() === 25, `expected 25, got ${wt3.getWarpedTime()}`)


wt3.setActualTime(115)
assert(wt3.getActualTime() === 115, `expected 115, got ${wt3.getActualTime()}`)


// Test TimeControls class
class TestableTick extends Tick {
    tick() {
        this.subscribers.forEach((fn) => fn())
        if (this.running) {
            setTimeout(::this.tick, 2)
        }
    }
}

class TestableTimeControls extends TimeControls {
    tick() {
        this.state = this.computeState()
    }
}


const tick = new TestableTick()
assert(Array.isArray(tick.subscribers), `expected an Array, got ${typeof(tick.subscribers)}`)
assert(tick.running === true, `expected true, got ${tick.running}`)

const controls_start = Date.now()
const props = {time: new WarpedTime(), tick: tick}
const controls = new TestableTimeControls(props)

let state = controls.computeState()
assert_fuzzy_equal_time(state.genesis_time, controls_start,
                        `expected ${controls_start}, got ${state.genesis_time}`)


controls.time.setWarpedTime(t)
assert_fuzzy_equal_time(controls.time.getWarpedTime(), t,
                        `expected ${t}, got ${controls.time.getWarpedTime()}`)

controls.time.setSpeed(speed)
setTimeout(
    () => {
        const warped_time = controls.state.warped_time
        assert_fuzzy_equal_time(warped_time, t + (delay * speed),
                                  'warped_time - t + (delay * speed) == '
                                  + (warped_time - (t + (delay * speed)))
                                  + ' but should be ~0.\n'
                                  + `warped_time: ${warped_time}`
                                  + `, t: ${t}, delay: ${delay}, speed: ${speed}`)
    }, delay
)

tick.stop()
