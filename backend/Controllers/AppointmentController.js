const { Appointment, appointmentStatusEnum } = require("../Models/AppointmentModel");

const createAppointment = async (req, res) => {


  try {
    const {
      patient,
      doctor,
      date = new Date().toISOString(),
      bookDate,
      bookTimeSlot,
      status,
    } = req.body;



    let IsAppointmentExist = await Appointment.find({
      'bookTimeSlot': bookTimeSlot?._id,
      'bookDate': { $regex: `^${String(bookDate)?.slice(0, 10)}` }
    })

    if (IsAppointmentExist.length > 0) {
      return res.status(500).json({ error: "Appointment Is Already Booked" });
    }

    const appointment = new Appointment({
      patient,
      doctor,
      date,
      bookDate: String(bookDate).slice(0, 10),
      bookTimeSlot,
      status
    });

    await appointment.save();
    res.status(201).json('appointment');
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Appointment creation failed" });
  }
};

const getAppointment = async (req, res) => {
  const { page = 1, limit = 10, displayType = undefined, patient = undefined, doctorName, cancelled = undefined } = req.query;
  const skip = (page - 1) * limit;


  try {
    const query = doctorName ? { 'doctor.id': doctorName } : {}; // Create a query object

    if (patient !== 'undefined') {
      query['patient.name'] = { $regex: new RegExp(patient, 'i') };
    }
    query['status'] = 'Booked'



    const appointments = await Appointment.find(query).sort({ bookDate: -1 }).skip(skip).limit(limit);
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve appointments" });
  }
};

const updateStatusAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;

    if (!appointmentStatusEnum.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Appointment update failed" });
  }
};


const getFilteredAppointment = async (req, res) => {
  try {
    const { startDate, endDate, page, pageSize } = req.query;
    const { search } = req.body;

    const query = {};


    // Add custom filters from request body
    if (search && typeof search === 'object') {
      Object.keys(search).forEach((field) => {
        query[field] = search[field];
      });
    }

    const skip = page ? (parseInt(page) - 1) * (pageSize ? parseInt(pageSize) : 10) : 0;
    const limit = pageSize ? parseInt(pageSize) : 10;


    const appointments = await Appointment.find(query)
      .sort({ bookDate: -1 })
      .skip(skip)
      .limit(limit);

    const prettifiedJSON = JSON.stringify(appointments, null, 2);
    res.status(200).send(prettifiedJSON);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}


module.exports = { createAppointment, getAppointment, updateStatusAppointment, getFilteredAppointment }
