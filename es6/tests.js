import {WarpedTime, Ticker} from './main.js'

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
const speed = 5
const delay = 100
wt2.setWarpedTime(t)
wt2.setSpeed(speed)

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
