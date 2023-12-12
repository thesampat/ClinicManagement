const calculateGain = (dataValue, i, itype) => {
  let total = itype == 'expense' ? Number(dataValue) - Number(i) : Number(dataValue) + Number(i);
  return total;
};

const calculateTotals = (values, setTotal, itype, totals) => {
  if (itype === 'expense') {
    const sum = values.reduce((acc, item) => {
      const expense = parseFloat(item.expense) || 0;
      acc -= expense;
      return acc;
    }, 0);

    setTotal((prev) => ({
      ...prev,
      totalExpenses: Math.abs(sum),
      totalMonthlyExpenses: Number(totals?.totalMonthlyExpenses - totals?.totalExpenses || 0) - Number(sum),
      totalYearlyExpenses: Number(totals?.totalYearlyExpenses || 0) - Number(sum),
    }));
  } else {
    const sum = values.reduce((acc, item) => {
      const income = parseFloat(item.income) || 0;
      acc += income;
      return acc;
    }, 0);

    setTotal((prev) => ({
      ...prev,
      totalIncome: sum,
      totalMonthlyIncome: Number(totals?.totalMonthlyIncome - totals?.totalIncome || 0) + Number(sum),
      totalYearlyIncome: Number(totals?.totalYearlyIncome - totals?.totalIncome || 0) + Number(sum),
    }));
  }
};

export default calculateTotals;
