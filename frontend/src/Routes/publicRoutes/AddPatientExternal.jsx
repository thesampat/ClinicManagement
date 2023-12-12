import React, { useEffect, useState } from 'react';
import CustomInput from '../../Components/CommonComponents/CustomInput';
import CustomButton from '../../Components/CommonComponents/CustomButton';
import CustomBreadcrumbs from '../../Components/CommonComponents/CustomBreadcrumbs';
import CustomSelect from '../../Components/CommonComponents/CustomSelect';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addNewPatient } from '../../Redux/AdminReducer/action';
import CustomImageInput from '../../Components/CommonComponents/CustomImageInput';
import { RefrenceList, educationLevels, indianStatesAndUTs, statusOptions } from '../../Files/dropdownOptions';

const initialFormData = {
  firstName: '',
  middleName: '',
  surname: '',
  email: '',
  serialNumber: '',
  type: '',
  year: '',
  bloodGroup: '',
  gender: '',
  maritalStatus: '',
  motherTongue: '',
  education: '',
  state: '',
  payment: '',
  reference: '',
  location: '',
  patientReference: '',
  patientStatus: '',
  profession: '',
  pic: '',
  mobile: '',
  role: '',
  status: '',
  caseNo: '',
  date: '',
  dateOfBirth: '',
  anniversary: '',
  weight: '',
  height: '',
  diagnosis: {},
  package: '',
  industry: '',
  city: '',
  country: '',
  prescriptions: [],
};

// const initialFormData = {
//   firstName: '',
//   middleName: '',
//   surname: '',
//   email: '',
//   serialNumber: '',
//   bloodGroup: '',
//   gender: '',
//   maritalStatus: '',
//   motherTongue: '',
//   education: '',
//   state: '',
//   reference: '',
//   location: '',
//   pincode:'',
//   patientStatus: '',
//   profession: '',
//   pic: 'https://res.cloudinary.com/dmzzzl5jj/image/upload/v1673894892/avatar_gvyled.jpg',
//   mobile: '',
//   role: 'Customer',
//   status: '',
//   patientNo: '',
//   date: new Date().toISOString().slice(0, 10),
//   dateOfBirth: '',
//   anniversary: '',
//   weight: '',
//   height: '',
//   industry: '',
// };

