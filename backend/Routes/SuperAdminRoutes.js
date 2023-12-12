const express = require('express');
const { superAdminRegister, superAdminLogin } = require("../Controllers/SuperAdminControllers");


const router = express.Router();

router.route('/').post(superAdminRegister);
router.route('/login').post(superAdminLogin);


module.exports = router