//import document from "document"
import { preferences } from "user-settings"
import { today as todayActivity, goals } from "user-activity"
import { battery, charger } from "power";
import { HeartRateSensor } from "heart-rate";
import { View, $, $at } from '../../common/view'
import { display } from "display";
import { MeterWidget } from '../../common/meter_widget'

export class Squeezing extends View {  
  name = 'squeezing'
  
  constructor() {
    this.$ = $at('#squeezing')
    
    this.el = this.$()
    
    this.$("#btn-pause").onclick = function(evt) {
      this.application.pause()
    }.bind(this)
    
    this.$("#btn-interval").onclick = function(evt) {
      this.application.adjustInterval()
    }.bind(this)
  }

  onMount() {
    this.meterWidget = new MeterWidget(this.$("#squeeze-meter"), { goalValue: this.application.squeezeModel.interval })
  }

	onRender() {
    this.meterWidget.setValue(this.application.squeezeModel.getElapsedTimeFromBuzzSeconds(), this.application.squeezeModel.interval)    
    this.$("#elapsed").text = this.application.squeezeModel.getLiveElapsedTimeString()
    this.$("#heartrate").text = this.application.squeezeModel.getLatestHeartRate()
	}
}
