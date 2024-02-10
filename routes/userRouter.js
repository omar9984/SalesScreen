const express = require('express');
const userController = require("./../controllers/userController")
const router = express.Router();

router.get('/', userController.getAll);
router.post('/',userController.createUser)
router.get('/:id', userController.getUser);
router.get('/invoices/:id', userController.getUserInvoices);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);


module.exports = router
