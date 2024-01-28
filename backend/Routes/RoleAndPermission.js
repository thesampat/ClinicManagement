const express = require('express');
const { createUserRolePermission, getAllUserRolePermissions, getUserRolePermissionByUsername, updateUserRolePermission, deleteUserRolePermission, getAllUsers } = require("../Controllers/RoleAndPermissionController");
const checkRolesPermissions = require('../Middlewares/PermissionRolesMiddleware');


const router = express.Router();

router.route('/').get(getAllUserRolePermissions);
router.route('/:username').get(checkRolesPermissions, getUserRolePermissionByUsername);
router.route('/:username').put(checkRolesPermissions, updateUserRolePermission);
router.route('/users/getUsers').get(getAllUsers);


module.exports = router