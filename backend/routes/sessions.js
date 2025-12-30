const express = require('express');
const { body, param } = require('express-validator');
const {
    getSessions,
    createSession,
    updateSessionStatus
} = require('../controllers/sessionController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.use(authenticateToken);

router.get('/', getSessions);

router.post('/', [
  body('clientId').isMongoId().withMessage('Client is required'),
  body('coordinatorId').optional().isMongoId().withMessage('Invalid coordinator'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('time_slot').notEmpty().withMessage('Time slot is required')
], createSession);

router.put('/:id', [
    param('id').isMongoId().withMessage('Invalid session ID'),
    body('status').isIn(['pending', 'confirmed', 'completed', 'cancelled']).withMessage('Invalid status')
], updateSessionStatus);

module.exports = router;
