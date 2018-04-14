import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as messaging from "messaging";
import { today } from "user-activity"
import { vibration } from "haptics"
import { Application } from '../common/view'
import { Default } from './views/default'
import { Squeeze } from './views/squeeze'
import { Paused } from './views/paused'
import { Summary } from './views/summary'
import { Squeezing } from './views/squeezing'

import { SqueezeModel } from '../common/squeezemodel'

export class BloodDonor extends Application {
    default = new Default()
    squeeze = new Squeeze()
    paused = new Paused()
    squeezing = new Squeezing()
    summary = new Summary()

    squeezeModel = new SqueezeModel()
    
    // Called once on application's start...
    onMount(){
        this.screen = this.squeeze
        
        //keeping for example event binding
        //document.getElementById("boundingbox").onmouseup = this.onmouseup.bind(this)
    }

    setInterval(interval) {
      this.squeezeModel.interval = interval
    }

    play() {
      this.squeezeModel.play()
      this.switchTo('squeezing')
      this.squeezeRenderId = setInterval(function() {
        this.squeezing.render()
      }.bind(this), 32)
    }

    pause() {
      clearInterval(this.squeezeRenderId)
      this.squeezeModel.pause()
      this.switchTo('paused')
    }

    finish() {
      this.squeezeModel.end()
      this.switchTo('summary')
    }

    adjustInterval() {
      this.squeezeModel.pause()
      this.switchTo('squeeze')
    }

    reset() {
      this.squeezeModel.pause()
      this.squeezeModel = new SqueezeModel();
      this.adjustInterval()
    }

    switchTo(screenName) {
      Application.switchTo(screenName)
    }

    // Event handler, must be pinned down to the class to preserve `this`.
    onmouseup({ key }) {
      this.screenIndex = (this.screenIndex + 1) % this.screens.length
      Application.switchTo(this.screens[this.screenIndex].name)
      console.log('switching: ' + this.screens[this.screenIndex].name)
      if (this.timeoutId) clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(this.switchBackToDefault.bind(this), 5000)
    }

    onRender() {
      super.onRender()
    }
}