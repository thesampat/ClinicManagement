import React, { useEffect, useRef, useState } from 'react';
import { deleteDoctor, getAllDoctor, getSingleDoctor } from '../../Redux/AdminReducer/action';
import { useDispatch, useSelector } from 'react-redux';
import CustomBreadcrumbs from '../../Components/CommonComponents/CustomBreadcrumbs';
import 'react-toastify/dist/ReactToastify.css';
import CustomSpinner from '../../Components/CommonComponents/CustomSpinner';
import CustomInput from '../../Components/CommonComponents/CustomInput';
import PaginationButtons from '../../Components/CommonComponents/PaginationButtons';
import CustomSelect from '../../Components/CommonComponents/CustomSelect';
import DeleteConfirmatationModal from '../../Components/CommonComponents/DeleteConfirmatationModal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function DoctorsList() {
  // Redux selectors to access state
  const { getAllDoctorProcessing, getAllDoctorSuccess, getAllDoctorData, deleteDoctorProcessing, deleteDoctorSuccess, deleteDoctorMessage, deleteDoctorFail } = useSelector((state) => state.AdminReducer);
  const dispatch = useDispatch();
  const [query, setQuery] = useState({ search: '', page: 1, limit: 10 });
  const debounceTimer = useRef(null);
  const navigate = useNavigate();

  // Function to fetch data when the query changes
  const fetchData = () => {
    dispatch(getAllDoctor(query));
  };

  // useEffect to fetch the list of doctors when the component mounts
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
    if (!deleteDoctorProcessing && deleteDoctorSuccess) {
      toast.success(deleteDoctorMessage, { position: toast.POSITION.TOP_RIGHT });
      fetchData();
    } else if (!deleteDoctorProcessing && deleteDoctorFail) {
      toast.error(deleteDoctorMessage, { position: toast.POSITION.TOP_RIGHT });
    }
  }, [deleteDoctorSuccess, deleteDoctorFail, deleteDoctorProcessing]);

  // Function to format and display abbreviated days of a doctor
  const doctorAvailableDays = (doctor) => {
    if (!doctor.doctorAvailableDays) {
      return 'NA';
    }

    const days = Object.keys(doctor.doctorAvailableDays).filter((day) => doctor.doctorAvailableDays[day]);

    if (days.length === 0) {
      return 'NA';
    }

    const abbreviatedDays = days.map((day) => {
      const abbreviated = day.slice(0, 3).toLowerCase(); // Get the first three characters in lowercase
      return abbreviated.charAt(0).toUpperCase() + abbreviated.slice(1); // Capitalize the first character
    });

    return abbreviatedDays.join(', ');
  };

  // Function to convert months of experience to years and months format
  function convertMonthsToYearsAndMonths(months) {
    if (months === null || months === undefined) {
      return 'NA';
    }

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    // if remaining months is 0
    if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    }

    // less then one year
    if (years === 0) {
      return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }

    // return experience
    return `${years} year${years !== 1 ? 's' : ''} - ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  }

  return (
    <div className="px-8 pt-24 min-h-[100vh] h-fit py-8">
      <div className="flex justify-between flex-wrap items-center ">
        {/* Breadcrumbs */}
        <CustomBreadcrumbs data={[{ title: 'Dashboard', url: '/dashboard' }, { title: 'Doctor' }, { title: 'View All Doctor' }]} />

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
            placeholder={"Search Doctor's."}
          />
        </div>
      </div>

      {/* Conditional rendering based on loading, success, or failure */}
      {getAllDoctorProcessing ? <CustomSpinner /> : ''}

      {/* // Display the table when data is loaded successfully */}
      {!getAllDoctorProcessing && getAllDoctorSuccess && getAllDoctorData.length > 0 ? (
        <div className="flex justify-center flex-col  ">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
              <thead>
                <tr className="text-left text-xs bg-primary-400 font-medium text-primary-50 uppercase tracking-wider">
                  <th className="px-4 py-3 border border-gray-300">Name</th>
                  <th className="px-4 py-3 border border-gray-300">Email</th>
                  <th className="px-4 py-3 border border-gray-300">Phone</th>
                  <th className="px-4 py-3 border border-gray-300">Fees</th>
                  <th className="px-4 py-3 border border-gray-300">Education</th>
                  <th className="px-4 py-3 border border-gray-300">Experience</th>
                  <th className="px-4 py-3 border border-gray-300">Types of Doctor</th>
                  <th className="px-4 py-3 border border-gray-300">Available Days</th>
                  <th className="px-4 py-3 border border-gray-300"> More Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getAllDoctorData.map((item, index) => (
                  <tr key={item._id}>
                    <td className="px-4 py-3 border border-gray-300 whitespace-nowrap">{item.name || 'NA'}</td>
                    <td className="px-4 py-3 border border-gray-300 whitespace-nowrap">{item.email || 'NA'}</td>
                    <td className="px-4 py-3 border border-gray-300 whitespace-nowrap">{item.phone || 'NA'}</td>
                    <td className="px-4 py-3 border border-gray-300 whitespace-nowrap">{item.fees || 'NA'}</td>
                    <td className="px-4 py-3 border border-gray-300 whitespace-nowrap">{item.education || 'NA'}</td>
                    <td className="px-4 py-3 border border-gray-300 whitespace-nowrap">{convertMonthsToYearsAndMonths(item.experience) || 'NA'}</td>
                    <td className="px-4 py-3 border border-gray-300 whitespace-nowrap">{item.typesOfDoctor || 'NA'}</td>
                    <td className="px-4 py-3 border border-gray-300 whitespace-nowrap">{doctorAvailableDays(item)}</td>
                    <td className="px-4 py-3 border border-gray-300 whitespace-nowrap">
                      <span
                        onClick={() => {
                          navigate(`/doctors/${item?._id}`);
                        }}
                        className="bg-gray-100 cursor-pointer text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-gray-500"
                      >
                        Modify
                      </span>
                      <DeleteConfirmatationModal
                        isSuccess={deleteDoctorSuccess}
                        isProcessing={deleteDoctorProcessing}
                        deleteFunction={() => {
                          dispatch(deleteDoctor(item._id));
                        }}
                        text={item.name}
                        heading={'Delete Dcotor'}
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
              isNextDisabled={getAllDoctorData.length < query.limit}
            />
          </div>
        </div>
      ) : (
        //  no data found text
        !getAllDoctorProcessing && <div className="text-center text-gray-500 mt-4">No data found.</div>
      )}

      <ToastContainer />
    </div>
  );
}
