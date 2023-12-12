const express = require('express');
const { updateCustomerProfile, deleteCustomerById, createCustomerBySuperAdmin, getAllCustomer, getSinglePatient } = require("../Controllers/CustomerControllers");
const { UploadReport, deleteReport, getReport, getImage, deleteImages } = require('../Controllers/CustomUploadModals');
const { protectSuperAdminAndReceptionist } = require("../Middlewares/commonMiddleware")

const router = express.Router();

router.route('/').post(protectSuperAdminAndReceptionist, createCustomerBySuperAdmin);
router.route('/').get(getAllCustomer);
router.route('/updateProfile/:customerId').put(protectSuperAdminAndReceptionist, updateCustomerProfile)
router.route('/:id').delete(protectSuperAdminAndReceptionist, deleteCustomerById)
router.route('/:id').get(getSinglePatient)


router.route('/upload/:patientId/:uploadType').post(UploadReport)
router.route('/remove/:id/:custid/:uploadType').delete(deleteReport)
router.route('/get/:id').get(getReport)
router.route('/get/image/:id').get(getImage)
router.route('/delete/image/:custid/:uploadType').delete(deleteImages)
module.exports = router