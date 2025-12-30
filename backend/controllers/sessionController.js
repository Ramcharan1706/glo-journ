const { validationResult } = require('express-validator');
const Session = require('../models/Session');
const User = require('../models/User');

const formatSession = (sessionDoc) => ({
  id: sessionDoc._id.toString(),
  client_name: sessionDoc.client?.name || sessionDoc.client_name || 'Client',
  client_id: sessionDoc.client?._id?.toString() || null,
  coordinator_id: sessionDoc.coordinator?._id?.toString() || null,
  coordinator_name: sessionDoc.coordinator?.name,
  date: sessionDoc.date,
  time_slot: sessionDoc.time_slot,
  status: sessionDoc.status,
  notes: sessionDoc.notes,
  meeting_link: sessionDoc.meeting_link,
  duration: sessionDoc.duration,
});

// Get all sessions
const getSessions = async (req, res) => {
  try {
    if (!['admin', 'coordinator', 'manager'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const sessions = await Session.find()
      .populate('client', 'name email')
      .populate('coordinator', 'name email')
      .sort({ date: -1, time_slot: -1 });

    res.json({ sessions: sessions.map(formatSession) });
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new session
const createSession = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { clientId, coordinatorId, date, time_slot, notes, meeting_link, duration } = req.body;

    if (!['admin', 'coordinator', 'manager'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const client = await User.findById(clientId);
    if (!client || client.role !== 'client') {
      return res.status(404).json({ message: 'Client not found' });
    }

    let coordinator = null;
    if (coordinatorId) {
      coordinator = await User.findById(coordinatorId);
      if (!coordinator || coordinator.role !== 'coordinator') {
        return res.status(404).json({ message: 'Coordinator not found' });
      }
    }

    const session = new Session({
      client: client._id,
      coordinator: coordinator?._id,
      date,
      time_slot,
      notes,
      meeting_link,
      duration,
      status: 'pending'
    });

    await session.save();

    res.status(201).json({
      message: 'Session created successfully',
      session: formatSession(await session.populate(['client', 'coordinator']))
    });
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update session status
const updateSessionStatus = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { status, notes } = req.body;

    if (!['admin', 'coordinator', 'manager'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const session = await Session.findById(id).populate(['client', 'coordinator']);

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    session.status = status || session.status;
    if (notes !== undefined) {
      session.notes = notes;
    }

    await session.save();

    res.json({
      message: 'Session updated successfully',
      session: formatSession(session)
    });
  } catch (error) {
    console.error('Error updating session:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getSessions,
  createSession,
  updateSessionStatus
};
