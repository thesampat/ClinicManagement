import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePatient, getAllPatient, getSinglePatient } from '../../Redux/AdminReducer/action';
import { useNavigate } from 'react-router-dom';
import CustomBreadcrumbs from '../../Components/CommonComponents/CustomBreadcrumbs';
import CustomInput from '../../Components/CommonComponents/CustomInput';
import DeleteConfirmatationModal from '../../Components/CommonComponents/DeleteConfirmatationModal';
import CustomSelect from '../../Components/CommonComponents/CustomSelect';
import PaginationButtons from '../../Components/CommonComponents/PaginationButtons';
import CustomSpinner from '../../Components/CommonComponents/CustomSpinner';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PatientsList() {
  // Redux selectors to access state
  const { getAllPatientProcessing, getAllPatientSuccess, getAllPatientFail, getAllPatientMessage, getAllPatientData, deletePatientMessage, deletePatientFail, deletePatientSuccess, deletePatientProcessing } = useSelector((state) => state.AdminReducer);
  const dispatch = useDispatch();
  const [query, setQuery] = useState({ search: '', page: 1, limit: 10 });
  const debounceTimer = useRef(null);
  const navigate = useNavigate();

  // Function to fetch data when the query changes
  const fetchData = () => {
    dispatch(getAllPatient(query));
  };

  // useEffect to fetch the list of Patients when the component mounts
  useEffect(() => {
    // Clear the previous timer when query changes
    clearTimeout(debounceTimer.current);

    // Set a new timer to execute fetchDataWithDebounce after a delay
    debounceTimer.current = setTimeout(fetchData, 500);

    // Cleanup the timer on component unmount
    return () => clearTimeout(debounceTimer.current);
  }, [query]);

  // delete toast messaeg and fecth latest data
  useEffect(() => {
    // fetch data if delete success
    if (!deletePatientProcessing && deletePatientSuccess) {
      toast.success(deletePatientMessage, { position: toast.POSITION.TOP_RIGHT });
      fetchData();
    } else if (!deletePatientProcessing && deletePatientFail) {
      toast.error(deletePatientMessage, { position: toast.POSITION.TOP_RIGHT });
    }
  }, [deletePatientSuccess, deletePatientFail, deletePatientProcessing]);

  getAllPatientData && getAllPatientData?.sort((a, b) => a.Date - b.Date);

  return (
    <div className="px-8 pt-24 min-h-[100vh] h-fit py-8">
      <div className="flex justify-between flex-wrap items-center ">
        {/* Breadcrumbs */}
        <CustomBreadcrumbs data={[{ title: 'Dashboard', url: '/dashboard' }, { title: 'Patient' }, { title: 'View All Patient' }]} />

        {/* search input box */}
        <div className=" -mt-5 mb-2">
          <CustomInput
            label={''}
            name="search"
            type={'text'}
            value={query.search}
            onChange={(e) => {
              setQuery({ ...query, search: e.target.value, page: 1 });
            }}
            placeholder={"Search Patient's."}
          />
        </div>
      </div>

      {/* Conditional rendering based on loading, success, or failure */}
      {getAllPatientProcessing ? <CustomSpinner /> : ''}

      {/* // Display the table when data is loaded successfully */}
      {!getAllPatientProcessing && getAllPatientSuccess && getAllPatientData.length > 0 ? (
        <div className="flex justify-center flex-col  ">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
              <thead>
                <tr className="text-left text-xs bg-primary-400 font-medium text-primary-50 uppercase tracking-wider">
                  <th className="px-4 py-3 border border-gray-300">Name</th>
                  <th className="px-4 py-3 border border-gray-300">Email</th>
                  <th className="px-4 py-3 border border-gray-300">Phone</th>
                  <th className="px-4 py-3 border border-gray-300">Marital Status</th>
                  <th className="px-4 py-3 border border-gray-300">Education</th>
                  <th className="px-4 py-3 border border-gray-300">Profession</th>
                  <th className="px-4 py-3 border border-gray-300">Gender</th>
                  <th className="px-4 py-3 border border-gray-300">Blood Group</th>
                  <th className="px-4 py-3 border border-gray-300">Mother Tongue</th>
                  <th className="px-4 py-3 border border-gray-300">Age</th>
                  <th className="px-4 py-3 border border-gray-300">Type</th>
                  <th className="px-4 py-3 border border-gray-300">Payment</th>
                  <th className="px-4 py-3 border border-gray-300">Patient Status</th>
                  <th className="px-4 py-3 border border-gray-300">Patient Reference</th>
                  <th className="px-4 py-3 border border-gray-300">Reference</th>
                  <th className="px-4 py-3 border border-gray-300">Location</th>
                  <th className="px-4 py-3 border border-gray-300">State</th>
                  <th className="px-4 py-3 border border-gray-300">More Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getAllPatientData.map((item, index) => (
                  <tr key={item._id}>
                    <td className="px-4 py-3 border border-gray-300 whitespace-nowrap">{item.firstName + ' ' + item.surname || 'NA'}</td>
                    <td className="px-4 py-3 border border-gray-300 whitespace-nowrap">{item.email || 'NA'}</td>
                    <td className="px-4 py-3 border border-gray-300 whitespace-nowrap">{item.mobile || 'NA'}</td>
                    <td className="px-4 py-3 border border-gray-300 whitespace-nowrap">{item.maritalStatus || 'NA'}</td>
                    <td className="px-4 py-3 border border-gray-300 whitespace-nowrap">{item.education || 'NA'}</td>
                    <td className="px-4 py-3 border border-gray-300 whitespace-nowrap">{item.profession || 'NA'}</td>
                    <td className="px-4 py-3 border border-gray-300 whitespace-nowrap">{item.gender || 'NA'}</td>
                    <td className="px-4 py-3 border border-gray-300 whitespace-nowrap">{item.bloodGroup || 'NA'}</td>
                    <td className="px-4 py-3 border border-gray-300 whitespace-nowrap">{item.motherTongue || 'NA'}</td>
                    <td className="px-4 py-3 border border-gray-300 whitespace-nowrap">{item.year || 'NA'}</td>
                    <td className="px-4 py-3 border border-gray-300 whitespace-nowrap">{item.type || 'NA'}</td>
                    <td className="px-4 py-3 border border-gray-300 whitespace-nowrap">{item.payment || 'NA'}</td>
                    <td className="px-4 py-3 border border-gray-300 whitespace-nowrap">{item.patientStatus || 'NA'}</td>
                    <td className="px-4 py-3 border border-gray-300 whitespace-nowrap">{item.patientReference || 'NA'}</td>
                    <td className="px-4 py-3 border border-gray-300 whitespace-nowrap">{item.reference || 'NA'}</td>
                    <td className="px-4 py-3 border border-gray-300 whitespace-nowrap">{item.location || 'NA'}</td>
                    <td className="px-4 py-3 border border-gray-300 whitespace-nowrap">{item.state || 'NA'}</td>
                    <td className="px-4 py-3 border border-gray-300 whitespace-nowrap">
                      <span
                        onClick={() => {
                          navigate(`/patients/${item?._id}`);
                        }}
                        className="bg-gray-100 cursor-pointer text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-gray-500"
                      >
                        Modify
                      </span>
                      <DeleteConfirmatationModal
                        isSuccess={deletePatientSuccess}
                        isProcessing={deletePatientProcessing}
                        deleteFunction={() => {
                          dispatch(deletePatient(item._id));
                        }}
                        text={item.firstName + ' ' + item.surname}
                        heading={'Delete Patient'}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* limit selector and page change buttons */}
          <div className="flex justify-between ">
            <CustomSelect
              options={[10, 25, 50, 75, 100]}
              onChange={(e) => {
                setQuery({ ...query, limit: e.target.value });
              }}
              value={query.limit}
              placeholder={`limit per page.`}
            />
            {/* paginatation buttons */}
            <PaginationButtons
              onPreviousClick={() => {
                setQuery({ ...query, page: query.page - 1 });
              }}
              onNextClick={() => {
                setQuery({ ...query, page: query.page + 1 });
              }}
              isPreviousDisabled={query.page === 1}
              isNextDisabled={getAllPatientData.length < query.limit}
            />
          </div>
        </div>
      ) : (
        //  no data found text
        !getAllPatientProcessing && <div className="text-center text-gray-500 mt-4">No data found.</div>
      )}

      <ToastContainer />
    </div>
  );
}
