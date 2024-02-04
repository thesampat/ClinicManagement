const express = require('express');
const { IncomeAndExpensesModel, IncomeAndExpensesShortcutsModel } = require('../Models/IncomeAndExpensesModel');
const { restart } = require('nodemon');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let { day, month, year } = req.query;
        day = parseInt(day);
        month = parseInt(month);
        year = parseInt(year);

        let sendData

        const monthDocument = await IncomeAndExpensesModel.aggregate([
            { $match: { year } },
            { $unwind: '$months' },
            { $match: { 'months.month': month } },
            {
                $project: {
                    _id: 1,
                    year: 1,
                    month: '$months.month',
                    totalMonthlyIncome: '$months.totalMonthlyIncome',
                    totalMonthlyExpenses: '$months.totalMonthlyExpenses',
                    totalMonthGain: '$months.totalMonthGain',
                    totalYearlyIncome: 1,
                    totalYearlyExpenses: 1,
                    totalYearGain: 1,
                    totalIncome: { $literal: 0 },
                    totalExpenses: { $literal: 0 },
                    dailyData: []
                }
            }
        ]);


        const dayDocument = await IncomeAndExpensesModel.aggregate([
            { $match: { year } },
            { $unwind: '$months' },
            { $match: { 'months.month': month } },
            { $unwind: '$months.days' },
            { $match: { 'months.days.day': day } },
            {
                $project: {
                    _id: 1,
                    year: 1,
                    month: '$months.month',
                    totalMonthlyIncome: '$months.totalMonthlyIncome',
                    totalMonthlyExpenses: '$months.totalMonthlyExpenses',
                    totalMonthGain: '$months.totalMonthGain',
                    totalYearlyIncome: 1,
                    totalYearlyExpenses: 1,
                    totalYearGain: 1,
                    totalIncome: '$months.days.totalIncome',
                    totalExpenses: '$months.days.totalExpenses',
                    dailyData: ['$months.days.data']
                }
            }
        ]);


        let final = dayDocument?.length <= 0 ? monthDocument : dayDocument
        return res.status(200).send(final);
    } catch (error) {


        console.error(error);
        return res.status(500).send({ error: 'Internal server error' });
    }
});


router.get('/specialQuery', async (req, res) => {
    try {
        let { day, month, year, type } = req.query;
        day = parseInt(day);
        month = parseInt(month);
        year = parseInt(year);

        let pipeline = [
            {
                $match: {
                    "year": year  // Replace with the desired year
                }
            },
            {
                $unwind: "$months"
            }
        ];


        // Conditionally add $match stage for the month
        if (type === 'month') {
            pipeline.push({
                $match: {
                    'months.month': month
                }
            });
        }


        let documents = await IncomeAndExpensesModel.aggregate(pipeline);

        let result = {}

        for (const yearData of documents) {
            for (const day of yearData.months.days) {
                for (const item of day.data) {
                    const subHeading = item.subHeading;
                    const income = item.income.reduce((total, incomeItem) => total + incomeItem.amount, 0);
                    const expense = item.expenditure.reduce((total, expenseItem) => total + expenseItem.amount, 0);
                    const gain = income - expense;

                    if (!result[subHeading]) {
                        result[subHeading] = { income: 0, expense: 0, gain: 0 };
                    }

                    result[subHeading].income += income;
                    result[subHeading].expense += expense;
                    result[subHeading].gain += gain;
                }
            }
        }

        // Convert the result object to an array of objects
        const resultArray = Object.keys(result).map(subHeading => ({
            subheading: subHeading,
            income: result[subHeading].income,
            expense: result[subHeading].expense,
            gain: result[subHeading].gain
        }));

        return res.status(200).send(resultArray)

    } catch (error) {


        console.error(error);
        return res.status(500).send({ error: 'Internal server error' });
    }
});



