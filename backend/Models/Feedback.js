const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    Status: String,
    CaseNo: String,
    Date: String,
    FirstName: String,
    MiddleName: String,
    LastName: String,
    dateOfBirth: String,
    bloodGroup: String,
    gender: String,
    mobile: String,
    maritalStatus: String,
    motherTongue: String,
    state: String,
    education: String,
    address: String,
    profession: String,
    industry: String,
    email: String,
    comments: String,
    signature: String,
    comments1: String,
    signature1: String,
    comments2: String,
    signature2: String,
    comments3: String,
    signature3: String,
    comments4: String,
    signature4: String,
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
