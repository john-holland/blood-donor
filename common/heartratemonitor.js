import { HeartRateSensor } from "heart-rate";

const KEEP_LIMIT = 100
let heartRateMonitor = new HeartRateSensor()
export class HeartRateMonitor {
  
  readings = []
  started = false
  latestReading = '--'

  constructor() {
    let self = this
    
    heartRateMonitor.onreading = function(e) {
      if (heartRateMonitor.heartRate) {
        self.latestReading = heartRateMonitor.heartRate
        if (self.started) self.readings.push(heartRateMonitor.heartRate)
        console.log('readings' + JSON.stringify(self.readings))
        while (self.readings.length > KEEP_LIMIT) {
          self.readings.shift()
        }
      }
    }
    
    heartRateMonitor.start()
  }

  start() {
    this.started = true
  }

  pauseReadings() {
    this.started = false
  }

  /**
    only to be called on dispose of heart rate monitor
    because they can take a little while to get register
    we don't want to waste it 
   */
  stop() {
    heartRateMonitor.stop()
    this.started = false
  }

  reset() {
    this.started = false
    this.readings = []
    this.started = true
  }

  hasReadings() {
    return this.readings.length > 0
  }

  getLatest() {
    return this.latestReading
  }
}