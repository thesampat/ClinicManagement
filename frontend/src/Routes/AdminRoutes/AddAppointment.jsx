import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewAppointment, getAllDoctor, getAllPatient, getAllAppointment, getSingleDoctor } from '../../Redux/AdminReducer/action';
import CustomSpinner from '../../Components/CommonComponents/CustomSpinner';
import SelectInput from '../../Components/CommonComponents/SelectInput ';
import CustomInput from '../../Components/CommonComponents/CustomInput';
import CustomButton from '../../Components/CommonComponents/CustomButton';
import CustomBreadcrumbs from '../../Components/CommonComponents/CustomBreadcrumbs';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CalenderAndTimeSlot from '../../Components/CommonComponents/CustomAppointmentDateCalender';

// const ToolTip = () => (
//   <p>
//     Hover the link to see the
//     <a href="#" class="transititext-primary text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600" data-te-toggle="tooltip" title="Hi! I'm tooltip">
//       tooltip
//     </a>
//   </p>
// );

const initialState = {
  doctor: '',
  patient: '',
  bookTimeSlot: '',
};

export default function AddAppointment() {
  const { addAppointmentMessage, addAppointmentFail, addAppointmentSuccess, addAppointmentProcessing, getAllPatientData, getAllPatientSuccess, getAllDoctorData, getAllPatientProcessing, getAllDoctorProcessing, getAllAppointmentData } = useSelector((state) => state.AdminReducer);
  const [query, setQuery] = useState({ search: '', page: 1, pageSize: 200 });
  const [formData, setFormData] = useState(initialState);
  const [formError, setFormError] = useState(initialState);

  const dispatch = useDispatch();

  // get Data
  useEffect(() => {
    // Get all doctor list
    dispatch(getAllDoctor(query));
    // Get all patient list
    dispatch(getAllPatient(query));
  }, []);

  useEffect(() => {
    formData?.doctor && dispatch(getAllAppointment({ search: formData?.doctor?.id, page: 1, limit: 100 }));
  }, [formData?.doctor?.id]);

  // handel input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Reset availableSlot when a doctor is selected
  useEffect(() => {
    setFormData({ ...formData, availableSlot: '' });
  }, [formData.doctor?.id]);

  // display toast messages

  useEffect(() => {
    if (addAppointmentSuccess && !addAppointmentProcessing) {
      toast.success(addAppointmentMessage, { position: toast.POSITION.TOP_RIGHT });

      //  reset states
      setFormData(initialState);
      setFormError(initialState);
    }
    if (addAppointmentFail && !addAppointmentProcessing) {
      toast.error(addAppointmentMessage, { position: toast.POSITION.TOP_RIGHT });
    }
  }, [addAppointmentProcessing]);

  // handel button Click
  const handelButtonClick = () => {
    let isValidInput = true;
    let updatedFormError = { formError };

    //  validate doctor name
    if (!formData.doctor?.id) {
      updatedFormError.doctor = 'Doctor Name is required!';
      isValidInput = false;
    }

    //  validate patient name
    if (!formData.patient?.id) {
      updatedFormError.patient = 'Patient Name is required!';
      isValidInput = false;
    }

    // Validate date
    if (!formData.bookDate) {
      updatedFormError.bookDate = 'Date is required!';
      isValidInput = false;
    }

    //  validate doctor name
    if (!formData.bookTimeSlot._id) {
      updatedFormError.bookTimeSlot = 'time Slot is required!';
      isValidInput = false;
    }

    // Update the formError state
    setFormError(updatedFormError);
    // dispatch if no error found in form
    if (isValidInput) {
      dispatch(addNewAppointment(formData));
    }
  };

  useEffect(() => {
    if (getAllDoctorData?.length > 0) {
      let selectedDoctor = getAllDoctorData;
      const { _id, name } = selectedDoctor?.[0];
      setFormData((prev) => ({ ...prev, doctor: { id: _id, name: name } }));
    }
  }, [getAllDoctorData]);

  return (
    <>
      <div className="h-fit min-h-[100vh] lg:px-24 w-full p-10 bg-white">
        {/* bread crumbs */}
        <CustomBreadcrumbs data={[{ title: 'Dashboard', url: '/dashboard' }, { title: 'Add Appointment' }]} />

        {getAllPatientProcessing || getAllDoctorProcessing || !getAllPatientSuccess ? (
          <CustomSpinner />
        ) : (
          <>
            <div className="bg-white pb-8 rounded-md pt-4 border-2 border-primary-400 ">
              {/* Personal Information */}
              <div className="px-6 py-6 rounded-md ">
                <h2 className="text-2xl font-semibold text-primary-900 border-l-4 border-primary-400 pl-3 ">Add Appointment </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 ">
                  <SelectInput
                    options={getAllDoctorData.map((doctor) => ({
                      value: doctor._id,
                      label: doctor.name,
                    }))}
                    value={formData?.doctor?.id}
                    onChange={(e) => {
                      let selectedDoctor = getAllDoctorData?.filter((i) => i?._id == e.target.value)?.[0];
                      const { _id, name } = selectedDoctor;
                      setFormData((prev) => ({ ...prev, doctor: { id: _id, name: name } }));
                    }}
                    placeholder="Select Doctor"
                    label={'Select Doctor'}
                    name={'doctor'}
                    error={formError.doctor}
                  />

                  {/* select patient container */}
                  <SelectInput
                    options={getAllPatientData.map((patient) => ({
                      value: patient._id,
                      label: patient.firstName + ' ' + patient.surname,
                    }))}
                    value={formData.patient?.id}
                    onChange={(e) => {
                      let selectedPatient = getAllPatientData?.filter((i) => i?._id == e.target.value)?.[0];
                      const { _id, firstName, mobile, surname = '' } = selectedPatient;
                      setFormData((prev) => ({ ...prev, patient: { id: _id, name: firstName, phone: mobile, surname: surname } }));
                    }}
                    placeholder="Select Patient"
                    label={'Select Patient'}
                    name={'patient'}
                    error={formError.patient}
                  />
                </div>

                <CalenderAndTimeSlot selectedDoctor={getAllDoctorData.filter((doctor) => doctor._id == formData?.doctor?.id)} formData={formData} setFormData={setFormData} getAllAppointmentData={getAllAppointmentData} />
              </div>

              {/* handel add appointment  */}
              <div className="lg:w-80 mx-auto w-full px-5  ">
                <CustomButton isProcessing={addAppointmentProcessing} onClick={handelButtonClick} label="Add Appointment" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* toast message  */}
      <ToastContainer />
    </>
  );
}
