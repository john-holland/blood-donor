//import document from "document"
import { preferences } from "user-settings"
import { today as todayActivity, goals } from "user-activity"
import { battery, charger } from "power";
import { HeartRateSensor } from "heart-rate";
import { View, $, $at } from '../../common/view'
import { display } from "display";

export class Squeeze extends View {  
  name = 'squeeze'

  constructor() {
    super();
    this.$ = $at('#squeeze')
    
    this.el = this.$()
    
    let items = this.$("#intervals .interval-item")

    items.forEach(function(element, index) {
      let touch = element.getElementById("touch-me")
      touch.onclick = function(evt) {
        let interval = (index+1)*5
        this.intervalSelected(interval)
        console.log(`interval: ${interval}`)
      }.bind(this)
    }.bind(this))
  }

  intervalSelected(interval) {
    //send back to running screen
    this.application.setInterval(interval)
    this.application.switchTo('paused')
  }

  onMount() {
  }

  onRender() {
  }
}