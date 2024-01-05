const jwt = require('jsonwebtoken');
const { getFilteredAppointment } = require('../Controllers/AppointmentController');

const verifyToken = (req, res) => {
    const { authorization } = req.headers;
    if (authorization) {
        const token = authorization.replace("Bearer ", "")
        let payload = jwt.verify(token, "clinic7865", (err, payload) => {
            if (err) {
                return res.status(401).json({ error: "you must be logged in" })
            }
            return payload
        })

        return payload
    }
}

const checkRolesPermissions = (req, res, next) => {
    let access = verifyToken(req, res)
    const { role, id } = access
    const { originalUrl } = req

    //     Admin
    // AssistantDoctor
    // Consultant
    // Customer
    // Doctor
    // MainDoctor
    // Receptionist
    // Customer

    let query = {}

    switch (originalUrl?.split('/')?.[1]) {
        case 'appointment':
            if (['Consultant', 'Doctor', 'AssistantDoctor'].includes(role) === true) {
                query['doctor.id'] = id
            }
    }
    req.accessFilter = query

    next()

};

module.exports = checkRolesPermissions;
