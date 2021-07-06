const express = require('express');
const router = express.Router();

const userService = require('../controllers/UserService');

router.get('/signIn',userService.getUserId);
router.post('/addUser',userService.addUser);


module.exports = router;