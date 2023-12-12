const express = require('express');
const { createPrescription, getPrescriptionDetails, getAllPrescriptions, getFeesCollectedData, getFilteredPrescription, getPrescriptionStatusData } = require("../Controllers/PrescriptionController");
const { UploadReport, deleteReport, getReport, getImage, deleteImages } = require('../Controllers/PrescriptionUploads');


const router = express.Router();

router.route('/').post(createPrescription);
router.route('/').get(getAllPrescriptions);
router.route('/getFiltered').get(getFilteredPrescription)
// getPrescriptionStatusData
router.route('/getDurationData').get(getPrescriptionStatusData)
router.route('/getFeesData').get(getFeesCollectedData)


router.route('/upload/:prescriptionId/:uploadType').post(UploadReport)
router.route('/remove/:id/:presid/:uploadType').delete(deleteReport)
router.route('/get/:id').get(getReport)
router.route('/get/image/:id').get(getImage)
router.route('/delete/image/:presid/:uploadType').delete(deleteImages)

// router.route('/patients/:mobileNumber').get(getPrescriptionDetails);

module.exports = router