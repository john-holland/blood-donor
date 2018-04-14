//import document from "document"
import { preferences } from "user-settings"
import { today as todayActivity, goals } from "user-activity"
import { battery, charger } from "power";
import { View, $, $at } from '../../common/view'
import { display } from "display";

export class Default extends View {  
  name = 'default'

  constructor() {
    this.$ = $at('#default')
    
    this.el = this.$()
  }

  onMount() {
  }

	onRender() {
    this.application.switchTo('squeeze')
	}
  
}
