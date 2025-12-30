const express = require('express');
const { body, param, query } = require('express-validator');
const {
  getApplications,
  getMyApplication,
  createApplication,
  updateApplication
} = require('../controllers/applicationController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Validation rules
const applicationValidation = [
  body('visaType')
    .isIn(['tourist', 'business', 'student', 'work', 'family', 'other'])
    .withMessage('Invalid visa type'),
  body('applicationDetails.destinationCountry')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Destination country must be at least 2 characters'),
  body('applicationDetails.purposeOfVisit')
    .optional()
    .trim()
    .isLength({ min: 10 })
    .withMessage('Purpose of visit must be at least 10 characters'),
  body('applicationDetails.intendedDateOfEntry')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format'),
  body('applicationDetails.intendedLengthOfStay')
    .optional()
    .isInt({ min: 1, max: 365 })
    .withMessage('Length of stay must be between 1 and 365 days'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'urgent'])
    .withMessage('Invalid priority level')
];

const updateApplicationValidation = [
  param('id').isMongoId().withMessage('Invalid application ID'),
  body('visaType')
    .optional()
    .isIn(['tourist', 'business', 'student', 'work', 'family', 'other'])
    .withMessage('Invalid visa type'),
  body('applicationDetails.destinationCountry')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Destination country must be at least 2 characters'),
  body('applicationDetails.purposeOfVisit')
    .optional()
    .trim()
    .isLength({ min: 10 })
    .withMessage('Purpose of visit must be at least 10 characters'),
  body('applicationDetails.intendedDateOfEntry')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format'),
  body('applicationDetails.intendedLengthOfStay')
    .optional()
    .isInt({ min: 1, max: 365 })
    .withMessage('Length of stay must be between 1 and 365 days'),
  body('status').optional().isIn(['draft', 'submitted', 'under_review', 'processing', 'approved', 'rejected', 'completed']).withMessage('Invalid status'),
  body('assignedCoordinator').optional().isMongoId().withMessage('Invalid coordinator ID'),
  body('assignedManager').optional().isMongoId().withMessage('Invalid manager ID'),
  body('priority').optional().isIn(['low', 'medium', 'high', 'urgent']).withMessage('Invalid priority level')
];

// Routes
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('status').optional().isIn(['draft', 'submitted', 'under_review', 'processing', 'approved', 'rejected', 'completed']).withMessage('Invalid status'),
  query('priority').optional().isIn(['low', 'medium', 'high', 'urgent']).withMessage('Invalid priority')
], getApplications);

router.get('/my-application', getMyApplication);

router.post('/', applicationValidation, createApplication);

router.put('/:id', updateApplicationValidation, updateApplication);

module.exports = router;
