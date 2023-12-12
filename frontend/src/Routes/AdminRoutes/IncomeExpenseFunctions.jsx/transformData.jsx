function transformData(originalData) {
  const newData = {};

  console.log(originalData, '--------------');

  originalData.map((item, index) => {
    const newSub = item?.subTitle;

    newData[newSub] = item.Transactions.map((transaction) => ({
      description: transaction.description,
      income: transaction.income || '',
      expense: transaction.expense || '',
      gain: transaction.income ? parseInt(transaction.income) : -parseInt(transaction.expense),
    }));
  });

  return newData;
}

function convertedReadData(inputData) {
  return inputData?.dailyData?.map((subArray) => {
    return subArray?.map((item) => {
      const transactions = [];

      if (item?.income?.length > 0) {
        item?.income?.map((i) => {
          transactions.push({
            description: i.item,
            income: i.amount.toString(),
            expense: '',
            gain: i.gain.toString(),
          });
        });
      }

      if (item?.expenditure?.length > 0) {
        item?.expenditure?.map((i) => {
          transactions.push({
            description: i.item,
            income: '',
            expense: i.amount.toString(),
            gain: i.gain.toString(),
          });
        });
      }

      // if (item.expenditure.length > 0) {
      //   transactions.push({
      //     description: item.expenditure[0].item,
      //     income: '',
      //     expense: item.expenditure[0].amount.toString(),
      //     gain: item.expenditure[0].gain.toString(),
      //   });
      // }

      return {
        subTitle: item.subHeading,
        Transactions: transactions,
      };
    });
  });
}

export { transformData, convertedReadData };
