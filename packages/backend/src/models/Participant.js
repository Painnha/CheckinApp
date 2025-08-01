const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },  // Unique ID cho QR
  name: { type: String, required: true },
  email: { type: String, required: true },
  qrCode: { type: String, required: true },  // Base64 string của QR
  checkedIn: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Participant', participantSchema);