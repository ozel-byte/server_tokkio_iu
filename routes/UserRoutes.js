const express = require('express');
const router = express.Router();

const userService = require('../controllers/UserService');

router.get('/signIn',userService.getUserId);
router.post('/addUser',userService.addUser);
router.get('/getUserUsername',userService.getUserUsername);
router.get('/validationCorreo',userService.validationCorreo)


module.exports = router;