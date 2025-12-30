const express = require('express');
const {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    toggleUserStatus
} = require('../controllers/userController');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// protect all routes
router.use(authenticateToken);

router.get('/', requireRole('admin', 'manager', 'coordinator'), getUsers);
router.get('/:id', requireRole('admin', 'manager', 'coordinator'), getUser);
router.put('/:id', requireRole('admin', 'manager', 'coordinator'), updateUser);
router.delete('/:id', requireRole('admin'), deleteUser);
router.patch('/:id/status', requireRole('admin', 'manager', 'coordinator'), toggleUserStatus);

module.exports = router;
