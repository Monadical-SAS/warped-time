# warped-time: Control the progression of time [![npm version](https://badge.fury.io/js/redux-time.svg)](https://badge.fury.io/js/warped-time)  [![Github Stars](https://img.shields.io/github/stars/Monadical-SAS/warped-time.svg)](https://github.com/Monadical-SAS/redux-time) [![Twitter URL](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/thesquashSH)

Simple Javascript library that provides an equivalent to `Date.getTime()` with variable progression speed.

**[LIVE DEMO](https://monadical-sas.github.io/redux-time/warped-time/examples/demo.html)**

```bash
yarn add warped-time
```

For more details and usage examples see docs on [`redux-time`](https://monadical-sas.github.io/redux-time/).

## API

```javascript
window.time = new WarpedTime()

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
```

## Info

This library is useful for:

- time-travel debugging
- animations
- any situation where you want a version of time that's flowing slower/faster/reversed compared to the actual time

We use it for time-travel debugging in our animations library [`redux-time`](https://monadical-sas.github.io/redux-time/).

---
<img src="examples/static/jeremy.jpg" height="40px" style="float:right"/>

MIT License | [Monadical](https://monadical.com) SAS 2017 ([we're hiring!](https://monadical.com/apply))