router.post('/', async (req, res) => {
    let { Transactions, totals, day, year, month } = req.body;
    day = parseInt(day)
    month = parseInt(month)
    year = parseInt(year)

    const IncomeAndExpensesData = await IncomeAndExpensesModel.findOne({ year: year })

    let SubHeadingData = Object.keys(Transactions?.data)?.map(e => {
        let incomeArray = Transactions?.data?.[e]?.filter(e => e?.income !== '')?.map(o => ({ item: o?.description, amount: o?.income, isIncome: true, isExpenditure: false, gain: o?.gain }))
        let expenditureArray = Transactions?.data?.[e]?.filter(e => e?.expense !== '')?.map(o => ({ item: o?.description, amount: o?.expense, isIncome: false, isExpenditure: true, gain: o?.gain }))

        return ({ 'subHeading': e, 'income': incomeArray, 'expenditure': expenditureArray })

    })

    if (IncomeAndExpensesData == null) {
        //create new year
        let create_entry
        try {
            create_entry = await IncomeAndExpensesModel.create({
                year,
                months: [
                    {
                        month: month,
                        days: [{
                            day: day, data: SubHeadingData, totalIncome: totals?.totalIncome, totalExpenses: totals?.totalExpenses, totalGain: totals?.totalGain
                        }],
                        totalMonthlyIncome: totals?.totalMonthlyIncome,
                        totalMonthlyExpenses: totals?.totalMonthlyExpenses,
                        totalYearlyExpenses: totals?.totalMonthlyExpenses,
                        totalMonthGain: totals?.totalMonthGain,
                    }
                ],
                totalYearlyIncome: totals?.totalYearlyIncome,
                totalYearlyExpenses: totals?.totalYearlyExpenses,
                totalYearGain: totals?.totalYearGain
            })

            return res.status(200).send("created")
        } catch (error) {


            console.log(error)
            return res.status(200).send("filed to create data")
        }
    }
    else {
        //find the month
        const monthDataQuery = IncomeAndExpensesModel.find({
            'year': year, 'months': { $elemMatch: { 'month': month } }
        });

        let monthData = await monthDataQuery

        if (monthData?.length >= 1) {
            //find for the day
            const dayData = await IncomeAndExpensesModel.find({
                'year': year, 'months': { $elemMatch: { 'month': month, 'days': { $elemMatch: { 'day': day } } } }
            });

            if (dayData?.length >= 1) {
                try {
                    dayUpdateEntry = await IncomeAndExpensesModel.updateOne(
                        {
                            'year': year,
                            'months': {
                                $elemMatch: {
                                    'month': month,
                                    'days.day': day // Match the specific day within the 'days' array
                                }
                            }
                        },
                        {
                            $set: {
                                'totalYearlyIncome': totals?.totalYearlyIncome,
                                'totalYearlyExpenses': totals?.totalYearlyExpenses,
                                'totalYearGain': totals?.totalYearGain,
                                'months.$.totalMonthlyIncome': totals?.totalMonthlyIncome,
                                'months.$.totalMonthlyExpenses': totals?.totalMonthlyExpenses,
                                'months.$.totalMonthGain': totals?.totalMonthGain,
                                'months.$.days.$[dayElem]': { // Use arrayFilters to update a specific element in the 'days' array
                                    day: day,
                                    data: SubHeadingData,
                                    totalIncome: totals?.totalIncome,
                                    totalExpenses: totals?.totalExpenses,
                                    totalGain: totals?.totalGain
                                }
                            }
                        },
                        {
                            arrayFilters: [{ 'dayElem.day': day }] // Update only the array element with the specified day
                        }
                    );

                    return res.status(200).send("day updated");
                } catch (error) {


                    return res.status(400).send(error)
                }

            }
            else {
                let dayPushRepsone
                try {
                    dayPushRepsone = await IncomeAndExpensesModel.updateOne({
                        'year': year, 'months': { $elemMatch: { 'month': month } }
                    },
                        {
                            totalYearlyIncome: totals?.totalYearlyIncome,
                            totalYearlyExpenses: totals?.totalYearlyExpenses,
                            totalYearGain: totals?.totalYearGain,
                            'months.$.totalMonthlyIncome': totals?.totalMonthlyIncome,
                            'months.$.totalMonthlyExpenses': totals?.totalMonthlyExpenses,
                            'months.$.totalMonthGain': totals?.totalMonthGain,
                            $push: {
                                'months.$.days': {
                                    day,
                                    data: SubHeadingData,
                                    totalIncome: totals?.totalIncome,
                                    totalExpenses: totals?.totalExpenses,
                                    totalGain: totals?.totalGain
                                }
                            }
                        })

                    res.status(200).send('Day Pushed')
                } catch (error) {


                    console.log(error)
                    res.status(400).send(error)
                }
            }
        }
        else {
            let monthPushResponse
            try {
                monthPushResponse = await IncomeAndExpensesModel.updateOne(
                    { year },
                    {
                        totalYearlyIncome: totals?.totalYearlyIncome,
                        totalYearlyExpenses: totals?.totalYearlyExpenses,
                        totalYearGain: totals?.totalYearGain,
                        $push: {
                            months: {
                                month,
                                days: [{
                                    day: day, data: SubHeadingData, totalIncome: totals?.totalIncome, totalExpenses: totals?.totalExpenses, totalGain: totals?.totalGain
                                }],
                                totalMonthlyIncome: totals?.totalMonthlyIncome,
                                totalMonthlyExpenses: totals?.totalMonthlyExpenses,
                                totalMonthGain: totals?.totalMonthGain,
                            }
                        }
                    }
                )

                res.status(400).send('Month Pushed')
            } catch (error) {


                console.log(error)
                res.status(400).send(error)
            }
        }

    }
});



router.get('/shortcuts', async (req, res) => {
    try {
        const { year } = req.query;

        // Find document for the specified year, month, and day
        const documents = await IncomeAndExpensesShortcutsModel.find({ 'year': parseInt(year) });

        return res.status(200).send(documents);
    } catch (error) {


        console.error(error);
        return res.status(500).send({ error: 'Internal server error' });
    }
});





router.post('/shortCuts', async (req, res) => {
    let { data, year } = req.body;
    year = parseInt(year)

    const IncomeAndExpensesData = await IncomeAndExpensesShortcutsModel.findOne({ year })

    if (IncomeAndExpensesData == null) {
        let create_entry
        try {
            create_entry = await IncomeAndExpensesShortcutsModel.create({
                year, data
            })
            return res.status(200).send("created")
        } catch (error) {


            console.log(error)
            return res.status(200).send("filed to create data")
        }

    }
    else {
        let update_entry
        try {
            update_entry = await IncomeAndExpensesShortcutsModel.findOneAndUpdate({ year: year }, { 'data': data }, { new: true })
            return res.status(200).send("updated")
        } catch (error) {


            console.log(error)
            return res.status(200).send("filed to update data")
        }
    }
});





module.exports = router;
