//import document from "document"
import { preferences } from "user-settings"
import { today as todayActivity, goals } from "user-activity"
import { battery, charger } from "power";
import { HeartRateSensor } from "heart-rate";
import { View, $, $at } from '../../common/view'
import { display } from "display";

function average(numbers, maxlen) {
  while (numbers.length > maxlen) {
    numbers.shift()
  }
  
  let sum = 0
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i]
  }
  
  return sum / numbers.length
}

export class Summary extends View {  
  name = 'summary'

  constructor() {
    this.$ = $at('#summary')
    
    this.el = this.$()
    
    this.$("#btn-reset").onclick = function(evt) {
      this.application.reset()
    }.bind(this)
  }

  onMount() {
  }

	onRender() {
    this.$("#time").text = this.application.squeezeModel.getElapsedTimeString()
    console.log('readings', this.application.squeezeModel.heartrateReadings)
    this.$("#heartrate").text = average(this.application.squeezeModel.heartrateReadings, 100).toFixed(2) + ' average'
    this.$("#squeezes").text = this.application.squeezeModel.getSqueezes() + ' squeezes'
	}

}
