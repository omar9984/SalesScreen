const express = require('express');
const invoiceController = require("./../controllers/invoiceController")
const router = express.Router();

router.get('/', invoiceController.getAll);
router.post('/',invoiceController.createInvoice)
router.get('/:id', invoiceController.getInvoice);
router.patch('/:id', invoiceController.updateInvoiceStatus);
router.delete('/:id', invoiceController.deleteInvoice);


module.exports = router
