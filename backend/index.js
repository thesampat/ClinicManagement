const express = require('express');
require('dotenv').config();
const cors = require('cors');

const customerRoutes = require("./Routes/CustomerRoutes")
const superAdminRoutes = require("./Routes/SuperAdminRoutes")
const doctorsRoutes = require("./Routes/DoctorsRoutes")
const receptionistRoutes = require("./Routes/ReceptionistRoutes")
const consultantRoutes = require("./Routes/ConsultantRoutes")
const appointmentRoutes = require("./Routes/AppointmentRoutes")
const prescriptionRoutes = require("./Routes/PrescriptionRoutes")
const nutritionRoutes = require("./Routes/NutritionRoutes")
const enquiryRoutes = require("./Routes/EnquiryRoutes")
const assistantDoctor = require("./Routes/AssistantDoctorRoutes")
const inventory = require("./Routes/InventoryRoutes")
const adminRouter = require('./Routes/AdminRoutes')
const RolesPermissionRoutes = require('./Routes/RoleAndPermission')


// Direct Routers
const IncomeAndExpensesRouter = require('./Controllers/IncomeAndExpensesController')


const connectDB = require("./config/db");


//External Routes
const { createCustomerByExternal } = require('./Controllers/Public/ExternalCustomerControllers');
const { createExternalAppointment } = require('./Controllers/Public/ExternalAppointmentController');
const checkRolesPermissions = require('./Middlewares/PermissionRolesMiddleware');

const app = express();
app.use(express.json());
app.use(cors());

connectDB()

app.get('/', (req, res) => {
    res.send('welcome!')
})

app.use("/customer", checkRolesPermissions, customerRoutes);
app.use("/superAdmin", superAdminRoutes);
app.use("/doctor", doctorsRoutes);
app.use("/assistantDoctor", assistantDoctor);
app.use("/receptionist", receptionistRoutes);
app.use("/consultant", consultantRoutes);
app.use("/appointment", appointmentRoutes);
app.use("/prescription", prescriptionRoutes);
app.use("/nutrition", nutritionRoutes);
app.use("/enquiry", enquiryRoutes);
app.use("/public/customer", createCustomerByExternal);
app.use("/public/appointment", createExternalAppointment)
app.use("/incomeExpense", IncomeAndExpensesRouter)
app.use("/inventory", inventory)
app.use("/configAccess", RolesPermissionRoutes)
app.use("/admin", adminRouter)



const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log("server is running!")
})

