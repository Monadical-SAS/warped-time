import React from 'react'
import ReactDOM from 'react-dom'

import {WarpedTime} from 'warped-time'
import {TimeControls} from 'monadical-react-components/warped-time-controls'


const time = new WarpedTime()

global.time = time   // for playing around with it in console

ReactDOM.render(
    <TimeControls time={time} debug expanded/>,
    global.document.getElementById('react'),
)
