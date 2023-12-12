const express = require('express');
const { protectSuperAdmin } = require('../Middlewares/requireLoginSuperAdmin');
const { consultantRegisterBySuperAdmin, consultantLogin, updateConsultantProfile, deleteConsultantById, getAllConsultant, getSingleConsultant } = require('../Controllers/ConsultantControllers');
const { UploadReport, deleteReport, getReport, getImage, deleteImages, UploadMultipleDocs } = require('../Controllers/CustomUploadModals');
const router = express.Router();

router.route("/").post(protectSuperAdmin, consultantRegisterBySuperAdmin);
router.route("/").get(getAllConsultant);
router.route("/:id").get(getSingleConsultant);
router.route("/login").post(consultantLogin);
router.route("/profile/:consultantId").put(updateConsultantProfile)
router.route("/:id").delete(protectSuperAdmin, deleteConsultantById)



router.route('/upload/:itemId/:uploadType').post(UploadReport)
router.route('/upload_files/:itemId/:uploadType').post(UploadMultipleDocs)
router.route('/remove/:id/:itemId/:uploadType').delete(deleteReport)
router.route('/get/:id').get(getReport)
router.route('/get/image/:id').get(getImage)
router.route('/delete/image/:itemId/:uploadType').delete(deleteImages)

module.exports = router