// Write your code here
import React, {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isRunning: false,
    timeLeft: 25 * 60,
    timerLimit: 25,
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  formatTime = seconds => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`
  }

  handleStartPause = () => {
    const {isRunning} = this.state
    if (isRunning) {
      clearInterval(this.intervalId)
    } else {
      this.intervalId = setInterval(this.tick, 1000)
    }
    this.setState(prevState => ({isRunning: !prevState.isRunning}))
  }

  tick = () => {
    this.setState(prevState => {
      if (prevState.timeLeft > 0) {
        return {timeLeft: prevState.timeLeft - 1}
      } else {
        clearInterval(this.intervalId)
        return {isRunning: false, timeLeft: 0}
      }
    })
  }

  handleReset = () => {
    clearInterval(this.intervalId)
    this.setState({isRunning: false, timeLeft: this.state.timerLimit * 60})
  }

  incrementTime = () => {
    this.setState(prevState => ({
      timerLimit: prevState.timerLimit + 1,
      timeLeft: (prevState.timerLimit + 1) * 60,
    }))
  }

  decrementTime = () => {
    this.setState(prevState => ({
      timerLimit: prevState.timerLimit > 1 ? prevState.timerLimit - 1 : 1,
      timeLeft: (prevState.timerLimit > 1 ? prevState.timerLimit - 1 : 1) * 60,
    }))
  }

  render() {
    const {isRunning, timeLeft} = this.state
    const playPauseIcon = isRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const playPauseText = isRunning ? 'Pause' : 'Start'

    return (
      <div className="digital-timer-container">
        <h1>Digital Timer</h1>
        <div className="timer-display">
          <div className="timer-bg">
            <h1 className="timer">{this.formatTime(timeLeft)}</h1>
            <p className="status">{isRunning ? 'Running' : 'Paused'}</p>
          </div>
        </div>
        <div className="controls">
          <button onClick={this.handleStartPause}>
            <img src={playPauseIcon} alt="play/pause icon" />
            {playPauseText}
          </button>
          <button onClick={this.handleReset}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
              alt="reset icon"
            />
            Reset
          </button>
        </div>
        <div className="limit-controls">
          <button onClick={this.incrementTime}>+</button>
          <button onClick={this.decrementTime}>-</button>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
