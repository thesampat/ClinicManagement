const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    item: String,
    amount: Number,
    isIncome: { type: Boolean, default: false },
    isExpenditure: { type: Boolean, default: false },
    gain: ''
});

const dataSchema = new mongoose.Schema({
    subHeading: { type: String },
    income: [transactionSchema],
    expenditure: [transactionSchema]
});

const daySchema = new mongoose.Schema({
    day: Number,
    data: [dataSchema],
    totalIncome: Number,
    totalExpenses: Number,
    totalGain: Number,
});

const monthSchema = new mongoose.Schema({
    month: Number,
    days: [daySchema],
    totalMonthlyIncome: Number,
    totalMonthlyExpenses: Number,
    totalMonthGain: Number,
});

const incomeAndExpensesSchema = new mongoose.Schema({
    year: Number,
    months: [monthSchema],
    totalYearlyIncome: Number,
    totalYearlyExpenses: Number,
    totalYearGain: Number,
});


const subHeadingShortcuts = new mongoose.Schema({
    'title': String,
    'items': [String]
})


const IncomeAndExpensesShortCutsSchema = new mongoose.Schema({
    'year': '',
    'data': [subHeadingShortcuts]
})

const IncomeAndExpensesModel = mongoose.model('IncomeAndExpenses', incomeAndExpensesSchema);
const IncomeAndExpensesShortcutsModel = mongoose.model('IncomeAndExpensesShortCuts', IncomeAndExpensesShortCutsSchema);


module.exports = { IncomeAndExpensesModel, IncomeAndExpensesShortcutsModel };
