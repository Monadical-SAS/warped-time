import {WarpedTime} from './main.js'

const assert = (val, error_msg) => {
    if (!val) {
        console.log(`[X] AssertionError: ${error_msg} (${val})`)
    } else {
        process ? process.stdout.write('.') : console.log('.')
    }
}

const start_time = Date.now()
const time_source_mock = {
    now: () => 100
}

const wt = new WarpedTime({
    timeSource: time_source_mock,
})

wt.setSpeed(2)
assert(wt.speed === 2)

wt.setWarpedTime(5)
assert(wt.getWarpedTime() === 5)

time_source_mock.now = () => 110

// should be 2 * 10 + 5
assert(wt.getWarpedTime() === 25)


wt.setActualTime(115)
assert(wt.getActualTime() === 115)
