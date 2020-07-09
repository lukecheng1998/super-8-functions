var connected = false;
var selected_device;
var connected_server;
exports.discoverDevicesOrDisconnect = () => {
  console.log("discoverDevicesOrDisconnect");
  if(!connected){
    this.discoverDevices();
  }else {
    selected_device.gatt.disconnect();
    this.resetUI();
  }
};
exports.discoverDevices = () => {
  console.log("Discover Devices")
  this.setConnectedStatus(false)
  let options = {
    acceptAllDevices: true
  }
  navigator.bluetooth.requestDevice(options)
  .then(device => {
    console.log('> Name:             ' + device.name);      
    console.log('> Id:               ' + device.id);      
    console.log('> Connected:        ' + device.gatt.connected);
    selected_device = device;
    console.log(selected_device);
    this.connect();
  })
  .catch(error => {
    alert('ERROR: ' + error);
    console.log('ERROR: ' + error);
  })
}
exports.connect  = () => {
  if(connected === false){
    console.log("connecting");
    selected_device.gatt.connect().then (
      function (server) {
        console.log("Connected to " + server.device.id);
        console.log("connected=" + server.connected);
        setConnectedStatus(true);
        connected_server = server;
        selected_device.addEventListener('gattserverdisconnected', onDisconnected)
      },
      function (error) {
        console.log("ERROR: could not connect - " + error);
        //Probably return a json
        alert("Error: could not connect - " + error);
        setConnectedStatus(false)
      }
    );
  }
}
exports.onDisconnected = () => {
  console.log("onDisconnected");
  this.resetUI();
}
exports.setConnectedStatus = (status) => {// We might not need this
  connected = status
  document.getElementById('status_connected').innerHTML = status;
  if(status === true){
    document.getElementById('btn_scan').innerHTML = "disconnect"
  }else{
    document.getElementById('btn_scan').innerHTML= "DiscoverDevices";
  }
}
exports.resetUI = () => {
  this.setConnectedStatus(false)
}