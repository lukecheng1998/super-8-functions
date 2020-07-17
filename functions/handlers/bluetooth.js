const { db } = require("../util/admin");
const firebase = require("firebase");
const config = require("../util/config");
exports.getAllEventsAndCreateNotification = (req, res) => {
  const userInfo = {};
  db.collection("events")
    .get()
    .then((data) => {
      let getAllEvents = [];
      data.forEach((doc) => {
        getAllEvents.push({
          date: doc.data().date,
          event: doc.data().event,
          userHandle: doc.data().userHandle,
          eventId: doc.id,
          venue: doc.data().venue,
        });
      });
      //return res.json(getAllEvents);
      return getAllEvents;
    })
    .then((data) => {
      for (var i = 0; i < data.length; i++) {
        //console.log(data[i]);
        // console.log(req.user.handle);
        // console.log(data[i].userHandle);
        // console.log(req.user.event);
        // console.log(data[i].event);
        // console.log(req.user.isSick);
        if (
          req.user.handle !== data[i].userHandle &&
          req.user.event === data[i].event &&
          req.user.isSick === true
        ) {
          userInfo = {
            event: req.user.event,
            notificationId: doc.id,
            createdAt: new Date().toISOString(),
            recipient: data[i].userHandle,
          };
          console.log(userInfo);
          db.collection("notifications")
            .add(userInfo)
            .then(() => {
              return res.json(userInfo);
            });
        }
      }
    })
    .then(() => {
      return res.status(200).json({ message: "added notification" });
    })
    .catch((err) => console.error(err));
};
exports.postBluetoothDevice = (req, res) => {
  const DeviceData = {
    deviceId: req.body.deviceId,
    time: new Date().toISOString(),
  };
  console.log(DeviceData);
  db.doc(`/users/${req.user.email}`)
    .collection("devices")
    .doc(DeviceData.deviceId)
    .set(DeviceData)
    .then(() => {
      return res.status(200).json({ message: "Sucessfully added device" });
    })
    .catch((err) => {
      return res.status(500).json({ err: err.code });
    });
};
exports.postEvent = (req, res) => {
  const eventData = {
    event: req.body.event,
    date: req.body.date,
    venue: req.body.venue,
    userHandle: req.user.handle,
  };
  const eUserData = {
    event: req.body.event,
  };
  db.collection("events")
    .add(eventData)
    .then((doc) => {
      resEvent = eventData;
      resEvent.event = doc.event;
      res.json(resEvent);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
  db.doc(`/users/${req.user.email}`)
    .update(eUserData)
    .then(() => {
      return res.status(200).json({ message: "Successfully added your event" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
