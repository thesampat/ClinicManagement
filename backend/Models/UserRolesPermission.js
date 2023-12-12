const mongoose = require("mongoose");

const userRolePermissionSchema = new mongoose.Schema({
    username: String,
    role: String,
    permissions: [],
    active: { type: Boolean, default: true }
})

const UserRolePermissionModel = mongoose.model("RoleAndPermissions", userRolePermissionSchema);

module.exports = { UserRolePermissionModel }