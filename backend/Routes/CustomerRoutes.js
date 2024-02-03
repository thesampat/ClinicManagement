const express = require('express');
const { updateCustomerProfile, deleteCustomerById, createCustomerBySuperAdmin, getAllCustomer, getSinglePatient } = require("../Controllers/CustomerControllers");
const { UploadReport, deleteReport, getReport, getImage, deleteImages } = require('../Controllers/CustomUploadModals');
const { protectSuperAdminAndReceptionist } = require("../Middlewares/commonMiddleware")

const router = express.Router();

router.route('/').post(createCustomerBySuperAdmin);
router.route('/').get(getAllCustomer);
router.route('/updateProfile/:customerId').put(updateCustomerProfile)
router.route('/:id').delete(deleteCustomerById)
router.route('/:id').get(getSinglePatient)


router.route('/upload/:itemId/:uploadType').post(UploadReport)
router.route('/remove/:id/:itemId/:uploadType').delete(deleteReport)
router.route('/get/:id').get(getReport)
router.route('/get/image/:id').get(getImage)
router.route('/delete/image/:itemId/:uploadType').delete(deleteImages)
module.exports = router