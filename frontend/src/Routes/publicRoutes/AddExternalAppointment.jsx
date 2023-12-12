import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewAppointment, getAllDoctor, getAllPatient, getAllAppointment_External, getAllDoctor_External } from '../../Redux/AdminReducer/action';
import CustomSpinner from '../../Components/CommonComponents/CustomSpinner';
import SelectInput from '../../Components/CommonComponents/SelectInput ';
import CustomInput from '../../Components/CommonComponents/CustomInput';
import CustomButton from '../../Components/CommonComponents/CustomButton';
import CustomBreadcrumbs from '../../Components/CommonComponents/CustomBreadcrumbs';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CalenderAndTimeSlot from '../../Components/CommonComponents/CustomAppointmentDateCalender';

const initialState = {
  doctor: { name: '', id: '' },
  patient: '',
  bookTimeSlot: '',
};

export default function AddExternalAppointment() {
  const { addAppointmentMessage, addAppointmentFail, addAppointmentSuccess, addAppointmentProcessing, getAllPatientData, getAllPatientSuccess, getAllPatientProcessing, getAllDoctorProcessing, getAllAppointmentData, getAllDoctorData, getAllDoctorSuccess } = useSelector((state) => state.AdminReducer);
  const [query, setQuery] = useState({ search: '', page: 1, limit: 100 });
  const [formData, setFormData] = useState(initialState);
  const [formError, setFormError] = useState(initialState);

  const dispatch = useDispatch();

  // get Data
  useEffect(() => {
    // Get all doctor list
    dispatch(getAllDoctor_External(query));
  }, []);

  useEffect(() => {
    formData?.doctor?.name && dispatch(getAllAppointment_External({ search: formData?.doctor?.id, page: 1, limit: 100 }));
  }, [formData?.doctorName]);

  // handel input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Reset availableSlot when a doctor is selected
  useEffect(() => {
    setFormData({ ...formData, availableSlot: '' });
  }, [formData.doctorName]);

  // display toast messages

  useEffect(() => {
    if (addAppointmentSuccess && !addAppointmentProcessing) {
      toast.success(addAppointmentMessage, { position: toast.POSITION.TOP_RIGHT });

      //  reset states
      window.location.reload();
      // setFormData(initialState);
      // setFormError(initialState);
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
    if (!formData?.doctor?.name) {
      updatedFormError.doctor = 'Doctor Name is required!';
      isValidInput = false;
    }

    //  validate patient name
    if (!formData?.patient?.name) {
      updatedFormError.patient.name = 'Patient Name is required!';
      isValidInput = false;
    }

    // Validate date
    if (!formData?.patient?.phone) {
      updatedFormError.patient.phone = 'Contact is required!';
      isValidInput = false;
    }

    //  validate doctor name
    if (!formData?.bookTimeSlot) {
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
      <div className=" h-fit min-h-[100vh] w-full bg-white p-2 sm:p-6 md:p-12 lg:px-32 lg:pt-10">
        {getAllDoctorSuccess == false ? (
          <CustomSpinner />
        ) : (
          <>
            <div className="pb-8 rounded-md pt-4 md:pt-2 lg:pt-4 border-2 border-primary-400 ">
              {/* Personal Information */}
              <div className="px-3 md:px-4 lg:px-6 py-6 rounded-md ">
                <h2 className="text-2xl font-semibold text-primary-900 border-l-4 border-primary-400 pl-3 ">Add Appointment </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 ">
                  {/* select doctor container */}
                  <SelectInput
                    options={getAllDoctorData?.map((doctor) => ({
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
                    name={'doctorName'}
                    error={formError.doctor?.name}
                  />
                  <CustomInput
                    label="Patient Name"
                    placeholder="Enter Patient Name"
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, patient: { name: e.target.value } }));
                    }}
                    value={formData?.patient?.name}
                    type="text"
                    name="patientName"
                    error={formError?.patient?.name}
                  />
                  <CustomInput
                    label="Patient Contact"
                    placeholder="Enter Contact Number"
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, patient: { ...prev.patient, phone: e.target.value } }));
                    }}
                    value={formData?.patient.phone}
                    type="text"
                    name="phoneNumber"
                    error={formError?.patient?.phone}
                  />
                </div>

                <CalenderAndTimeSlot selectedDoctor={getAllDoctorData?.filter((doctor) => doctor._id == formData?.doctor?.id)} formData={formData} setFormData={setFormData} getAllAppointmentData={getAllAppointmentData} />
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
