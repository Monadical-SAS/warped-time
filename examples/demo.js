import React from 'react'
import ReactDOM from 'react-dom'

import {WarpedTime, Tick, TimeControls} from '../node/main.js'

console.log(Tick)
window.time = new WarpedTime()
window.tick = new Tick()

ReactDOM.render(
    <TimeControls time={window.time} tick={window.tick} debug expanded/>,
    document.getElementById('react'),
)
