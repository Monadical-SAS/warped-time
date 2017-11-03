import React from 'react'
import ReactDOM from 'react-dom'

import {TimeControls} from 'monadical-react-components/node/warped-time-controls'

import {WarpedTime} from '../node/main.js'



window.time = new WarpedTime()

ReactDOM.render(
    <TimeControls time={window.time} debug expanded/>,
    document.getElementById('react'),
)
