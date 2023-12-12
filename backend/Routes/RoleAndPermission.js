const express = require('express');
const { createUserRolePermission, getAllUserRolePermissions, getUserRolePermissionByUsername, updateUserRolePermission, deleteUserRolePermission, } = require("../Controllers/RoleAndPermissionController");


const router = express.Router();

router.route('/').get(getAllUserRolePermissions);
router.route('/:username').get(getUserRolePermissionByUsername);
router.route('/:username').put(updateUserRolePermission);


module.exports = router