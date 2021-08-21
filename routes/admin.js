const router = require('express').Router();
const adminController = require('../controllers/adminController');
// endpoint customer
router.get('/dashboard', adminController.viewDashboard);
router.get('/customer', adminController.viewCustomer);
router.post('/customer', adminController.addCustomer);
router.put('/customer', adminController.editCustomer);
router.delete('/customer/:id', adminController.deleteCustomer);

// endpoint download to excel
router.get('/download', adminController.download);

module.exports = router;