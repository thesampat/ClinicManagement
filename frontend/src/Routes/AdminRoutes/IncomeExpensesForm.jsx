import React, { useEffect, useRef, useState } from 'react';
import CustomSelect from '../../Components/CommonComponents/CustomSelect';
import calculateTotals from './IncomeExpenseFunctions.jsx/totalCalculate';
import { getJwtToken } from '../../Redux/AdminReducer/action';
import { END_POINT } from '../../Redux/AdminReducer/action';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { convertedReadData, transformData } from './IncomeExpenseFunctions.jsx/transformData';

const subtitleFormat = [
  {
    subTitle: '',
    Transactions: [{ description: '', income: '', expense: '', gain: '' }],
  },
];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const getCalendarDatesFormatted = (year, month) => {
  const startDate = new Date(year, month - 1, 1);
  return Array.from({ length: new Date(year, month, 0).getDate() }, (_, i) => ('0' + (i + 1)).slice(-2));
};

const createItem = async (data, setIsPorcessing) => {
  try {
    const result = await axios.post(`${END_POINT}/incomeExpense/`, data, {
      headers: {
        Authorization: getJwtToken(),
      },
    });
    setIsPorcessing(false);
    toast.success('Saved Successfully');
  } catch (error) {
    setIsPorcessing(false);
    toast.error(error);
  }
};

