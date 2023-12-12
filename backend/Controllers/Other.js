const { UserRolePermissionModel } = require('./../Models/UserRolesPermission');


const setPermissionRoles = async (name, role, id) => {

    let userExist = await UserRolePermissionModel.countDocuments({ name }).get()

    try {
        const newUserRolePermission = new UserRolePermissionModel({
            user_id: id,
            username: name,
            role: role,
        });

        await newUserRolePermission.save();
        return true
    } catch (error) {
        throw new Error('Failed To Create User')
    }
}


const getPermissions = async (id) => {
    let permissions
    try {
        permissions = await UserRolePermissionModel.findOne({ user_id: id })
        return permissions
    } catch (error) {

    }

}


module.exports = { setPermissionRoles, getPermissions }