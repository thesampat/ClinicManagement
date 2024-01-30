const { default: mongoose } = require("mongoose");
const { Customer } = require("../Models/CustomerModel");
const { SuperAdmin } = require("../Models/MainDoctorModel");
require("dotenv").config();

const generatePatientId = async () => {
  try {
    const count = await Customer.countDocuments({});
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');

    const patientId = `${year}${month}${day}${count}`;
    return patientId;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const createCustomerBySuperAdmin = async (req, res) => {
  try {
    const {
      firstName,
      surname,
      email,
      middleName,
      bloodGroup,
      gender,
      maritalStatus,
      motherTongue,
      education,
      country,
      state,
      city,
      area,
      pincode,
      reference,
      patient_reference,
      location,
      patientStatus,
      profession,
      mobile,
      pic,
      status,
      patientId,
      date,
      dateOfBirth,
      anniversary,
      weight,
      height,
      diagnosis,
      package,
      industry,
    } = req.body;


    let customerId

    try {
      let res = await generatePatientId()
      customerId = res
    } catch (error) {
      res.status(500).send('Error! Please Try Again')
    }


    const Role = "Customer";

    const customerData = {
      firstName,
      surname,
      email,
      bloodGroup,
      gender,
      middleName,
      maritalStatus,
      motherTongue,
      education,
      country,
      state,
      city,
      area,
      reference,
      patient_reference,
      location,
      pincode,
      patientStatus,
      profession,
      pic,
      mobile,
      role: Role,
      status,
      patientId,
      date,
      dateOfBirth,
      anniversary,
      weight,
      height,
      diagnosis,
      package,
      industry,
      customerId
    };

    const customer = new Customer(customerData);

    // Save the Customer record
    let newCustomer = await customer.save();

    let message = "Customer created by ";

    return res.status(201).send({ msg: 'Patient registered successfully.', data: newCustomer?._id });

  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message });
  }
};


const updateCustomerProfile = async (req, res) => {
  try {
    const superAdminId = req?.user?._id;
    const customerId = req.params.customerId;
    const updateData = req.body;

    // Find the Customer by ID and update its data
    const customer = await Customer.findByIdAndUpdate(customerId, updateData, {
      new: true,
    });

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    return res.status(200).json({ msg: 'Customer updated successfully.', customer });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteCustomerById = async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (customer) {
    await customer.deleteOne()
    res.json({ message: "Customer Removed" })
  } else {
    res.status(404)
    throw new Error("Doctor not found")
  }
}

const getAllCustomer = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const search = req.query.search ? {
      $or: [
        { firstName: { $regex: req.query.search, $options: 'i' } },
        { surname: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } },
        { mobile: { $regex: req.query.search, $options: 'i' } },
      ]
    } : {}

    const customers = await Customer.find(search)
      .skip(skip)
      .limit(parseInt(limit))

    return res.status(200).send(customers)

  } catch (error) {
    return res.status(500).send(error);
  }
}


const getSinglePatient = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findById(new mongoose.Types.ObjectId(customerId));
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    return res.status(200).json(customer);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'An error occurred while fetching the customer' });
  }
};




module.exports = { createCustomerBySuperAdmin, updateCustomerProfile, deleteCustomerById, getAllCustomer, getSinglePatient };
