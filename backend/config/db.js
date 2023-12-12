const mongoose = require('mongoose');
const { Customer } = require("../Models/CustomerModel");
const fs = require('fs')
// const json_data = require('/Users/sampa/Downloads/MOCK_DATA (4).json');
// const { Appointment } = require('../Models/AppointmentModel');

require("dotenv").config()

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

// // console.log(json_data?.[0])
// json_data?.map(async (e, i) => {
//     console.log(e)
//     e['PrescriptionId'] = `${e?.paitendId}${String(e?.Date)?.replaceAll('-', '')}`
//     try {
//         let write = await Appointment.create(e)
//         console.log(i, '------ created')

//     } catch (error) {
//         console.log(error)
//     }
// })

module.exports = connectDB;