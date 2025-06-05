const express = require('express');
const router = express.Router();
const groceryItemController = require('../controllers/groceryItemController');

// Grocery item routes
router.get('/items', groceryItemController.getAllItems);
router.get('/items/:id', groceryItemController.getItemById);
router.post('/items', groceryItemController.createItem);
router.put('/items/:id', groceryItemController.updateItem);
router.delete('/items/:id', groceryItemController.deleteItem);

module.exports = router;