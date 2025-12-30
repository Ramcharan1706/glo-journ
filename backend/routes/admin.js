const express = require('express');
const { getStats } = require('../controllers/adminController');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication and admin/manager/coordinator access
router.use(authenticateToken);
router.use(requireRole('admin', 'manager', 'coordinator'));

// Get admin statistics
router.get('/stats', getStats);

module.exports = router;
