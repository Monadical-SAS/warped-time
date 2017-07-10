import React from 'react'
import ReactDOM from 'react-dom'

import {WarpedTime, TimeControls} from '../src/main.js'

window.time = new WarpedTime()

ReactDOM.render(
    <TimeControls time={window.time} debug expanded/>,
    document.getElementById('react'),
)
