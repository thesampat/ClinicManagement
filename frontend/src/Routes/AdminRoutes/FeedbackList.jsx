import React, { useEffect, useRef, useState } from 'react';
import { deleteReceptionist, getAllReceptionist, getSingleReceptionist } from '../../Redux/AdminReducer/action';
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

export default function ReceptionistList() {
  // Redux selectors to access state
  const { getAllReceptionistProcessing, getAllReceptionistSuccess, getAllReceptionistData, deleteReceptionistProcessing, deleteReceptionistSuccess, deleteReceptionistMessage, deleteReceptionistFail } = useSelector((state) => state.AdminReducer);
  const dispatch = useDispatch();
  const [query, setQuery] = useState({ search: '', page: 1, limit: 10 });
  const debounceTimer = useRef(null);
  const navigate = useNavigate();

  // Function to fetch data when the query changes
  const fetchData = () => {
    dispatch(getAllReceptionist(query));
  };

  // useEffect to fetch the list of recepnist when the component mounts
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
    if (!deleteReceptionistProcessing && deleteReceptionistSuccess) {
      toast.success(deleteReceptionistMessage, { position: toast.POSITION.TOP_RIGHT });
      fetchData();
    } else if (!deleteReceptionistProcessing && deleteReceptionistFail) {
      toast.error(deleteReceptionistMessage, { position: toast.POSITION.TOP_RIGHT });
    }
  }, [deleteReceptionistSuccess, deleteReceptionistFail, deleteReceptionistProcessing]);

  return (
    <div className="px-8 pt-24 min-h-[100vh] h-fit py-8">
      <div className="flex justify-between flex-wrap items-center ">
        {/* Breadcrumbs */}
        <CustomBreadcrumbs data={[{ title: 'Dashboard', url: '/dashboard' }, { title: 'Receptionist' }, { title: 'View All Receptionist' }]} />

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
            placeholder={'Search Receptionist.'}
          />
        </div>
      </div>

      {/* Conditional rendering based on loading, success, or failure */}
      {getAllReceptionistProcessing ? <CustomSpinner /> : ''}

      {/* // Display the table when data is loaded successfully */}
      {!getAllReceptionistProcessing && getAllReceptionistSuccess && getAllReceptionistData.length > 0 ? (
        <div className="flex justify-center flex-col  ">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
              <thead>
                <tr className="text-left text-xs bg-primary-400 font-medium text-primary-50 uppercase tracking-wider">
                  <th className="px-4 py-3 border border-gray-300">Name</th>
                  <th className="px-4 py-3 border border-gray-300">Email</th>
                  <th className="px-4 py-3 border border-gray-300">Phone</th>
                  <th className="px-4 py-3 border border-gray-300"> More Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getAllReceptionistData.map((item, index) => (
                  <tr key={item._id}>
                    <td className="px-4 py-3 border border-gray-300 whitespace-nowrap">{item.name || 'NA'}</td>
                    <td className="px-4 py-3 border border-gray-300 whitespace-nowrap">{item.email || 'NA'}</td>
                    <td className="px-4 py-3 border border-gray-300 whitespace-nowrap">{item.phone || 'NA'}</td>
                    <td className="px-4 py-3 border border-gray-300 whitespace-nowrap">
                      <span
                        onClick={() => {
                          dispatch(getSingleReceptionist(item));
                          navigate('/receptionist/update');
                        }}
                        className="bg-gray-100 cursor-pointer text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-gray-500"
                      >
                        Modify
                      </span>
                      <DeleteConfirmatationModal
                        isSuccess={deleteReceptionistSuccess}
                        isProcessing={deleteReceptionistProcessing}
                        deleteFunction={() => {
                          dispatch(deleteReceptionist(item._id));
                        }}
                        text={item.name}
                        heading={'Delete Receptionist'}
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
              isNextDisabled={getAllReceptionistData.length < query.limit}
            />
          </div>
        </div>
      ) : (
        //  no data found text
        getAllReceptionistSuccess && <div className="text-center text-gray-500 mt-4">No data found.</div>
      )}

      <ToastContainer />
    </div>
  );
}
