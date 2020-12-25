//import document from "document"
import { preferences } from "user-settings"
import { today as todayActivity, goals } from "user-activity"
import { battery, charger } from "power";
import { HeartRateSensor } from "heart-rate";
import { View, $, $at } from '../../common/view'
import { display } from "display";

export class Paused extends View {  
  name = 'paused'

  constructor() {
    super();
    this.$ = $at('#paused')
    
    this.el = this.$()
    
    this.$("#btn-play").onclick = function(evt) {
      this.application.play()
    }.bind(this)
    
    this.$("#btn-interval").onclick = function(evt) {
      this.application.adjustInterval()
    }.bind(this)
    
    this.$("#btn-finish").onclick = function(evt) {
      this.application.finish()
    }.bind(this)
  }

  onMount() {
  }

	onRender() {
    this.$("#elapsed").text = this.application.squeezeModel.getElapsedTimeString()
    this.$("#heartrate").text = this.application.squeezeModel.getLatestHeartRate()
	}

}
