import { vibration } from "haptics"

export class IntervalBuzzer {
  interval = 5
  intervalId = undefined
  lastTimeBuzzed = new Date().getTime()
  buzzedCount = 0
    
  setInterval(interval) {
    this.interval = interval
    if (this.intervalId) {
      this.start()
    }
  }

  start() {
    if (this.intervalId) clearInterval(this.intervalId)
    
    this.intervalId = setInterval(this.buzz.bind(this), this.interval * 1000)
    this.lastTimeBuzzed = new Date().getTime()
  }

  stop() {
    if (this.intervalId) clearInterval(this.intervalId)
  }

  isRunning() {
    return !!this.intervalId
  }

  buzz() {
    this.lastTimeBuzzed = new Date().getTime()
    this.buzzedCount++
    vibration.start('nudge-max')
  }
}