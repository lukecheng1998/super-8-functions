const { db } = require("../util/admin");
const firebase = require("firebase");
const config = require("../util/config");
exports.postBluetoothDevice = (req, res) => {
  const DeviceData = {
    deviceId: req.body.deviceId,
    time: new Date().toISOString()
  };
  console.log(DeviceData)
  db.doc(`/users/${req.user.email}`).collection("devices").doc(DeviceData.deviceId).set(DeviceData)
    .then(() => {
      return res.status(200).json({ message: "Sucessfully added device" });
    })
    .catch((err) => {
      return res.status(500).json({ err: err.code });
    });
};