const fetchSingleItem = async (day, month, year) => {
  try {
    const result = await axios.get(`${END_POINT}/incomeExpense?day=${day}&&month=${month}&&year=${year}`, {
      headers: {
        Authorization: getJwtToken(),
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    toast.error('Something went wrong while fetching data');
  }
};

const fetchUniques = async (day, month, year, type) => {
  try {
    const result = await axios.get(`${END_POINT}/incomeExpense/specialQuery?day=${day}&&month=${month}&&year=${year}&&type=${type}`, {
      headers: {
        Authorization: getJwtToken(),
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    toast.error('Something went wrong while fetching data');
  }
};

const IncomeExpense = () => {
  return (
    <div className="m-3 rounded-md  bg-gray-100 h-[100vh]  w-full">
      <YourComponent />
    </div>
  );
};

const YourComponent = () => {
  const [isProcessing, setIsPorcessing] = useState(false);
  const dateString = new Date().toISOString().slice(0, 10).split('-');
  let totalConst = { totalIncome: 0, totalExpenses: 0, totalMonthlyIncome: 0, totalMonthlyExpenses: 0, totalYearlyIncome: 0, totalYearlyExpenses: 0 };
  const [total, setTotal] = useState(totalConst);
  const totalRef = useRef();
  const [formData, setFormData] = useState([]);
  const formRef = useRef();
  const [year, setYear] = useState(dateString?.[0]);
  const [month, setMonth] = useState(dateString?.[1]);
  const [date, setDate] = useState(dateString?.[2]);
  const [descriptionRecords, setDescriptionsRecords] = useState([]);
  const [viewType, setViewType] = useState('regular');

  useEffect(() => {
    setFormData();
    setTotal(totalConst);
    totalRef.current = totalConst;
    setDescriptionsRecords([]);

    fetchSingleItem(date, month, year).then((res) => {
      if (res?.data?.length > 0) {
        let readTransactionsData = convertedReadData(res.data?.[0]);
        const { _id, dailyData, ...totals } = res?.data?.[0];
        setTotal(totals);
        setFormData(readTransactionsData?.[0]);
        totalRef.current = totals;

        if (readTransactionsData?.length <= 0) {
          setFormData(subtitleFormat);
        }

        readTransactionsData?.[0]?.map((f, index) => {
          f?.Transactions?.map((i) => {
            setDescriptionsRecords((prev) => [...prev, { ...i, subTitle: f?.subTitle, subTitelIndex: index }]);
          });
        });
      } else {
        setFormData(subtitleFormat);
      }
    });
  }, [year, month, date]);

  const handleCtrlS = (event) => {
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault(); // Prevent the default browser save dialog

      if (formData?.length > 0) {
        let formDataUseRef = {
          Transactions: { data: transformData(formData) },
          totals: { ...total, totalGain: total?.totalIncome - total?.totalExpenses, totalMonthGain: total?.totalMonthlyIncome - total?.totalMonthlyExpenses, totalYearGain: total?.totalYearlyIncome - total?.totalYearlyExpenses },
          day: date,
          year: year,
          month: month,
        };

        createItem(formDataUseRef, setIsPorcessing);
      } else if (formData?.length <= 0) {
        toast.error('No changes to save', { position: toast.POSITION.TOP_RIGHT });
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleCtrlS);
    return () => {
      document.removeEventListener('keydown', handleCtrlS);
    };
  }, [date, year, month, total, formData]);

  return (
    <div className="border inexmain h-full p-2">
      <div className="a1 border w-full">
        <div className="mainTitleInEx w-full flex justify-between items-center">
          <h3 className="text-2xl font-bold ps-5">
            Income & Expenditure - {date}/{month}/{year}
          </h3>
          <div className="grid grid-cols-1">
            <CustomSelect options={['2023', '2022', '2021']} style={{ height: '10px', width: '150px' }} value={year} onChange={(e) => setYear(e.target.value)} name={'Year'} />
          </div>
        </div>
      </div>
      <div className="a2 h-full w-full flex gap-2 p-4">
        <div className="b1 w-[10vw] border">
          <div className="scrollViewMonth flex flex-col gap-2 border border h-full">
            <div className="border border bg-slate-300 text-center">
              <button className="p-1 bg-blue-400 text-black uppercase font-semibold text-sm w-full" onClick={(e) => setViewType('year')}>
                2023
              </button>
            </div>
            {monthNames?.map((e, i) => (
              <div className="border border h-10 bg-slate-300 text-center rounded-lg mx-2 align-middle flex items-center justify-center" key={i}>
                <button
                  onClick={() => {
                    setMonth(i + 1);
                    setViewType('regular');
                  }}
                  className="monthName font-semibold"
                >
                  {e}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="b2 w-full h-full flex flex-col border gap-3">
          <div className="b2Wrap1 flex ">
            <div className="c1">
              <div className="scrollViewDay flex flex-col gap-2 border h-[80vh] overflow-y-scroll">
                <div className="border border-gray-300 bg-slate-300 text-center sticky top-0 w-full">
                  <button className="p-1 bg-blue-400 text-black uppercase font-semibold text-sm" onClick={(e) => setViewType('month')}>
                    Month
                  </button>
                </div>
                {getCalendarDatesFormatted(year, month)?.map((e, i) => (
                  <div className="border border-gray-300 h-10 bg-slate-300 text-center rounded-lg mx-2 align-middle flex items-center justify-center" key={i}>
                    <button
                      onClick={() => {
                        setDate(e);
                        setViewType('regular');
                      }}
                      className="dayName font-semibold"
                    >
                      {e}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="c2 flex flex-col w-full">
              <div className="d1 h-full">
                <IncomeExpenseTable viewType={viewType} disabled={false} formData={formData} setFormData={setFormData} year={year} month={month} date={date} setTotal={setTotal} formRef={formRef} totals={totalRef.current} descriptionRecords={descriptionRecords} setDescriptionsRecords={setDescriptionsRecords} />
                {/* <ExpenseTracker /> */}
              </div>
              <div className="d2 grid grid-cols-4 gap-3 px-2">
                <h2 className="w-full font-bold text-lg text-center border rounded-lg bg-green-300 text-blue-800">{viewType === 'regular' && 'Day'}</h2>
                <h2 className="w-full font-bold text-lg text-center border rounded-lg bg-green-300 text-blue-800">{viewType == 'regular' ? total?.totalIncome : viewType == 'month' ? total?.totalMonthlyIncome : total?.totalYearlyIncome}</h2>
                <h2 className="w-full font-bold text-lg text-center border rounded-lg bg-green-300 text-blue-800">{viewType == 'regular' ? total?.totalExpenses : viewType == 'month' ? total?.totalMonthlyExpenses : total?.totalYearlyExpenses}</h2>
                <h2 className="w-full font-bold text-lg text-center border rounded-lg bg-green-300 text-blue-800">{viewType == 'regular' ? total?.totalIncome - total?.totalExpenses : viewType == 'month' ? total?.totalMonthlyIncome - total?.totalMonthlyExpenses : total?.totalYearlyIncome - total?.totalYearlyExpenses}</h2>
              </div>
            </div>
          </div>
          {!(viewType == 'month' || viewType == 'year') && (
            <div className="b2Wrap2 d2 grid grid-cols-4 gap-3 px-2">
              <h2 className="w-full font-bold text-lg text-center border rounded-lg bg-cyan-300 text-blue-800">{viewType === 'regular' && 'Month'}</h2>
              <h2 className="w-full font-bold text-lg text-center border rounded-lg bg-cyan-300 text-blue-800">{total?.totalMonthlyIncome}</h2>
              <h2 className="w-full font-bold text-lg text-center border rounded-lg bg-cyan-300 text-blue-800">{total?.totalMonthlyExpenses}</h2>
              <h2 className="w-full font-bold text-lg text-center border rounded-lg bg-cyan-300 text-blue-800">{total?.totalMonthlyIncome - total?.totalMonthlyExpenses}</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function IncomeExpenseTable({ disabled, setFormData, formData, handleTableChange, year, month, date, setTotal, formRef, totals, descriptionRecords, setDescriptionsRecords, viewType }) {
  const inputRefs = useRef([]);
  const [rowletter, setRowletter] = useState({});
  const [idescription, setidescription] = useState({ description: '' });
  useEffect(() => {
    if (descriptionRecords?.length > 0) {
      descriptionRecords?.map((i, index) => {
        setRowletter((prev) => ({ ...prev, [`${i.description}_${i?.subTitelIndex}`]: index }));
      });
    }
  }, [descriptionRecords]);

  const addRow = (e, newIndex, subIndex, descp) => {
    const emptyDescriptionCount = formData?.[0]?.Transactions?.filter((e) => e.subTitle).reduce((count, item) => (item.description.trim() === '' ? count + 1 : count), 0);

    const updatedData = [...formData?.[subIndex]?.Transactions, { description: '', income: '', expense: '', gain: '' }];
    setFormData((formData) => {
      if (subIndex >= 0 && subIndex < formData.length) {
        const newData = [...formData];
        newData[subIndex].Transactions = updatedData;
        return newData;
      }
      return formData;
    });
    formRef.current = updatedData;
    setTimeout(() => {
      focusOnInput(newIndex, subIndex);
    }, 0);
    e.preventDefault(); // Prevents the default behavior of the Tab key
  };

  const removeRow = (e, index, subIndex, description, ntype) => {
    let removedSubTitel = descriptionRecords?.filter((d) => d.description !== description);
    setDescriptionsRecords(removedSubTitel);

    if (formData?.[subIndex]?.Transactions?.length <= 1) {
      return false;
    }
    setFormData((prevFormData) => {
      const updatedData = [...prevFormData];
      updatedData[subIndex].Transactions = updatedData[subIndex].Transactions.filter((_, i) => i !== index);
      return updatedData;
    });
    // console.log(removedSubTitel);
    calculateTotals(removedSubTitel, setTotal, ntype, totals);
  };

  const removeSubtitle = (subIndex) => {
    let subtitleGroup = descriptionRecords?.map((k) => k.subTitle);

    console.log(subIndex);
    if ([...new Set(subtitleGroup || [])]?.length <= 1) {
      return false;
    }

    const removediSubtitles = descriptionRecords.filter((record, index) => record?.subTitelIndex !== subIndex);
    setDescriptionsRecords(removediSubtitles);

    setFormData((prevFormData) => {
      const updatedData = [...prevFormData];
      updatedData.splice(subIndex, 1);
      return updatedData;
    });

    calculateTotals(removediSubtitles, setTotal, 'expense', totals);
    calculateTotals(removediSubtitles, setTotal, 'income', totals);
  };

  const handleInputChange = (e, index, key, subIndex, rowIndex) => {
    const { name, value } = e.target;

    console.log(e, 'what is e now');

    if (name == 'description') {
      if (rowletter[`${value}_${subIndex}`] !== undefined) {
        if (rowletter[`${value}_${subIndex}`] !== rowIndex) {
          return false;
        }
      }
    }
    setRowletter((prev) => ({ ...prev, [`${value}_${subIndex}`]: rowIndex }));

    setFormData((prevData) => {
      const existingIndex = prevData?.[subIndex]?.Transactions.findIndex((item) => item?.description === index);
      let updatedValues;

      if (existingIndex !== -1) {
        // Description already exists, update the existing entry
        const gainValue = name === 'expense' ? -parseFloat(value) : parseFloat(value);
        updatedValues = prevData?.[subIndex]?.Transactions.map((item, i) => (i === existingIndex ? { ...item, [name]: value, gain: gainValue || 0, subTitle: prevData?.[subIndex]?.subTitle } : { ...item }));

        formRef.current = updatedValues;

        let HiN = [
          ...prevData?.flatMap((e) =>
            e.Transactions.filter((t) => t.description !== index && e.subTitle !== key).map((transaction) => {
              return { ...transaction, subTitle: e?.subTitle };
            }),
          ),
          { ...updatedValues?.[existingIndex] },
        ];

        const newDescriptions = HiN.filter((item, i, arr) => arr.findIndex((t) => (t.description === item.description) & (t.subTitle == t.subTitle)) === i);

        setDescriptionsRecords(newDescriptions);

        console.log(newDescriptions, 'what is happenings');

        ['income', 'expense']?.includes(name) && calculateTotals(HiN, setTotal, name, totals);
      } else {
        // Description does not exist, add a new entry
        updatedValues = [...prevData?.[subIndex]?.Transactions, { description: index, income: '', expense: '', gain: '', subTitle: prevData?.[subIndex]?.subTitle }];
        formRef.current = updatedValues;
      }

      // Update the state
      return prevData.map((item, i) => {
        if (i === subIndex) {
          return { ...item, Transactions: updatedValues };
        }
        return item;
      });
    });
  };

  const focusOnInput = (subIndex, index) => {
    const refKey = `${subIndex}_${index}`;
    if (inputRefs.current?.[refKey]) {
      inputRefs.current[refKey].focus();
    }
  };

  const handleTitleChange = (e, subIndex) => {
    const { value } = e.target;

    setFormData((formData) => {
      if (subIndex >= 0 && subIndex < formData.length) {
        return formData.map((item, index) => {
          if (index === subIndex) {
            return { ...item, subTitle: value };
          }
          return item;
        });
      }
      return formData;
    });
  };

  return (
    <div>
      {viewType == 'regular' && (
        <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
          <thead>
            <tr className="text-center text-xs bg-primary-400 font-medium text-primary-50 uppercase tracking-wider">
              <th className="px-4 py-2 border border-gray-300">Description</th>
              <th className="px-4 py-2 border border-gray-300">Income</th>
              <th className="px-4 py-2 border border-gray-300">Expense</th>
              <th className="px-4 py-2 border border-gray-300">Gain</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 border-separate border-spacing-y-3">
            {formData?.map((e, subIndex) => (
              <React.Fragment key={subIndex}>
                <tr className="mb-4">
                  <th colSpan="4" className="text-center">
                    <input
                      disabled={disabled}
                      type="text"
                      className="p-2 w-full border border-gray-300 rounded"
                      value={e?.subTitle}
                      id={subIndex}
                      onChange={(e) => {
                        handleTitleChange(e, subIndex);
                      }}
                      onKeyDown={(n) => {
                        if (n.key === 'Delete') {
                          removeSubtitle(subIndex);
                        }
                      }}
                    />
                  </th>
                </tr>
                {e?.Transactions?.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="text-center">
                      <input
                        disabled={disabled}
                        type="text"
                        className="p-2 w-full border border-gray-300 rounded"
                        name={`description`}
                        value={row?.description !== '' ? row?.description : idescription?.description}
                        onChange={(e) => setidescription({ description: e.target.value })}
                        onKeyDown={(e) => {
                          if (e.key == 'Tab') {
                            setidescription({ description: '' });
                            handleInputChange({ target: { name: 'description', value: idescription?.description } }, row?.description, 'description', subIndex, index);
                          }
                          if (e.key === 'Delete') {
                            removeRow(e, index, subIndex, e?.subTitle, row?.description, row?.income == '' ? 'expense' : 'income');
                            e.preventDefault();
                          }
                        }}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        disabled={row.expense !== '' ? true : false}
                        type="text"
                        className="p-2 w-full border border-gray-300 rounded"
                        name={`income`}
                        value={row?.income}
                        onChange={(e) => {
                          handleInputChange(e, row?.description, 'income', subIndex, index);
                        }}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        disabled={row.income !== '' ? true : false}
                        type="text"
                        className="p-2 w-full border border-gray-300 rounded"
                        name={`expense`}
                        value={row?.expense}
                        onChange={(i) => {
                          handleInputChange(i, row?.description, 'expense', subIndex, index);
                        }}
                      />
                    </td>
                    <td className={`text-center ${row?.gain >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      <input
                        onKeyDown={(n) => {
                          if (n.key === 'Tab') {
                            addRow(n, index, subIndex, row?.description);
                          }
                        }}
                        ref={(input) => (inputRefs.current[`${subIndex}_${index}`] = input)}
                        disabled={disabled}
                        type="text"
                        className="p-2 w-full border border-gray-300 rounded"
                        name={`gain`}
                        value={row?.gain}
                        onChange={(e) => handleInputChange(e, row?.description, 'gain', subIndex, index)}
                      />
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
            <tr>
              <td colSpan={4} className="text-center text-xl font-bold">
                <button
                  onClick={(e) => {
                    setFormData((ed) => [...ed, subtitleFormat?.[0]]);
                  }}
                  className="bg-gray-300 w-full"
                >
                  +
                </button>
              </td>
            </tr>
          </tbody>
          <ToastContainer />
        </table>
      )}
      {['month', 'year'].includes(viewType) && <MonthYearViewTable year={year} month={month} date={date} viewType={viewType} />}
    </div>
  );
}

const MonthYearViewTable = ({ year, month, date, viewType }) => {
  const [data, setdata] = useState(null);

  useEffect(() => {
    fetchUniques(date, month, year, viewType).then((e) => {
      setdata(e?.data);
    });
  }, [viewType]);

  return (
    <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
      <thead>
        <tr className="text-center text-xs bg-primary-400 font-medium text-primary-50 uppercase tracking-wider">
          <th className="px-4 py-2 border border-gray-300">Description</th>
          <th className="px-4 py-2 border border-gray-300">Income</th>
          <th className="px-4 py-2 border border-gray-300">Expense</th>
          <th className="px-4 py-2 border border-gray-300">Gain</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 border-separate border-spacing-y-3">
        {data?.map((e, index) => (
          <tr>
            <td className="text-center">{e?.subheading}</td>
            <td className="text-center">{e?.income}</td>
            <td className="text-center">{e?.expense}</td>
            <td className="text-center">{e?.gain}</td>
          </tr>
        ))}
      </tbody>
      <ToastContainer />
    </table>
  );
};

export default IncomeExpense;
