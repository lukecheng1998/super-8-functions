const connected = false;   
const selected_device;   
const connected_server; 

exports.discoverDevicesOrDisconnect = () => {
    console.log("discoverDevicesOrDisconnect");
    if (!connected) {     
        discoverDevices();    
    } else {     
        selected_device.gatt.disconnect();     
        resetUI();    
    }   
}

exports.discoverDevices = () => {
    console.log("discoverDevices"); 
    setConnectedStatus(false);    

    var options = {     
        acceptAllDevices: true  
    } 
    navigator.bluetooth.requestDevice(options)     
        .then(device => {      
            console.log('> Name:             ' + device.name);      
            console.log('> Id:               ' + device.id);      
            console.log('> Connected:        ' + device.gatt.connected);      
            selected_device = device; 
            console.log(selected_device);      
            connect();     
        })     
        .catch(error => {      
            alert('ERROR: ' + error);      
            console.log('ERROR: ' + error);     
        });   
}

exports.connect = () => {
    if (connected == false) {     
        console.log("connecting");     
        selected_device.gatt.connect().then(
            function (server) {       
                console.log("Connected to " + server.device.id);       
                console.log("connected=" + server.connected);      
                setConnectedStatus(true);       
                connected_server = server;       
                selected_device.addEventListener('gattserverdisconnected', onDisconnected);
            },      
            function (error) {       
                console.log("ERROR: could not connect - " + error);       
                alert("ERROR: could not connect - " + error);       
                setConnectedStatus(false);      
            });    
    }   
}

exports.onDisconnected = () => {    
    console.log("onDisconnected");    
    resetUI();   
} 

exports.setConnectedStatus = (status) => {    
    connected = status;    
    document.getElementById('status_connected').innerHTML = status;    
    if (status == true) {     
        document.getElementById('btn_scan').innerHTML = "Disconnect";    
    } else { 
        document.getElementById('btn_scan').innerHTML = "Discover Devices";    
    }   
}

exports.resetUI = () => {    
    setConnectedStatus(false);        
} 
