const express = require('express');
const itemController = require("./../controllers/itemController")
const router = express.Router();

router.get('/', itemController.getAll);
router.post('/',itemController.createItem)
router.get('/:id', itemController.getItem);
router.patch('/:id', itemController.updateItem);
router.delete('/:id', itemController.deleteItem);


module.exports = router
