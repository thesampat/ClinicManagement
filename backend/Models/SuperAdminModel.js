const mongoose = require("mongoose");

const superAdminSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    pic: {
        type: String,
        default:
            "https://res.cloudinary.com/dmzzzl5jj/image/upload/v1673894892/avatar_gvyled.jpg",
    },
    role: { type: String, enum: ["SuperAdmin"], required: true },
    superAdminId: { type: String }
})

const SuperAdmin = mongoose.model("SuperAdmin", superAdminSchema);

module.exports = { SuperAdmin }