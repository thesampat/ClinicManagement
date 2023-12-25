import React, { useState, useEffect } from 'react';
import CustomInput from '../../Components/CommonComponents/CustomInput';
import CustomSelect from '../../Components/CommonComponents/CustomSelect';
import CustomTextarea from '../../Components/CommonComponents/CustomTextarea';
import statesData from '../../Files/states.json';
import { RefrenceList, educationLevels, indianStatesAndUTs, statusOptions } from '../../Files/dropdownOptions';
import CustomButton from '../../Components/CommonComponents/CustomButton';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { UploadFiles, getJwtToken } from '../../Redux/AdminReducer/action';
import { useNavigate, useParams } from 'react-router-dom';
import { UploadFile, END_POINT, RemoveFile, UploadImages, DeleteImages } from '../../Redux/AdminReducer/action';
import CustomSpinner from '../../Components/CommonComponents/CustomSpinner';
import { FileUploadModal, ImageShowModal, ImageUploadModal, MultipleFileUploads } from '../../Components/CommonComponents/DoctorUploadModals';
import ModalCustom from '../../Components/CommonComponents/ModalCustomPopup';
import CustomImageInput from '../../Components/CommonComponents/CustomImageInput';
import axios from 'axios';

const handleSubmit = async (data, navigate, setIsPorcessing) => {
  try {
    const response = await axios.post(`${END_POINT}/feedback`, data);
    let { data: id } = response?.data;
    console.log(response);
    if (response.status === 201) {
      console.log(response, 'if');
      setIsPorcessing(false);
      // navigate(`/web/feedback/${id}`);
      toast.success('Form Created Successfully');
    } else {
      // Handle error
      console.error('Error submitting form');
    }
  } catch (error) {
    console.error('Error submitting form', error);
    setIsPorcessing(false);
    toast.error(error);
  }
};

