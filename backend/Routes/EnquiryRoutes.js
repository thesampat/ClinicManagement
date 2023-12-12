const express = require('express');

const { createEnquiry, getAllEnquiry, getEnquiryById, updateEnquiryById, deleteEnquiryById } = require("../Controllers/EnquiryController");
const { protectSuperAdminAndReceptionist } = require("../Middlewares/commonMiddleware")

const router = express.Router();

router.route('/').post(protectSuperAdminAndReceptionist, createEnquiry);
router.route('/').get(protectSuperAdminAndReceptionist, getAllEnquiry);
router.route('/:id').get(protectSuperAdminAndReceptionist, getEnquiryById);
router.route('/:id').patch(protectSuperAdminAndReceptionist, updateEnquiryById);
router.route('/:id').delete(protectSuperAdminAndReceptionist, deleteEnquiryById);

module.exports = router