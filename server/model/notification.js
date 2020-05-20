const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    messageTitle: { type: String, required: true },
    messageDescription: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectID, ref: 'User', required: false },
});

module.exports = mongoose.model('Notification', notificationSchema);