const updateItem = async (data, _id, setIsPorcessing) => {
  try {
    console.log('update', _id);
    const result = await axios.put(`${END_POINT}/feedback/${_id._id}`, data);
    toast.success('Details Updated');
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (error) {
    setIsPorcessing(false);
    toast.error('Failed To Updated');
  }
};

const PatientForm = ({ formData, formError, handleInputChange, handleButtonClick, isProcessing, setIsPorcessing }) => (
  <div className="p-20">
    <div className="bg-primary-50 pb-8 rounded-md pt-4 border-2 border-primary-400 ">
      <div className="pb-8 rounded-md pt-4">
        <div className="px-6 py-6 rounded-md">
          <div className="grid grid-cols-3 gap-x-6">
            <CustomInput onChange={handleInputChange} label="Status" placeholder="Enter Status" type="text" value={formData.Status} error={formError.Status} name="Status" />

            <CustomInput onChange={handleInputChange} label="Case No" placeholder="Enter Case No" type="text" value={formData.CaseNo} error={formError.CaseNo} name="CaseNo" />

            <CustomInput onChange={handleInputChange} label="Date  " type="date" value={formData.Date} error={formError.Date} name="Date" />
          </div>
        </div>
      </div>

      <div className="pb-8 rounded-md pt-4">
        <div className="px-6 py-6 rounded-md">
          <h2 className="text-2xl font-semibold text-primary-900 border-l-4 border-primary-400 pl-3">Patient Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <CustomInput onChange={handleInputChange} label="First Name" placeholder="Enter First Name" type="text" value={formData.FirstName} error={formError.FirstName} name="FirstName" />

            <CustomInput onChange={handleInputChange} label="Middle Name" placeholder="Enter Middle Name" type="text" value={formData.MiddleName} error={formError.MiddleName} name="MiddleName" />
            <CustomInput onChange={handleInputChange} label="Last Name" placeholder="Enter Last Name" type="text" value={formData.LastName} error={formError.LastName} name="LastName" />

            <CustomInput onChange={handleInputChange} label="Date of Birth" placeholder="Enter Date of Birth" type="date" value={formData.dateOfBirth} error={formError.dateOfBirth} name="dateOfBirth" />
            <CustomSelect onChange={handleInputChange} options={['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']} label={'Blood Group'} value={formData?.bloodGroup} error={formError?.bloodGroup} name="bloodGroup" placeholder="-- Select Blood Group --" />
            <CustomSelect onChange={handleInputChange} options={['Male', 'Female', 'Other']} label="Gender" value={formData?.gender} error={formError?.gender} name="gender" placeholder="-- Select Gender --" />
            <CustomInput onChange={handleInputChange} label="Mobil Number" placeholder="09999999999" type="number" value={formData?.mobile} error={formError?.mobile} name="mobile" />

            <CustomSelect onChange={handleInputChange} options={['Single', 'Married', 'Divorced', 'Widow']} label="Marital Status" value={formData?.maritalStatus} error={formError?.maritalStatus} name="maritalStatus" placeholder="-- Select Marital Status --" />

            <CustomSelect onChange={handleInputChange} options={['English', 'Spanish', 'French', 'German', 'Hindi', 'Chinese', 'Other']} label="Mother Tongue" value={formData?.motherTongue} error={formError?.motherTongue} name="motherTongue" placeholder="-- Select Mother Tongue --" />

            <CustomSelect onChange={handleInputChange} options={indianStatesAndUTs} label="State" value={formData.state} error={formError.state} name="state" placeholder="-- Select State --" />

            <CustomSelect onChange={handleInputChange} options={['High School', 'Associate Degree', "Bachelor's Degree", "Master's Degree", 'Doctorate', 'Other']} label="Education" value={formData?.education} error={formError?.education} name="education" placeholder="-- Select Education Level --" />

            <CustomInput label="Address" value={formData?.address} onChange={handleInputChange} name="address" placeholder="Enter your address" error={formError?.address} />

            <CustomInput label="Profession" value={formData?.profession} onChange={handleInputChange} name="profession" placeholder="Enter your profession" error={formError?.profession} />

            <CustomInput label="Industry" value={formData?.industry} onChange={handleInputChange} name="industry" placeholder="Enter your industry" error={formError?.industry} />
            <CustomInput label="Email ID" value={formData?.email} onChange={handleInputChange} name="email" placeholder="Enter your email address" error={formError?.email} />
          </div>
        </div>
      </div>
      <div className="pb-8 rounded-md pt-4">
        <div className="px-6 py-6 rounded-md ">
          <h2 className="text-2xl font-semibold text-primary-400  border-l-4 border-primary-400 pl-3 mb-2">Present set of Complaints</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            <CustomTextarea label="Additional Comments" value={formData?.comments} onChange={handleInputChange} name="comments" placeholder="Enter any additional comments..." error={formError?.comments} rows={3} />

            <CustomInput label="Signature" value={formData?.signature} onChange={handleInputChange} name="signature" error={formError?.signature} />
          </div>
        </div>
      </div>
      <div className="lg:w-80 mx-auto w-full px-5  ">
        <CustomButton onClick={handleSubmit} isProcessing={isProcessing} label="Submit" />
      </div>
    </div>
  </div>
);

const FeedbackForm = ({ formData, formError, handleInputChange, handleButtonClick, isProcessing }) => (
  <div className="p-20">
    <div className="bg-primary-50 pb-8 rounded-md pt-4 border-2 border-primary-400 ">
      <div className="pb-8 rounded-md pt-4">
        <div className="px-6 py-6 rounded-md ">
          <h2 className="text-2xl font-semibold text-primary-400  border-l-4 border-primary-400 pl-3 mb-2">Feedback at 1st Follow up visit </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            <CustomTextarea label="Additional Comments" value={formData?.comments1} onChange={handleInputChange} name="comments1" placeholder="Enter any additional comments..." error={formError?.comments1} rows={3} />

            <CustomInput label="Signature" value={formData?.signature1} onChange={handleInputChange} name="signature" error={formError?.signature1} />
          </div>
        </div>
      </div>
      <div className="pb-8 rounded-md pt-4">
        <div className="px-6 py-6 rounded-md ">
          <h2 className="text-2xl font-semibold text-primary-400  border-l-4 border-primary-400 pl-3 mb-2">Feedback at 2th Follow up visit </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            <CustomTextarea label="Additional Comments" value={formData?.comments2} onChange={handleInputChange} name="comments2" placeholder="Enter any additional comments..." error={formError?.comments2} rows={5} />

            <CustomInput label="Signature" value={formData?.signature2} onChange={handleInputChange} name="signature2" error={formError?.signature2} />
          </div>
        </div>
      </div>
      <div className="pb-8 rounded-md pt-4">
        <div className="px-6 py-6 rounded-md ">
          <h2 className="text-2xl font-semibold text-primary-400  border-l-4 border-primary-400 pl-3 mb-2">Feedback at 3rd Follow up visit </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            <CustomTextarea label="Additional Comments" value={formData?.comments3} onChange={handleInputChange} name="comments3" placeholder="Enter any additional comments..." error={formError?.comments3} rows={5} />

            <CustomInput label="Signature3" value={formData?.signature3} onChange={handleInputChange} name="signature3" error={formError?.signature3} />
          </div>
        </div>
      </div>
      <div className="pb-8 rounded-md pt-4">
        <div className="px-6 py-6 rounded-md ">
          <h2 className="text-2xl font-semibold text-primary-400  border-l-4 border-primary-400 pl-3 mb-2">Feedback at 4th Follow up visit </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            <CustomTextarea label="Additional Comments" value={formData?.comments4} onChange={handleInputChange} name="comments4" placeholder="Enter any additional comments..." error={formError?.comments4} rows={5} />

            <CustomInput label="Signature" value={formData?.signature4} onChange={handleInputChange} name="signature4" error={formError?.signature4} />
          </div>
        </div>
      </div>
      {/*  */}
      <CustomButton onClick={handleButtonClick} isProcessing={true} label={'Save'} />
    </div>
  </div>
);

const initialFormData = {
  FirstName: '',
  MiddleName: '',
  LastName: '',
  dateOfBirth: '',
  bloodGroup: '',
  gender: '',
  mobile: '',
  maritalStatus: '',
  motherTongue: '',
  state: '',
  education: '',
  address: '',
  profession: '',
  industry: '',
  email: '',
  comments: '',
  signature: '',
  Status: '',
  CaseNo: '',
  Date: '',
};

const initialFormError = { ...initialFormData };

export const FeedBack = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const [currentForm, setCurrentForm] = useState('initial'); // 'patient' or 'feedback'
  const [selectedPatient, setSelectedPatient] = useState('');
  const [patientList, setPatientList] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');

  useEffect(() => {
    // Fetch the list of patients when the component mounts
    // Adjust the API endpoint accordingly
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`${END_POINT}/feedback`);
        setPatientList(response.data);
      } catch (error) {
        console.error('Error fetching patients', error);
      }
    };

    fetchPatients();
  }, []); // Run this effect only once when the component mounts

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleButtonClick = async () => {
    try {
      setIsProcessing(true);

      if (currentForm === 'initial') {
        // Switch to the patient form
        setCurrentForm('patient');
      } else if (currentForm === 'patient') {
        setCurrentForm('feedback');
      } else if (currentForm === 'feedback') {
        if (selectedPatientId) {
          await updateItem({ ...formData }, { _id: selectedPatientId }, setIsProcessing);
        } else {
          await handleSubmit(formData, navigate, setIsProcessing);
          setCurrentForm('initial');
        }
      }
    } catch (error) {
      setIsProcessing(false);
      toast.error(error.message || 'Error processing form');
    }
  };

  //   const handleButtonClick = async () => {
  //     try {
  //       setIsProcessing(true);
  //       if (currentForm === 'initial') {
  //         // Switch to the patient form
  //         setCurrentForm('patient');
  //       } else if (currentForm === 'patient') {
  //         // Submit the patient form and switch to the feedback form
  //         // Logic to submit the patient form...
  //         setCurrentForm('feedback');
  //       } else if (currentForm === 'feedback') {
  //         // Submit the feedback form and switch back to the initial form
  //         // Logic to submit the feedback form...
  //         // setCurrentForm('initial');
  // const handleButtonClick = async () => {
  //     try {
  //         setIsProcessing(true);
  //         await handleSubmit(formData, navigate, setIsProcessing);

  //         // Switch to the feedback form after successfully submitting the patient form
  //         setCurrentForm('feedback');
  //     } catch (error) {
  //         // Handle error if needed
  //         console.error('Error submitting form', error);
  //         setIsProcessing(false);
  //         toast.error(error.message || 'Error submitting form');
  //     }
  // };          }
  //     } catch (error) {
  //       // Handle error if needed
  //       console.error('Error processing form', error);
  //       setIsProcessing(false);
  //       toast.error(error.message || 'Error processing form');
  //     }
  //   };

  const handleSelectPatient = (selectedPatientId) => {
    const selectedPatient = patientList.find((patient) => patient._id === selectedPatientId);

    if (selectedPatient) {
      setFormData({
        ...initialFormData,
        ...selectedPatient,
      });
      setSelectedPatientId(selectedPatientId); // Add this line to set the selectedPatientId
      setCurrentForm('feedback'); // Switch to the feedback form
    } else {
      toast.error('Selected patient not found');
    }
  };

  return (
    <>
      <div className="flex justify-between p-4">
        <div>
          <CustomSelect onChange={(e) => handleSelectPatient(e.target.value)} options={patientList.map((patient) => `${patient.FirstName} ${patient.MiddleName} ${patient.LastName}`)} label="Patient" placeholder="-- Select Patient Education --" type="text" value={selectedPatient ? selectedPatient._id : ''} error={formError.education} name="selectPatient" />
        </div>
        <div>
          <CustomButton onClick={handleButtonClick} isProcessing={isProcessing} label={currentForm === 'initial' ? 'Add New' : 'Back to Patients'} />
        </div>
      </div>

      {/* {currentForm === 'initial'} */}
      {currentForm === 'patient' && <PatientForm formData={formData} formError={formError} handleInputChange={handleInputChange} handleButtonClick={handleButtonClick} isProcessing={isProcessing} setIsPorcessing={setIsProcessing} />}
      {currentForm === 'feedback' && <FeedbackForm formData={formData} formError={formError} handleInputChange={handleInputChange} handleButtonClick={handleButtonClick} isProcessing={isProcessing} setIsPorcessing={setIsProcessing} />}
    </>
  );
};
