import React from 'react'
import {Button} from 'react-bootstrap'

import {ExpandableSection} from 'monadical-react-components'


const SOURCE = "https://github.com/Monadical-SAS/redux-time/blob/master/warped-time/controls.js"


const FPS = (speed, current_timestamp, former_timestamp) =>
    Math.round((speed * 1000)/(current_timestamp - former_timestamp)) || 0


export const TimeControlsComponent = ({
        genesis_timestamp, current_timestamp, former_timestamp, 
        actual_time, speed, setSpeed, setWarpedTime, debug, expanded}) => {
    return <ExpandableSection name="Time Controls" source={debug && SOURCE} expanded={expanded}>
        Speed of Time: {speed}x |
        Warped 🕐 {Math.round(current_timestamp, 0)} |
        Actual 🕰 {actual_time} {speed == 0 ? '(updating paused)' : ''} |&nbsp;
        {FPS(speed, current_timestamp, former_timestamp)} FPS
        <br/>
        Reverse ⏪
        <input
            type="range"
            onChange={(e) => setWarpedTime(e.target.value)}
            min={genesis_timestamp}
            max={actual_time}
            step={(genesis_timestamp - actual_time) / 100}
            value={current_timestamp}
            style={{width: '70%', height: '10px', display: 'inline'}}/>
        ⏩ Forward
        <br/>
        <Button onClick={setSpeed.bind(this, -10)}>-10x</Button> &nbsp;
        <Button onClick={setSpeed.bind(this, -1)}>-1x</Button> &nbsp;
        <Button onClick={setSpeed.bind(this, -0.1)}>-0.1x</Button> &nbsp;
        <Button onClick={setSpeed.bind(this, -0.01)}>-0.01x</Button> &nbsp;
        <Button onClick={setSpeed.bind(this, -0.001)}>-0.001x</Button> &nbsp;
        <Button bsStyle="danger" onClick={setSpeed.bind(this, 0)}>⏸</Button> &nbsp;
        <Button bsStyle="success" onClick={setSpeed.bind(this, 1)}>▶️</Button> &nbsp;
        <Button onClick={setSpeed.bind(this, 0.001)}>+0.001x</Button> &nbsp;
        <Button onClick={setSpeed.bind(this, 0.01)}>+0.01x</Button> &nbsp;
        <Button onClick={setSpeed.bind(this, 0.1)}>+0.1x</Button> &nbsp;
        <Button onClick={setSpeed.bind(this, 1)}>1x</Button> &nbsp;
        <Button onClick={setSpeed.bind(this, 10)}>+10x</Button>
    </ExpandableSection>
}

// auto-self-updating TimeControls component using requestAnimationFrame
export class TimeControls extends React.Component {
    constructor(props) {
        super(props)
        this.time = this.props.time || window.time
        this.state = {
            genesis_timestamp: this.time.getWarpedTime(),
            speed: this.time.speed,
            current_timestamp: this.time.getWarpedTime(),
            former_timestamp: this.time.getWarpedTime() - 20,
        }
    }
    componentDidMount() {
        this.animating = true
        this.tick()
    }
    componentWillUnmount() {
        this.animating = false
    }
    tick() {
        this.setState({
            current_timestamp: this.props.time.getWarpedTime(),
            former_timestamp: this.state.current_timestamp,
        })
        if (this.animating) {
            window.requestAnimationFrame(::this.tick)
        }
    }
    setSpeed(speed) {
        this.time.setSpeed(speed)
        this.setState({...this.state, speed})
    }
    setWarpedTime(time) {
        this.time.setWarpedTime(time)
        this.setState({
            ...this.state,
            current_timestamp: time,
            former_timestamp: time - 20,
        })
    }
    render() {
        return <TimeControlsComponent
            speed={this.state.speed}
            genesis_timestamp={this.state.genesis_timestamp}
            current_timestamp={this.state.current_timestamp}
            former_timestamp={this.state.former_timestamp}
            actual_time={(new Date).getTime()}
            setSpeed={::this.setSpeed}
            setWarpedTime={::this.setWarpedTime}
            debug={this.props.debug}
            expanded={this.props.expanded}/>
    }
}
