import React from 'react'
import {Button} from 'react-bootstrap'

import {ExpandableSection} from 'monadical-react-components'


const SOURCE = "https://github.com/Monadical-SAS/redux-time/blob/master/warped-time/controls.js"


const FPS = (speed, current_timestamp, former_time) =>
    Math.round((speed * 1000)/(current_timestamp - former_time)) || 0


export const TimeControlsComponent = ({
        genesis_time, warped_time, former_time, 
        actual_time, speed, setSpeed, setWarpedTime, debug, expanded}) => {

    console.log({genesis_time, warped_time, former_time, 
        actual_time, speed, setSpeed, setWarpedTime, debug, expanded})

    return <ExpandableSection name="Time Controls"
                              source={debug && SOURCE}
                              expanded={expanded}>
        Speed of Time: {speed}x |
        Warped 🕐 {Math.round(warped_time, 0)} |
        Actual 🕰 {actual_time} {speed == 0 ? '(updating paused)' : ''} |&nbsp;
        {FPS(speed, warped_time, former_time)} FPS
        <br/>
        Reverse ⏪
        <input type="range"
               onChange={(e) => setWarpedTime(e.target.value)}
               min={genesis_time}
               max={actual_time}
               step={(genesis_time - actual_time) / 100}
               value={warped_time}
               style={{width: '70%', height: '10px', display: 'inline'}}/>
        ⏩ Forward
        <br/>
        <Button onClick={() => setSpeed(-10)}>-10x</Button> &nbsp;
        <Button onClick={() => setSpeed(-1)}>-1x</Button> &nbsp;
        <Button onClick={() => setSpeed(-0.1)}>-0.1x</Button> &nbsp;
        <Button onClick={() => setSpeed(-0.01)}>-0.01x</Button> &nbsp;
        <Button onClick={() => setSpeed(-0.001)}>-0.001x</Button> &nbsp;
        <Button bsStyle="danger" onClick={() => setSpeed(0)}>⏸</Button> &nbsp;
        <Button bsStyle="success" onClick={() => setSpeed(1)}>▶️</Button> &nbsp;
        <Button onClick={() => setSpeed(0.001)}>+0.001x</Button> &nbsp;
        <Button onClick={() => setSpeed(0.01)}>+0.01x</Button> &nbsp;
        <Button onClick={() => setSpeed(0.1)}>+0.1x</Button> &nbsp;
        <Button onClick={() => setSpeed(1)}>1x</Button> &nbsp;
        <Button onClick={() => setSpeed(10)}>+10x</Button>
    </ExpandableSection>
}

// auto-self-updating TimeControls component using requestAnimationFrame
export class TimeControls extends React.Component {
    constructor(props) {
        super(props)
        this.time = props.time
        this.state = {}
        props.tick.subscribe(::this.tick)
    }

    computeState() {
        return {
            speed: this.time.speed,
            former_time: this.state.warped_time,
            genesis_time: this.time.genesis_time,
            warped_time: this.time.getWarpedTime(),
            actual_time: this.time.getActualTime(),
        }
    }

    tick() {
        this.setState(this.computeState())
    }
  
    render() {
        return <TimeControlsComponent
                speed={this.state.speed}
                former_time={this.state.former_time}
                genesis_time={this.state.genesis_time}
                warped_time={this.state.warped_time}
                actual_time={this.state.actual_time}

                setSpeed={::this.time.setSpeed}
                setWarpedTime={::this.time.setWarpedTime}
                debug={this.props.debug}
                expanded={this.props.expanded}/>
    }
}
