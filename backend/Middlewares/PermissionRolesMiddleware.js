const jwt = require('jsonwebtoken');

const verifyToken = (req, res) => {
    const { authorization } = req.headers;
    if (authorization) {
        const token = authorization.replace("Bearer ", "")
        jwt.verify(token, "clinic7865", (err, payload) => {
            if (err) {
                return res.status(401).json({ error: "you must be logged in" })
            }
            return payload
        })
    }
}

const checkRolesPermissions = (req, res, next) => {

    let token = verifyToken(req, res)
    next()

};

module.exports = checkRolesPermissions;
