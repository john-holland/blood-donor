import document from "document";
import * as messaging from "messaging";
import { display } from "display";
import { BloodDonor } from './blooddonor'

display.autoOff = false;
display.on = true;

BloodDonor.start()

// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("App Socket Open");
};

// Message socket closes
messaging.peerSocket.onclose = () => {
  console.log("App Socket Closed");
};
