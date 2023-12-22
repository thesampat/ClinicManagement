const express = require('express');

const { createNutritionEntry, updateNutritionEntry, deleteNutritionEntry, getNutritionEntries,
    getNutritionEntry } = require("../../Controllers/Public/Alternative_Therapies/nutritionController");
const checkRolesPermissions = require('../../Middlewares/PermissionRolesMiddleware');

const router = express.Router();

router.route('/').post(checkRolesPermissions, createNutritionEntry);
router.route('/').get(checkRolesPermissions, getNutritionEntries);
router.route('/:id').get(checkRolesPermissions, getNutritionEntry);
router.route('/:id').put(checkRolesPermissions, updateNutritionEntry);
router.route('/:id').delete(createNutritionEntry, deleteNutritionEntry);

module.exports = router