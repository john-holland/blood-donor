import document from "document";
import * as messaging from "messaging";
import { BloodDonor } from './blooddonor'

BloodDonor.start()

// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("App Socket Open");
};

// Message socket closes
messaging.peerSocket.onclose = () => {
  console.log("App Socket Closed");
};
