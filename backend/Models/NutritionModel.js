const mongoose = require("mongoose");

const nutritionSchema = new mongoose.Schema({
    fullName:{type:String},
    DOB:{type:String},
    gender:{type:String},
    bloodGroup:{type:String},
    ocupation:{type:String},
    weight:{type:String},
    height:{type:String}
})

const Nutrition = mongoose.model("Nutrition",nutritionSchema);

module.exports = {Nutrition}