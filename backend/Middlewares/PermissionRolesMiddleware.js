// CheckRolesPermissions.js
const checkRolesPermissions = (req, res, next) => {

    let { a } = req.query

    if (a === 'yes') {
        next()
    } else {
        res.status(400).send('Not Allowing.... Anyone');
    }

};

module.exports = checkRolesPermissions;
