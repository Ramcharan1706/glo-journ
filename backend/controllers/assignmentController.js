const Case = require('../models/Case');
const User = require('../models/User');

// Assign application to coordinator
const assignApplication = async (req, res) => {
  try {
    const { application_id, coordinator_id } = req.body;

    // Verify the application exists
    const application = await Case.findById(application_id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check permissions - only managers and admins can assign coordinators
    if (!['admin', 'manager'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Verify coordinator exists and has coordinator role
    if (coordinator_id) {
      const coordinator = await User.findById(coordinator_id);
      if (!coordinator || coordinator.role !== 'coordinator') {
        return res.status(404).json({ message: 'Coordinator not found' });
      }
    }

    // Update assignment
    application.assignedCoordinator = coordinator_id || null;
    await application.save();

    // Populate the response
    await application.populate('assignedCoordinator', 'name email');

    res.json({
      message: 'Application assigned successfully',
      application
    });
  } catch (error) {
    console.error('Assign application error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get available coordinators
const getAvailableCoordinators = async (req, res) => {
  try {
    // Check permissions
    if (!['admin', 'manager'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const coordinators = await User.find({
      role: 'coordinator',
      isActive: true
    }).select('name email _id');

    res.json({ coordinators });
  } catch (error) {
    console.error('Get coordinators error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get coordinator workload
const getCoordinatorWorkload = async (req, res) => {
  try {
    // Check permissions
    if (!['admin', 'manager'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const coordinators = await User.find({ role: 'coordinator', isActive: true });

    const workloadData = await Promise.all(
      coordinators.map(async (coordinator) => {
        const assignedCases = await Case.countDocuments({
          assignedCoordinator: coordinator._id,
          status: { $in: ['draft', 'submitted', 'under_review'] }
        });

        return {
          coordinator: {
            _id: coordinator._id,
            name: coordinator.name,
            email: coordinator.email
          },
          assignedCases
        };
      })
    );

    res.json({ workload: workloadData });
  } catch (error) {
    console.error('Get coordinator workload error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  assignApplication,
  getAvailableCoordinators,
  getCoordinatorWorkload
};
