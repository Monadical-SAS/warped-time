import React from 'react'
import {Button} from 'react-bootstrap'

import {ExpandableSection} from 'monadical-react-components'


const SOURCE = "https://github.com/Monadical-SAS/redux-time/blob/master/warped-time/controls.js"


const FPS = (speed, current_timestamp, former_time) =>
    Math.round((speed * 1000)/(current_timestamp - former_time)) || 0

const SpeedButton = ({current_speed, speed, setSpeed}) =>
    <Button bsStyle={current_speed === speed ? 'success' :'default'}
            onClick={() => setSpeed(Number(speed))}>
        {`${Number(speed) < 0 ? '+' : '-'}${speed}x`}
    </Button>

export const TimeControlsComponent = ({
        genesis_time, warped_time, former_time, most_future_time,
        actual_time, speed, setSpeed, setWarpedTime, debug, expanded}) => {

    return <ExpandableSection name="Time Controls"
                              source={debug && SOURCE}
                              expanded={expanded}>
        Speed of Time: {speed}x |
        Warped 🕐 {Math.round(warped_time, 0)} |
        Actual 🕰 {actual_time} {speed == 0 ? '(updating paused)' : ''} |&nbsp;
        {FPS(speed, warped_time, former_time)} FPS
        <br/>
        <span style={{float:'right'}}> {actual_time} </span>
        <span style={{float:'left'}}> {genesis_time} </span>
        <div style={{width: '70%', display: 'block', 
                    'marginLeft': 'auto', 'marginRight': 'auto'}}>
            <input type="range"
                   onChange={(e) => {
                        setSpeed(0)
                        setWarpedTime(Number(e.target.value))
                   }}
                   min={genesis_time}
                   max={most_future_time}
                   step={Math.min(30 - (most_future_time - genesis_time) / 5, 30)}
                   value={warped_time}
                   style={{
                        float: 'left', height: '10px', display: 'inline',
                        width: `${Math.min((most_future_time - genesis_time) / 150, 100)}%`,
                    }}/>
        </div>
        <br/>
        <SpeedButton current_speed={speed} speed='-10' setSpeed={setSpeed}/> &nbsp;
        <SpeedButton current_speed={speed} speed='-1' setSpeed={setSpeed}/> &nbsp;
        <SpeedButton current_speed={speed} speed='-0.1' setSpeed={setSpeed}/> &nbsp;
        <SpeedButton current_speed={speed} speed='-0.01' setSpeed={setSpeed}/> &nbsp;
        <SpeedButton current_speed={speed} speed='-0.001' setSpeed={setSpeed}/> &nbsp;

        {speed === 0 ?
            <Button bsStyle="success" onClick={() => setSpeed(1)}>▶️</Button>
          : <Button bsStyle="danger" onClick={() => setSpeed(0)}>⏸</Button>} &nbsp;
        
        <SpeedButton current_speed={speed} speed='0.001' setSpeed={setSpeed}/> &nbsp;
        <SpeedButton current_speed={speed} speed='0.01' setSpeed={setSpeed}/> &nbsp;
        <SpeedButton current_speed={speed} speed='0.1' setSpeed={setSpeed}/> &nbsp;
        <SpeedButton current_speed={speed} speed='1' setSpeed={setSpeed}/> &nbsp;
        <SpeedButton current_speed={speed} speed='10' setSpeed={setSpeed}/>
    </ExpandableSection>
}

export class Ticker {
    constructor(subscribers, running) {
        this.subscribers = subscribers || []
        this.running = running || true
        this.tick()
    }
    
    subscribe(fn) {
        this.subscribers.push(fn)
    }

    tick() {
        this.subscribers.forEach((fn) => fn())
        if (this.running) {
            window.requestAnimationFrame(::this.tick)
        }
    }

    stop() {
        this.running = false
    }
}

// auto-self-updating TimeControls component using requestAnimationFrame
export class TimeControls extends React.Component {
    constructor(props) {
        super(props)
        this.time = props.time
        this.state = {}
        if (props.tick === undefined) {
            this.ticker = new Ticker()
            this.ticker.subscribe(::this.tick)
        } else {
            this.ticker = props.tick
            props.ticker.subscribe(::this.tick)
        }
    }

    computeState() {
        return {
            speed: this.time.speed,
            former_time: this.state.warped_time,
            genesis_time: this.time.genesis_time,
            warped_time: this.time.getWarpedTime(),
            actual_time: this.time.getActualTime(),
            most_future_time: this.time.most_future_time
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
                    most_future_time={this.state.most_future_time}

                    setSpeed={::this.time.setSpeed}
                    setWarpedTime={::this.time.setWarpedTime}
                    debug={this.props.debug}
                    expanded={this.props.expanded}/>
    }
}
