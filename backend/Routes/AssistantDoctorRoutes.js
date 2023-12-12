const express = require('express');
const { assistantDoctorRegisterBySuperAdmin, getAllAssistantDoctor, AssistantDoctorLogin, deleteAssistantDoctorById, getSingleAssistantDoctor, updateAssistantDoctor } = require("../Controllers/AssistantDoctorController")
const { protectSuperAdmin } = require("../Middlewares/requireLoginSuperAdmin");
const { getAllDoctor_External } = require('../Controllers/Public/ExternalDoctorController');
const { UploadReport, deleteReport, getReport, getImage, deleteImages, UploadMultipleDocs } = require('../Controllers/CustomUploadModals');

const router = express.Router();

router.route('/login').post(AssistantDoctorLogin)
router.route("/profile/:doctorId").put(updateAssistantDoctor)
router.route("/:id").delete(protectSuperAdmin, deleteAssistantDoctorById)
router.route("/:id").get(getSingleAssistantDoctor)
router.route('/').get(getAllAssistantDoctor);
router.route('/').post(protectSuperAdmin, assistantDoctorRegisterBySuperAdmin)

router.route('/upload/:itemId/:uploadType').post(UploadReport)
router.route('/upload_files/:itemId/:uploadType').post(UploadMultipleDocs)
router.route('/remove/:id/:itemId/:uploadType').delete(deleteReport)
router.route('/get/:id').get(getReport)
router.route('/get/image/:id').get(getImage)
router.route('/delete/image/:itemId/:uploadType').delete(deleteImages)


module.exports = router