const express = require('express');
const { v4: uuidv4 } = require('uuid');  // Để generate unique ID
const Participant = require('../models/Participant');
const { generateQR } = require('../utils/qrGenerator');
const { protect } = require('../utils/authMiddleware');

const router = express.Router();

// Generate QR (POST /api/participants/generate) - Admin only
router.post('/generate', protect, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
  const participants = req.body;  // Array từ upload CSV/JSON: [{name, email}]
  try {
    const results = [];
    for (const p of participants) {
      const id = uuidv4();
      const qrCode = await generateQR(id);  // QR chứa unique ID
      const newParticipant = new Participant({ id, name: p.name, email: p.email, qrCode });
      await newParticipant.save();
      results.push({ id, name: p.name, email: p.email, qrCode });
    }
    res.json(results);  // Trả về để tải xuống QR
  } catch (err) {
    res.status(500).json({ message: 'Error generating QR' });
  }
});

// Check-in (POST /api/participants/checkin) - Staff/Admin
router.post('/checkin', protect, async (req, res) => {
  const { id } = req.body;  // Từ QR scan
  try {
    const participant = await Participant.findOne({ id });
    if (!participant) return res.status(404).json({ message: 'Invalid QR' });
    if (participant.checkedIn) return res.status(400).json({ message: 'Already checked in' });
    // Check expire (tùy chọn): if (Date.now() - participant.timestamp > 2 days) ...

    participant.checkedIn = true;
    await participant.save();

    // Emit Socket.io events
    const io = req.app.get('io');  // Giả sử set io ở index.js: app.set('io', io);
    io.emit('welcome', { name: participant.name, message: `Chào mừng ${participant.name} đến với đại hội!` });
    io.emit('stats-update');  // Để FE refresh stats

    res.json({ message: 'Check-in successful' });
  } catch (err) {
    res.status(500).json({ message: 'Check-in error' });
  }
});

// Get stats (GET /api/participants/stats) - Staff/Admin
router.get('/stats', protect, async (req, res) => {
  try {
    const total = await Participant.countDocuments();
    const checkedIn = await Participant.countDocuments({ checkedIn: true });
    res.json({
      total,
      checkedIn,
      notCheckedIn: total - checkedIn
      // Optional: list: await Participant.find()
    });
  } catch (err) {
    res.status(500).json({ message: 'Stats error' });
  }
});

module.exports = router;