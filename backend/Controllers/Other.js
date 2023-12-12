const { UserRolePermissionModel } = require('./../Models/UserRolesPermission');


const setPermissionRoles = async (name, role) => {

    let userExist = await UserRolePermissionModel.countDocuments({ name }).get()

    try {
        const newUserRolePermission = new UserRolePermissionModel({
            username: name,
            role: role,
        });

        await newUserRolePermission.save();
        return true
    } catch (error) {
        throw new Error('Failed To Create User')
    }
}


module.exports = setPermissionRoles