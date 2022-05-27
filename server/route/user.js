const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// create read update delete
router.get('/', userController.view);
router.post('/', userController.find);
router.get('/adduser', userController.form);
router.post('/adduser', userController.create);
router.get('/edituser/:id', userController.edit);
module.exports = router;