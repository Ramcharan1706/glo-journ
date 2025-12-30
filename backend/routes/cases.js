const express = require('express');
const { body, param, query } = require('express-validator');
const {
  getCases,
  getCase,
  createCase,
  updateCase,
  deleteCase,
  addNote
} = require('../controllers/caseController');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Validation rules
const caseValidation = [
  body('visaType')
    .isIn(['tourist', 'business', 'student', 'work', 'family', 'other'])
    .withMessage('Invalid visa type'),
  body('applicationDetails.destinationCountry')
    .optional()
    .isLength({ min: 2 })
    .withMessage('Destination country must be at least 2 characters'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'urgent'])
    .withMessage('Invalid priority level')
];

const updateCaseValidation = [
  body('status')
    .optional()
    .isIn(['draft', 'submitted', 'under_review', 'approved', 'rejected', 'completed'])
    .withMessage('Invalid status'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'urgent'])
    .withMessage('Invalid priority level'),
  body('assignedCoordinator')
    .optional()
    .isMongoId()
    .withMessage('Invalid coordinator ID'),
  body('assignedManager')
    .optional()
    .isMongoId()
    .withMessage('Invalid manager ID')
];

// Routes
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('status').optional().isIn(['draft', 'submitted', 'under_review', 'approved', 'rejected', 'completed']).withMessage('Invalid status'),
  query('priority').optional().isIn(['low', 'medium', 'high', 'urgent']).withMessage('Invalid priority'),
  query('assignedTo').optional().isIn(['me']).withMessage('Invalid assignedTo value')
], getCases);

router.get('/:id', [
  param('id').isMongoId().withMessage('Invalid case ID')
], getCase);

router.post('/', caseValidation, createCase);

router.put('/:id', [
  param('id').isMongoId().withMessage('Invalid case ID'),
  ...updateCaseValidation
], updateCase);

router.delete('/:id', [
  param('id').isMongoId().withMessage('Invalid case ID'),
  requireRole('admin')
], deleteCase);

router.post('/:id/notes', [
  param('id').isMongoId().withMessage('Invalid case ID'),
  body('content').trim().isLength({ min: 1 }).withMessage('Note content is required')
], addNote);

module.exports = router;
