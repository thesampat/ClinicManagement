const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Consultant } = require("../Models/ConsultantModel");
const { SuperAdmin } = require("../Models/SuperAdminModel");
require("dotenv").config();

const generateItemId = async () => {
    try {
        const count = await Consultant.countDocuments({});
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');

        const ItemId = `${year}${month}${day}${count}`;
        return ItemId;
    } catch (err) {
        console.error(err);
        return null;
    }
};

const consultantRegisterBySuperAdmin = async (req, res) => {
    const { name, email, password, fees, typesOfDoctor, pic, education_details, experience_details, location } = req.body;
    let consultantId
    const Role = "Consultant";
    if (!name || !email || !password) {
        return res.status(422).json({ error: "Please provide all fields." });
    }

    try {
        let res = await generateItemId()
        consultantId = res
    } catch (error) {
        console.log(error)
        return res.status(500).send('Error! Please Try Again')
    }

    try {
        const requestId = req.superadmin._id
        // console.log(requestId)
        const requester = await SuperAdmin.findById(requestId);

        if (!requester || requester.role !== 'SuperAdmin') {
            return res.status(403).json({ error: 'Only SuperAdmins can register doctors.' });
        }

        const authConsultant = await Consultant.findOne({ email })
        if (authConsultant) {
            return res.status(403).send({ msg: 'Consultant is already registered.' });
        }

        bcrypt.hash(password, 10, async function (err, hash) {
            if (err) {
                return res.status(500).send(err);
            }

            try {
                const newConsultant = new Consultant({
                    name,
                    email,
                    password: hash,
                    role: Role,
                    pic,
                    fees,
                    typesOfDoctor,
                    consultantId,
                    education_details,
                    experience_details,
                    location
                })

                await setPermissionRoles(name, Role)
                await newConsultant.save()
                return res.status(201).send({ msg: 'Consultant registered successfully.', data: newConsultant?._id });
            } catch (error) {
                console.log(error)
                return res.status(403).send(error);
            }
        })

    } catch (error) {
        return res.status(500).send(error);
    }
}

const getAllConsultant = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;
        const skip = (page - 1) * limit;

        // Define a query object to filter based on search term
        const query = {
            $or: [
                { name: { $regex: search, $options: 'i' } }, // Case-insensitive search by name
                { email: { $regex: search, $options: 'i' } }, // Case-insensitive search by email
                { typesOfDoctor: { $regex: search, $options: 'i' } }, // Case-insensitive search by typesOfDoctor
            ],
        };

        const consultants = await Consultant.find(query)
            .skip(skip)
            .limit(parseInt(limit));

        return res.status(200).send(consultants);
    } catch (error) {
        return res.status(500).send(error);
    }
}

const consultantLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(422)
            .json({ error: "Please provide email and password." });
    }

    try {
        const consultant = await Consultant.findOne({ email })

        if (!consultant) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        bcrypt.compare(password, consultant.password, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Server error." });
            }

            if (result) {
                const token = jwt.sign(
                    { consultantId: consultant._id },
                    process.env.SECRET_KEY,
                    {
                        expiresIn: "1h",
                    }
                );

                return res.status(200).json({
                    message: "Consultant Login Successful!",
                    token,
                    data: {
                        _id: consultant._id,
                        name: consultant.name,
                        email: consultant.email,
                        role: consultant.role,
                        fees: consultant.fees,
                        typesOfconsultant: consultant.typesOfconsultant,
                        pic: consultant.pic,
                    }
                })
            } else {
                return res.status(401).json({ error: "Invalid credentials." });
            }
        })
    } catch (error) {
        return res.status(500).json({ error: "Server error." });
    }
}

const updateConsultantProfile = async (req, res) => {
    const { consultantId } = req.params
    const consultant = await Consultant.findById(consultantId)

    if (consultant) {
        consultant.name = req.body.name || consultant.name
        consultant.email = req.body.email || consultant.email
        consultant.fees = req.body.fees || consultant.fees
        consultant.typesOfDoctor = req.body.typesOfDoctor || consultant.typesOfDoctor
        consultant.education_details = req.body.education_details || consultant.education_details
        consultant.experience_details = req.body.experience_details || consultant.experience_details
        consultant.location = req.body.location || consultant.location
        consultant.phone = req.body.phone || consultant.phone
        const updatedConsultant = await consultant.save()

        res.json(updatedConsultant)
    } else {
        res.status(404);
        throw new Error("Consultant not found!");
    }
}

const deleteConsultantById = async (req, res) => {
    const consultant = await Consultant.findById(req.params.id);

    if (consultant) {
        await consultant.deleteOne()
        res.json({ message: "Consultant Removed" })
    } else {
        res.status(404)
        throw new Error("Consultant not found")
    }
}


const getSingleConsultant = async (req, res) => {

    try {
        const rescp = await Consultant.findById(req.params.id)
        res.status(200).send(rescp)

    } catch (error) {
        res.status(404).send('Something went wrong')
    }
}


module.exports = { getSingleConsultant, consultantRegisterBySuperAdmin, getAllConsultant, consultantLogin, updateConsultantProfile, deleteConsultantById }