const express = require('express');
const { createNutritionRecord, getAllNutritionRecords, getNutritionRecordById, deleteNutritionRecord } = require("../Controllers/NutritionController");

const router = express.Router();

router.route('/').post(createNutritionRecord);
router.route('/').get(getAllNutritionRecords);
router.route('/:id').put(getNutritionRecordById);
router.route('/:id').delete(deleteNutritionRecord);

module.exports = router