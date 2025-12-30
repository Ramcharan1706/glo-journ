const Session = require('../models/Session');
const User = require('../models/User');

// Get all sessions
const getSessions = async (req, res) => {
  try {
    // Check if user has admin access
    if (!['admin', 'coordinator', 'manager'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const sessions = await Session.find()
      .populate('client', 'name email')
      .populate('coordinator', 'name email')
      .sort({ date: -1, time_slot: -1 });

    res.json(sessions);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new session
const createSession = async (req, res) => {
  try {
    const { client_name, date, time_slot, coordinator_id } = req.body;

    // Check if user has permission to create sessions
    if (!['admin', 'coordinator', 'manager'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Verify coordinator exists if provided
    if (coordinator_id) {
      const coordinator = await User.findById(coordinator_id);
      if (!coordinator || coordinator.role !== 'coordinator') {
        return res.status(404).json({ message: 'Coordinator not found' });
      }
    }

    const session = new Session({
      client_name,
      date,
      time_slot,
      coordinator: coordinator_id,
      created_by: req.user.id
    });

    await session.save();

    res.status(201).json({
      message: 'Session created successfully',
      session
    });
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update session status
const updateSessionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Check if user has permission to update sessions
    if (!['admin', 'coordinator', 'manager'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const session = await Session.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.json({
      message: 'Session updated successfully',
      session
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
