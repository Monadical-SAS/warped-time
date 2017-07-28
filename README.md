# warped-time: Control the progression of time [![npm version](https://badge.fury.io/js/warped-time.svg)](https://badge.fury.io/js/warped-time)  [![Github Stars](https://img.shields.io/github/stars/Monadical-SAS/warped-time.svg)](https://github.com/Monadical-SAS/warped-time) [![Twitter URL](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/thesquashSH)

▶️ [API](#api) | [Info](#info) | [redux-time](https://github.com/Monadical-SAS/redux-time) | [Example](https://monadical-sas.github.io/warped-time/examples/demo.html) | [Source](https://github.com/Monadical-SaS/warped-time/)

Simple Javascript library that provides an equivalent to `Date.getTime()` with variable progression speed.

It has a hook to receive timestamps and estimated latency, which it uses to stay in sync with a backend server's time.

**[LIVE DEMO](https://monadical-sas.github.io/warped-time/examples/demo.html)**

```bash
yarn add warped-time    # ⏱
```

For more details and usage examples see docs on [`redux-time`](https://monadical-sas.github.io/redux-time/).

## API

```javascript
window.time = new WarpedTime(window.store, 1)
// takes: optional redux store, initial_speed, initial_timestamp

window.time.getActualTime()
> 1499014500
window.time.getWarpedTime()
> 1499014500

window.time.setSpeed(-1)   // make time start going backwards at -1x

window.time.getActualTime()
> 1499014501
window.time.getWarpedTime()
> 1499014499

window.time.setSpeed(0.01)  // make time progress at 0.01x its actual speed

window.time.getWarpedTime()
> 1499014499.01

const server_time = timestamp_from_server + rtlatency/2
window.time.setWarpedTime(server_time) // set time to the server time instantly

window.time.setWarpedTime(server_time, 1000) // sync to server time over 1000ms
```

## Info

This library is useful for:

- time-travel debugging
- animations
- any situation where you want a version of time that's flowing slower/faster/reversed compared to the actual time
- keeping a front-end time in sync with a backend time
- real-time games

We use it for time-travel debugging and animation timing sync in our library [`redux-time`](https://monadical-sas.github.io/redux-time/).

---
<img src="examples/static/jeremy.jpg" height="40px" style="float:right"/>

MIT License | [Monadical](https://monadical.com) SAS 2017 ([we're hiring!](https://monadical.com/apply))

