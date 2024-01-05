const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { AssistantDoctor } = require('../Models/AssitantDoctorModel');
const { Doctor } = require('../Models/DoctorsModel');
const { Consultant } = require('../Models/ConsultantModel');
const { Receptionist } = require('../Models/ReceptionistModel');
const { MainDoctor } = require('../Models/MainDoctorModel');

// Reset password route
router.post('/:userId/:roleId', async (req, res) => {
    const { roleId, userId } = req.params;
    const { newPassword } = req.body;

    try {
        let userModel;

        switch (roleId) {
            case 'AssistantDoctor':
                userModel = AssistantDoctor;
                break;
            case 'Doctor':
                userModel = Doctor;
                break;
            case 'Consultant':
                userModel = Consultant;
                break;
            case 'Receptionist':
                userModel = Receptionist;
                break;
            case 'MainDoctor':
                userModel = MainDoctor;
                break;
            case 'SuperAdmin':
                userModel = SuperAdmin;
                break;
            default:
                return res.status(404).json({ error: 'Invalid role.' });
        }

        let user
        try {
            user = await userModel.findById(userId);
        } catch (error) {
            res.status(400).send('Something went wrong')
        }

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }


        bcrypt.hash(newPassword, 10, async function (err, hash) {
            if (err) {
                return res.status(500).send(err);
            }

            user.password = hash;
            let passres = await user.save();
            console.log(passres, 'what is res')

            return res.status(200).json({ msg: 'Password reset successfully.' });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

module.exports = router;
