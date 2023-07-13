const mongoose = require('mongoose');

const whatsappContent = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
});

const messageContent = mongoose.model('Message Content', whatsappContent);

module.exports = messageContent;
