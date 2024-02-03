const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nutritionSchema = new Schema({
    nutritionId: String,
    fullName: String,
    dateOfBirth: Date,
    gender: String,
    bloodGroup: String,
    profession: String,
    weight: String,
    height: String,
    transport: String,
    workout: String,
    howlongworkout: String,
    exercises: String,
    goal: String,
    Measurements: String,
    weighteasily: String,
    area: String,
    gaingweight: String,
    drink: String,
    food: String,
    veg: String,
    fasting: String,
    family: String,
    month: String,
    edibleOil: String,
    gheeFrequency: String,
    state: String,
    waterIntake: String,
    constipationFrequency: String,
    dislikedFood: String,
    likedFood: String,
    wakeUpTime: String,
    snore: String,
    freshness: String,
    wakeUpMethod: String,
    breakfastTime: String,
    breakfastContent: String,
    sleepTime: String,
    betweenMeals: String,
    hungerFeeling: String,
    mouthDryness: String,
    relationshipWithFood: String,
    sexLife: String,
    teaCoffeeConsumption: String,
    bedtimeHunger: String,
    sleepRating: String,
    lunchTime: String,
    lunchContent: String,
    dinnerTime: String,
    dinnerContent: String,
    cravings: String,
    cravingTime: String,
    gainweight: String,
    isApproved: { type: Boolean, default: false },
    date: new Date().toISOString().split(0, 10)
});

// If 'Nutrition' model already exists, remove it
if (mongoose.models.Nutrition) {
    delete mongoose.connection.models.Nutrition;
}

const nutritionModel = mongoose.model('Nutrition', nutritionSchema);

module.exports = nutritionModel;