export default function AddNewPatientExternal() {
  // define form state's
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormData);
  const addNewPatientMessage = useSelector((state) => state.AdminReducer.addNewPatientMessage);
  const addNewPatientFail = useSelector((state) => state.AdminReducer.addNewPatientFail);
  const addNewPatientProcessing = useSelector((state) => state.AdminReducer.addNewPatientProcessing);
  const addNewPatientSuccess = useSelector((state) => state.AdminReducer.addNewPatientSuccess);
  const dispatch = useDispatch();

  // handel input change
  const handelInputChange = (event) => {
    const { name, value } = event.target;

    // update form state
    setFormData({ ...formData, [name]: value });
  };

  // handel add new patient button click
  const handelAddNewPatientClick = () => {
    // define variables
    let isValidInput = true;
    const trimmedFormData = { ...formData };
    let updatedFormError = { formError };

    // Trim all fields
    for (const key in trimmedFormData) {
      if (trimmedFormData.hasOwnProperty(key)) {
        if (typeof trimmedFormData[key] === 'string') {
          trimmedFormData[key] = trimmedFormData[key].trim();
        }
      }
    }

    // validate phone
    if (!trimmedFormData.mobile) {
      updatedFormError.mobile = 'Phone number is required!';
      isValidInput = false;
    } else if (!/^\d{10}$/.test(trimmedFormData.mobile)) {
      updatedFormError.mobile = 'Invalid phone number, must be 10 digits!';
      isValidInput = false;
    }

    // validate  first name
    if (!trimmedFormData.firstName) {
      updatedFormError.firstName = 'First Name is required!';
      isValidInput = false;
    }

    // validate  middle name
    if (!trimmedFormData.middleName) {
      updatedFormError.middleName = 'Middle Name is required!';
      isValidInput = false;
    }

    // validate sur name
    if (!trimmedFormData.surname) {
      updatedFormError.surname = 'Surname Name is required!';
      isValidInput = false;
    }

    // Update the formError state
    setFormError(updatedFormError);

    // dispatch add new patient if no error found in form
    if (isValidInput) {
      dispatch(addNewPatient(trimmedFormData));
    }
  };

  // useEffect to display toast message
  useEffect(() => {
    // check if successfully created
    if (addNewPatientMessage && addNewPatientSuccess && !addNewPatientProcessing) {
      toast.success(addNewPatientMessage, { position: toast.POSITION.TOP_RIGHT });

      //  reset states
      setFormData(initialFormData);
      setFormError(initialFormData);
    }

    if (addNewPatientMessage && addNewPatientFail && !addNewPatientProcessing) {
      toast.error(addNewPatientMessage, { position: toast.POSITION.TOP_RIGHT });
    }
  }, [addNewPatientProcessing]);

  return (
    <div className="h-fit min-h-[100vh] w-full bg-white p-1 md:p-10 lg:p-20">
      {/*  Breadcrumbs */}
      <div className="bg-primary-50 pb-8 rounded-md pt-4 border-2 border-primary-400 ">
        {/* Personal Information */}
        <div className="px-2 sm:px-4 lg:px-6 py-2 md:py-6 rounded-md ">
          {/* heading */}
          <h2 className="text-lg md:text-1xl lg:text-2xl font-semibold text-primary-900 border-l-4 border-primary-400 pl-3 ">Personal Information</h2>

          <div className="grid grid-cols-2 gap-x-2 md:gap-x-6 ">
            <CustomInput onChange={handelInputChange} label="First Name" placeholder="Enter First Name" type="text" value={formData.firstName} error={formError.firstName} name="firstName" />
            <CustomInput onChange={handelInputChange} label="Middle Name" placeholder="Enter Middle Name" type="text" value={formData.middleName} error={formError.middleName} name="middleName" />
            <CustomInput onChange={handelInputChange} label="Last Name" placeholder="Enter Last Name" type="text" value={formData.surname} error={formError.surname} name="surname" />
            <CustomInput onChange={handelInputChange} label="Email" placeholder="example@gmail.com" type="text" value={formData.email} error={formError.email} name="email" />
            <CustomInput onChange={handelInputChange} label="Contact Number" placeholder="09999999999" type="number" value={formData.mobile} error={formError.mobile} name="mobile" />
            <CustomInput onChange={handelInputChange} label="Address" placeholder="Enter Address" type="text" value={formData.location} error={formError.location} name="location" />
            <CustomInput onChange={handelInputChange} label="Pincode" placeholder="Enter Pincode" type="number" value={formData.pincode} error={formError.pincode} name="pincode" />
            <CustomSelect onChange={handelInputChange} options={indianStatesAndUTs} label="State" value={formData.state} error={formError.state} name="state" placeholder="-- Select State --" />
            <CustomSelect onChange={handelInputChange} options={educationLevels} label="Education" placeholder="-- Select Patient Education --" type="text" value={formData.education} error={formError.education} name="education" />
            <CustomSelect onChange={handelInputChange} options={['Homemaker', 'Teacher', 'Student', 'Retired', 'IT', 'Business', 'Engineering', 'Medical', 'Grade I & II', 'Senior Management', 'Defence', 'Baby', 'Police', 'Unknown', 'Self Employed']} label="Profession" value={formData.profession} error={formError.profession} name="profession" placeholder="-- Select Profession --" />
            <CustomInput onChange={handelInputChange} label="Industry" value={formData.industry} error={formError.industry} name="industry" placeholder="Enter Industry"></CustomInput>
            <CustomSelect onChange={handelInputChange} options={RefrenceList} label="Reference" placeholder="-- Select Patient Reference --" type="text" value={formData.reference} error={formError.reference} name="reference" />
            <CustomInput onChange={handelInputChange} label="Mother Tongue" placeholder="Enter Patient Mother Tongue" type="text" value={formData.motherTongue} error={formError.motherTongue} name="motherTongue" />
            <CustomSelect onChange={handelInputChange} options={['Male', 'Female', 'Other']} label="Gender" value={formData.gender} error={formError.gender} name="gender" placeholder="-- Select Gender --" />
            <CustomInput onChange={handelInputChange} label="Date of Birth" placeholder="Enter Date of Birth" type="date" value={formData.dateOfBirth} error={formError.dateOfBirth} name="dateOfBirth" />
            <CustomSelect onChange={handelInputChange} options={['Single', 'Married', 'Divorced']} label="Marital Status" value={formData.maritalStatus} error={formError.maritalStatus} name="maritalStatus" placeholder="-- Select Marital Status --" />
            <CustomInput onChange={handelInputChange} label="Anniversary" placeholder="Enter Anniversary" type="date" value={formData.anniversary} error={formError.anniversary} name="anniversary" />
            {/* <CustomImageInput label='Profile Image' onChange={''} // Add a new handler for image change label="Profile Picture" name="profilePicture" // Add a name for the image input */}
          </div>
        </div>

        {/* Personal Information */}
        <div className="px-6 py-6 rounded-md ">
          <h2 className="text-2xl font-semibold text-primary-900 border-l-4 border-primary-400 pl-3 ">Medical Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 ">
            <CustomSelect onChange={handelInputChange} options={['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']} label={'Blood Group'} value={formData.bloodGroup} error={formError.bloodGroup} name="bloodGroup" placeholder="-- Select Blood Group --" />
            <CustomInput onChange={handelInputChange} label="Weight (in KG)" placeholder="Enter Weight" type="number" value={formData.weight} error={formError.weight} name="weight" />
            <CustomInput onChange={handelInputChange} label="Height (in Centimeters)" placeholder="Enter Height (cm)" type="number" value={formData.height} error={formError.height} name="height" />
          </div>
        </div>

        {/* add new patient button  */}
        <div className="lg:w-80 mx-auto w-full px-5  ">
          <CustomButton onClick={handelAddNewPatientClick} isProcessing={addNewPatientProcessing} label="Add New Patient" />
        </div>
      </div>

      {/* toast message  */}
      <ToastContainer />
    </div>
  );
}
