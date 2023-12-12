const express = require('express');
const { receptionistRegisterBySuperAdmin, receptionistLogin, updateReceptionistProfile, deleteReceptionistById, getAllReceptionist, getSingleReceptionist } = require("../Controllers/ReceptionistControllers");
const { protectSuperAdmin } = require('../Middlewares/requireLoginSuperAdmin');
const { UploadReport, deleteReport, getReport, getImage, deleteImages, UploadMultipleDocs } = require('../Controllers/CustomUploadModals');


const router = express.Router()

router.route("/").post(receptionistRegisterBySuperAdmin);
router.route("/").get(getAllReceptionist)
router.route("/:id").get(getSingleReceptionist)
router.route("/login").post(receptionistLogin);
router.route("/profile/:receptionistId").put(updateReceptionistProfile);
router.route("/:id").delete(protectSuperAdmin, deleteReceptionistById)

router.route('/upload/:itemId/:uploadType').post(UploadReport)
router.route('/upload_files/:itemId/:uploadType').post(UploadMultipleDocs)
router.route('/remove/:id/:itemId/:uploadType').delete(deleteReport)
router.route('/get/:id').get(getReport)
router.route('/get/image/:id').get(getImage)
router.route('/delete/image/:itemId/:uploadType').delete(deleteImages)

module.exports = router