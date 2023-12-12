const mongoose = require("mongoose");

const consultantSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    profile_image: [],
    education_details: { type: String },
    experience_details: { type: String },
    fees: { type: String },
    location: { type: String },
    typesOfDoctor: { type: String },
    role: { type: String, enum: ["Consultant"], required: true },
    phone: { type: String },
    consultantId: { type: String },
    educationDoc: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reports.file'
    },
    experienceDoc: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reports.file'
    },
    resumeDoc: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reports.file'
    },
    registrationDoc: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reports.file'
    },
    otherDocs: [],
    status: { type: String, default: 'Active' },
    exit_date: { type: String },
    exit_reason: { type: String }
})

const Consultant = mongoose.model("Consultant", consultantSchema);

module.exports = { Consultant }