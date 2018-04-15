import { IntervalBuzzer } from './intervalbuzzer'
import { HeartRateMonitor } from './heartratemonitor'

export class SqueezeModel {
  timeStarted = -1
  timeElapsed = 0
  heartrateReadings = []
  intervalBuzzer = new IntervalBuzzer()
  heartRateMonitor = new HeartRateMonitor()

  start() {
    this.play()
  }

  end() {
    this.pause(false)
    this.heartRateMonitor.stop()
  }

  play() {
    this.timeStarted = new Date().getTime()
    this.intervalBuzzer.start()
    this.heartRateMonitor.reset()
  }

  pause(additiveTimeElapsed = true) {
    if (additiveTimeElapsed && this.timeStarted > -1) {
      this.timeElapsed += (new Date().getTime() - this.timeStarted)
    }
    this.intervalBuzzer.stop()
    console.log('readings' + JSON.stringify(this.heartrateReadings))
    this.heartrateReadings = this.heartrateReadings.concat(this.heartRateMonitor.readings)
    this.heartRateMonitor.pauseReadings()
  }

  getElapsedTimeFromBuzzSeconds() {
    return (new Date().getTime() - this.intervalBuzzer.lastTimeBuzzed) / 1000
  }

  getLiveElapsedTimeSeconds() {
    return ((new Date().getTime() - this.timeStarted) + this.timeElapsed) / 1000
  }

  getElapsedTimeSeconds() {
    return this.timeElapsed / 1000
  }

  getLatestHeartRate() {
    return this.heartRateMonitor.getLatest()
  }

  getSqueezes() {
    return this.intervalBuzzer.buzzedCount
  }
  
  getLiveElapsedTimeString() {
    let timeElapsed = this.getLiveElapsedTimeSeconds()
    let minutes = Math.floor(timeElapsed / 60)
    let seconds = timeElapsed - minutes * 60
    seconds = seconds < 10 ? ('0' + seconds.toFixed(2)) : seconds.toFixed(2)
    
    return `${minutes}:${seconds}`
  }

  getElapsedTimeString() {
    let timeElapsed = this.getElapsedTimeSeconds()
    let minutes = Math.floor(timeElapsed / 60)
    let seconds = timeElapsed - minutes * 60
    seconds = seconds < 10 ? ('0' + seconds.toFixed(2)) : seconds.toFixed(2)
    
    return `${minutes}:${seconds}`
  }

  get interval() {
    return this.intervalBuzzer.interval
  }

  set interval(value) {
    this.intervalBuzzer.setInterval(value)
  }
}