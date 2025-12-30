const mongoose = require('mongoose');

const automationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  trigger: {
    type: {
      type: String,
      enum: ['status_change', 'deadline_approaching', 'document_uploaded', 'case_created', 'manual'],
      required: true
    },
    conditions: {
      status: String,
      daysBeforeDeadline: Number,
      documentType: String
    }
  },
  actions: [{
    type: {
      type: String,
      enum: ['assign_coordinator', 'assign_manager', 'send_email', 'update_status', 'create_notification', 'send_reminder'],
      required: true
    },
    config: {
      assigneeRole: String,
      emailTemplate: String,
      newStatus: String,
      notificationMessage: String,
      reminderDays: Number
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastExecuted: {
    type: Date
  },
  executionCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update updatedAt on save
automationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Execute automation
automationSchema.methods.execute = async function(caseData, triggerData = {}) {
  try {
    for (const action of this.actions) {
      await this.executeAction(action, caseData, triggerData);
    }
    this.lastExecuted = new Date();
    this.executionCount += 1;
    await this.save();
    return { success: true };
  } catch (error) {
    console.error('Automation execution failed:', error);
    return { success: false, error: error.message };
  }
};

// Execute individual action
automationSchema.methods.executeAction = async function(action, caseData, triggerData) {
  const Case = mongoose.model('Case');
  const User = mongoose.model('User');

  switch (action.type) {
    case 'assign_coordinator':
      if (action.config.assigneeRole === 'coordinator') {
        // Find available coordinator
        const coordinator = await User.findOne({ role: 'coordinator', isActive: true });
        if (coordinator) {
          caseData.assignedCoordinator = coordinator._id;
          await caseData.save();
        }
      }
      break;

    case 'assign_manager':
      if (action.config.assigneeRole === 'manager') {
        const manager = await User.findOne({ role: 'manager', isActive: true });
        if (manager) {
          caseData.assignedManager = manager._id;
          await caseData.save();
        }
      }
      break;

    case 'update_status':
      if (action.config.newStatus) {
        caseData.status = action.config.newStatus;
        await caseData.save();
      }
      break;

    case 'send_email':
      // Email sending logic would be implemented here
      console.log(`Sending email: ${action.config.emailTemplate}`);
      break;

    case 'create_notification':
      // Notification creation logic
      console.log(`Creating notification: ${action.config.notificationMessage}`);
      break;

    default:
      console.log(`Unknown action type: ${action.type}`);
  }
};

module.exports = mongoose.model('Automation', automationSchema);
