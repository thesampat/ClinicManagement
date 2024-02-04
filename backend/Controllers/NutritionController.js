const { Nutrition } = require("../Models/NutritionModel");

const createNutritionRecord = async (req, res) => {
    try {
        const newRecord = new Nutrition(req.body);
        const savedRecord = await newRecord.save();
        return res.status(200).json(savedRecord)
    } catch (error) {


        return res.status(500).json({ error: "Error creating nutrition record" });
    }
}

const getAllNutritionRecords = async (req, res) => {
    try {
        const records = await Nutrition.find();
        res.status(200).json(records)
    } catch (error) {


        res.status(500).json({ error: "Error fetching nutrition records" });
    }
}

const getNutritionRecordById = async (req, res) => {
    term
    const { id } = req.params;
    try {
        const record = await Nutrition.findById(id);
        if (!record) {
            return res.status(404).json({ error: "Record not found" });
        }
        res.status(200).json(record);
    } catch (error) {


        res.status(500).json({ error: "Error fetching nutrition record" });
    }
}

const deleteNutritionRecord = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteRecord = await Nutrition.findByIdAndRemove(id);
        if (!deleteRecord) {
            return res.status(404).json({ error: "Record not found" });
        }
        res.status(200).json({ message: "Record deleted successfully" });
    } catch (error) {


        res.status(500).json({ error: "Error deleting nutrition record" });
    }
}

module.exports = {
    createNutritionRecord,
    getAllNutritionRecords,
    getNutritionRecordById,
    deleteNutritionRecord
}