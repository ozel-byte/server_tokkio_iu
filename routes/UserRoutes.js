const express = require('express');
const router = express.Router();

const userService = require('../controllers/UserService');


/*Ruta para inicio de sesion */
router.get('/signIn',userService.getUserId);
/*Ruta para agregar */
router.post('/addUser',userService.addUser);
/* Ruta para obtener informacion de usuario* */
router.get('/getUserUsername',userService.getUserUsername);
/*Ruta para validar el correo para ver si existe */
router.get('/validationCorreo',userService.validationCorreo);
/*Ruta para validar el username para ver si existe */
router.get('/validationUsername',userService.validationUsername)


module.exports = router;