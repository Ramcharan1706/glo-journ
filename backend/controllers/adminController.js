const User = require('../models/User');
const Case = require('../models/Case');
const Session = require('../models/Session');

// Get admin statistics
const getStats = async (req, res) => {
  try {
    // Check if user has admin access
    if (!['admin', 'coordinator', 'manager'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Get user statistics
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const usersByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);

    // Get case statistics
    const totalCases = await Case.countDocuments();
    const casesByStatus = await Case.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    const casesByPriority = await Case.aggregate([
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);

    // Get recent cases
    const recentCases = await Case.find()
      .populate('client', 'name email')
      .populate('assignedCoordinator', 'name')
      .populate('assignedManager', 'name')
      .sort({ createdAt: -1 })
      .limit(10);

    // Get session statistics
    const totalSessions = await Session.countDocuments();
    const upcomingSessions = await Session.countDocuments({
      date: { $gte: new Date() }
    });

    res.json({
      users: {
        total: totalUsers,
        active: activeUsers,
        byRole: usersByRole
      },
      cases: {
        total: totalCases,
        byStatus: casesByStatus,
        byPriority: casesByPriority,
        recent: recentCases
      },
      sessions: {
        total: totalSessions,
        upcoming: upcomingSessions
      }
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getStats
};
