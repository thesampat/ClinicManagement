const { Enquiry } = require("../Models/EnquiryModel");

const createEnquiry = async (req, res) => {
  try {
    const enquiry = new Enquiry(req.body);
    let newEnquiry = await enquiry.save();
    return res.status(201).send({ msg: 'Enquiry created successfully.', data: newEnquiry?._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const getAllEnquiry = async (req, res) => {
  try {
    const enquiries = await Enquiry.find();
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getEnquiryById = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    res.json(enquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const updateEnquiryById = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    res.json(enquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const deleteEnquiryById = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndRemove(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    res.json({ message: "Enquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


const getSingleEnquiry = async (req, res) => {
  try {
    const enquieryId = req.params.id;
    const customer = await Enquiry.findById(new mongoose.Types.ObjectId(enquieryId));
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    return res.status(200).json(customer);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'An error occurred while fetching the customer' });
  }
};



module.exports = { createEnquiry, getAllEnquiry, getEnquiryById, updateEnquiryById, deleteEnquiryById }