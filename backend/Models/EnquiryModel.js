const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
    name:{type:String},
    number:{type:Number},
    location:{type:String},
    reference:{type:String},
    purposeOfEnquiry:{type:String},
    conslusion:{type:String}
})

const Enquiry = mongoose.model("Enquiry",enquirySchema);

module.exports = {Enquiry}