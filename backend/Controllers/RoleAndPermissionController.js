const { UserRolePermissionModel } = require('./../Models/UserRolesPermission');

// Create a new user role and permissions entry
const createUserRolePermission = async (req, res) => {
    try {
        const { username, role, permissions, active } = req.body;
        const newUserRolePermission = new UserRolePermissionModel({
            username,
            role,
            permissions,
            active: active || true,
        });

        const savedUserRolePermission = await newUserRolePermission.save();
        return true
    } catch (error) {
        throw new Error('Failed To Create User')
    }
};

// Get all user role and permissions entries
const getAllUserRolePermissions = async (req, res) => {
    try {
        const userRolePermissions = await UserRolePermissionModel.find();
        res.json(userRolePermissions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const userRolePermissions = await UserRolePermissionModel.find(
            { role: { $ne: "MainDoctor" } },
            { _id: 1, role: 1, username: 1 }
        ).exec();

        res.json(userRolePermissions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get user role and permissions entry by username
const getUserRolePermissionByUsername = async (req, res) => {

    try {
        const { username } = req.params;

        const userRolePermission = await UserRolePermissionModel.findOne({ username });

        if (userRolePermission) {
            res.json(userRolePermission);
        } else {
            res.status(404).json({ message: 'User role and permissions not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update user role and permissions entry by username
const updateUserRolePermission = async (req, res) => {
    try {
        const { username } = req.params;
        const { role, permissions, active } = req.body;

        const updatedUserRolePermission = await UserRolePermissionModel.findOneAndUpdate(
            { username },
            { role, permissions, active },
            { new: true }
        );

        if (updatedUserRolePermission) {
            res.json(updatedUserRolePermission);
        } else {
            res.status(404).json({ message: 'User role and permissions not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete user role and permissions entry by username
const deleteUserRolePermission = async (req, res) => {
    try {
        const { username } = req.params;
        const deletedUserRolePermission = await UserRolePermissionModel.findOneAndDelete({
            username,
        });

        if (deletedUserRolePermission) {
            res.json({ message: 'User role and permissions deleted successfully' });
        } else {
            res.status(404).json({ message: 'User role and permissions not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createUserRolePermission,
    getAllUserRolePermissions,
    getUserRolePermissionByUsername,
    updateUserRolePermission,
    deleteUserRolePermission,
    getAllUsers
};
