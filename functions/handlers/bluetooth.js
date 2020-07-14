const { db } = require("../util/admin");
const firebase = require("firebase");
const config = require("../util/config");
exports.postBluetoothDevice = (req, res) => {

    const DeviceData = {
        deviceId: req.body.deviceId,
        time: req.body.date
    }
    db.doc(`/users/${req.user.email}`).collection('devices').get().then(doc => {
        if (doc.exists) {
            db.doc(`/users/${req.user.email}`).collection('devices').add(DeviceData);
        }
    }).then(() => {
        console.log("Successfully Added Device.");
    }).catch(err => {
        return res.status(500).json({err:err.code})
    })

  
}