const express = require('express');
const { getSingleDoctor, doctorRegisterBySuperAdmin, doctorLogin, updateDoctorProfile, deleteDoctorById, getAllDoctor } = require("../Controllers/DoctorsControllers")
const { protectSuperAdmin } = require("../Middlewares/requireLoginSuperAdmin");
const { getAllDoctor_External } = require('../Controllers/Public/ExternalDoctorController');
const { UploadReport, deleteReport, getReport, getImage, deleteImages, UploadMultipleDocs } = require('../Controllers/DoctorUploads');

const router = express.Router();

router.route('/login').post(doctorLogin)
router.route("/profile/:doctorId").put(updateDoctorProfile)
router.route("/:id").delete(protectSuperAdmin, deleteDoctorById)
router.route("/:id").get(getSingleDoctor)
router.route('/').get(getAllDoctor);
router.route('/').post(protectSuperAdmin, doctorRegisterBySuperAdmin)

router.route('/external/doctor').get(getAllDoctor_External)

router.route('/upload/:itemId/:uploadType').post(UploadReport)
router.route('/upload_files/:itemId/:uploadType').post(UploadMultipleDocs)
router.route('/remove/:id/:itemId/:uploadType').delete(deleteReport)
router.route('/get/:id').get(getReport)
router.route('/get/image/:id').get(getImage)
router.route('/delete/image/:itemId/:uploadType').delete(deleteImages)


module.exports = router