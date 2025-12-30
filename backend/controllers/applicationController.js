const Case = require('../models/Case');
const User = require('../models/User');

// Get all applications with role-based filtering
const getApplications = async (req, res) => {
  try {
    const { status, priority, page = 1, limit = 10 } = req.query;
    const user = req.user;

    // Build query based on user role
    let query = {};

    // Role-based filtering
    switch (user.role) {
      case 'client':
        query.client = user._id;
        break;
      case 'coordinator':
        query.$or = [
          { assignedCoordinator: user._id },
          { assignedCoordinator: { $exists: false } }
        ];
        break;
      case 'manager':
        query.$or = [
          { assignedManager: user._id },
          { assignedCoordinator: { $in: await getCoordinatorsUnderManager(user._id) } }
        ];
        break;
      case 'admin':
        // Admin can see all applications
        break;
      default:
        return res.status(403).json({ message: 'Invalid user role' });
    }

    // Apply filters
    if (status) query.status = status;
    if (priority) query.priority = priority;

    // Pagination
    const skip = (page - 1) * limit;

    const applications = await Case.find(query)
      .populate('client', 'name email')
      .populate('assignedCoordinator', 'name email')
      .populate('assignedManager', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Case.countDocuments(query);

    res.json({
      applications,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's own application
const getMyApplication = async (req, res) => {
  try {
    const application = await Case.findOne({ client: req.user._id })
      .populate('assignedCoordinator', 'name email')
      .populate('assignedManager', 'name email')
      .populate('documents');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({ application });
  } catch (error) {
    console.error('Get my application error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new application
const createApplication = async (req, res) => {
  try {
    const { visaType, applicationDetails, priority = 'medium' } = req.body;

    // Check if user already has an application
    const existingApplication = await Case.findOne({ client: req.user._id });
    if (existingApplication) {
      return res.status(400).json({ message: 'You already have an application' });
    }

    const application = new Case({
      client: req.user._id,
      visaType,
      applicationDetails,
      priority,
      status: 'draft'
    });

    await application.save();

    // Populate the response
    await application.populate('client', 'name email');

    res.status(201).json({
      message: 'Application created successfully',
      application
    });
  } catch (error) {
    console.error('Create application error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update application
const updateApplication = async (req, res) => {
  try {
    const application = await Case.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check permissions
    if (application.client.toString() !== req.user._id.toString() &&
        !['admin', 'coordinator', 'manager'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updateData = req.body;

    // Update application
    Object.keys(updateData).forEach(key => {
      if (updateData[key] !== undefined) {
        application[key] = updateData[key];
      }
    });

    await application.save();

    const updatedApplication = await Case.findById(req.params.id)
      .populate('client', 'name email')
      .populate('assignedCoordinator', 'name email')
      .populate('assignedManager', 'name email');

    res.json({
      message: 'Application updated successfully',
      application: updatedApplication
    });
  } catch (error) {
    console.error('Update application error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper function to get coordinators under a manager
const getCoordinatorsUnderManager = async (managerId) => {
  // This would need a proper organizational structure
  // For now, return empty array
  return [];
};

module.exports = {
  getApplications,
  getMyApplication,
  createApplication,
  updateApplication
};
