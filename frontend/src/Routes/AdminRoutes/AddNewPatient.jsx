import React, { useEffect, useState } from 'react';
import CustomInput from '../../Components/CommonComponents/CustomInput';
import CustomButton from '../../Components/CommonComponents/CustomButton';
import CustomBreadcrumbs from '../../Components/CommonComponents/CustomBreadcrumbs';
import CustomSelect from '../../Components/CommonComponents/CustomSelect';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addNewPatient, getSinglePatient, getSinglePatientFetch, updatePatient } from '../../Redux/AdminReducer/action';
import CustomImageInput from '../../Components/CommonComponents/CustomImageInput';
import { RefrenceList, educationLevels, indianStatesAndUTs, statusOptions, PatientRefrenceList } from '../../Files/dropdownOptions';
import { UploadFile, addNewPrescription, getAllPatientPrescription, END_POINT, RemoveFile, UploadImages, DeleteImages } from '../../Redux/AdminReducer/action';
import countiresData from '../../Files/countries.json';
import citiesData from '../../Files/cities.json';
import statesData from '../../Files/states.json';
import { useNavigate, useParams } from 'react-router-dom';
import diagnosis from '../../Files/diagnosis.json';
import CustomNameSuggestion from '../../Components/CommonComponents/CustomNameSuggestion';
import { FileUploadModal, ImageShowModal, ImageUploadModal } from '../../Components/CommonComponents/patientUploadModals';

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
//   pincode: '',
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

export default function AddNewPatient() {
  // define form state's
  const [formData, setFormData] = useState(null);
  const [formError, setFormError] = useState();
  const addNewPatientMessage = useSelector((state) => state.AdminReducer.addNewPatientMessage);
  const addNewPatientFail = useSelector((state) => state.AdminReducer.addNewPatientFail);
  const addNewPatientProcessing = useSelector((state) => state.AdminReducer.addNewPatientProcessing);
  const addNewPatientSuccess = useSelector((state) => state.AdminReducer.addNewPatientSuccess);
  const { singlePatientData, updatePatientMessage, updatePatientFail, updatePatientSuccess, updatePatientProcessing } = useSelector((state) => state.AdminReducer);
  const [profile_image_res, set_profile_image_res] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [filteredStates, setFilteredStates] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { patientId } = useParams();

  const countries = countiresData?.countries;
  const states = statesData?.states;
  const cities = citiesData?.cities;

  useEffect(() => {
    let filteredStates = states?.filter((st) => Number(st.country_id) === Number(selectedCountry))?.map((e) => e?.name);
    setFilteredStates(filteredStates);
    setFilteredCities(cities?.filter((city) => Number(city?.state_id) === Number(selectedState))?.map((e) => e?.name));
  }, [selectedCountry, selectedState]);

  useEffect(() => {
    if (patientId === 'addNew') {
      dispatch(getSinglePatientFetch(patientId));
      setFormData(initialFormData);
    } else {
      dispatch(getSinglePatientFetch(patientId));
    }
  }, []);

  useEffect(() => {
    if (patientId !== 'addNew') {
      setFormData(singlePatientData);
      let country_id = countries?.filter((country) => country?.name == singlePatientData?.country);
      let state_id = states?.filter((state) => state?.name == singlePatientData?.state);

      setSelectedCountry(country_id?.[0]?.id);
      setSelectedState(state_id?.[0]?.id);
    } else {
      if (singlePatientData?.length > 0) {
        console.log('yes i am more', singlePatientData);
      }
    }
  }, [singlePatientData]);

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
    console.log(updatedFormError);

    // dispatch add new patient if no error found in form
    if (isValidInput) {
      dispatch(patientId == 'addNew' ? addNewPatient(trimmedFormData) : updatePatient(trimmedFormData));
    }
  };

  // useEffect to display toast message
  useEffect(() => {
    // check if successfully created
    if (patientId == 'addNew') {
      if (addNewPatientMessage && addNewPatientSuccess && !addNewPatientProcessing) {
        toast.success(addNewPatientMessage, { position: toast.POSITION.TOP_RIGHT });

        //  reset states
        setFormData(initialFormData);
        setFormError(initialFormData);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }

      if (addNewPatientMessage && addNewPatientFail && !addNewPatientProcessing) {
        toast.error(addNewPatientMessage, { position: toast.POSITION.TOP_RIGHT });
      }
    } else {
      if (!updatePatientProcessing && updatePatientSuccess && updatePatientMessage) {
        toast.success(updatePatientMessage, { position: toast.POSITION.TOP_RIGHT });

        // redirect to list
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }

      // if update patient failed
      if (!updatePatientProcessing && updatePatientFail && updatePatientMessage) {
        toast.error(updatePatientMessage, { position: toast.POSITION.TOP_RIGHT });
      }
    }
  }, [addNewPatientProcessing, updatePatientProcessing, updatePatientFail, updatePatientSuccess]);

  const handleDiagnosis = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, diagnosis: { ...prev?.diagnosis, [name]: value } }));
  };

  const handleProfileUpload = async (e) => {
    let file = e.target.files?.[0];
    if (file) {
      let i = await dispatch(UploadImages([file], formData?._id, 'profile_image', 'customer'));
      if (i == true) {
        set_profile_image_res('Uploaded!!');
      }
    }
  };

  return (
    <div className="h-fit min-h-[100vh] lg:px-24 w-full p-10 bg-white">
      {/*  Breadcrumbs */}
      {patientId == 'addNew' ? <CustomBreadcrumbs data={[{ title: 'Dashboard', url: '/dashboard' }, { title: 'Patient' }, { title: 'Add New Patient' }]} /> : <CustomBreadcrumbs data={[{ title: 'Dashboard', url: '/dashboard' }, { title: 'Patient' }, { title: 'Patient List', url: '/table/patients/list' }, { title: 'Update Patient' }]} />}

      {formData !== null && (
        <div className="bg-white pb-8 rounded-md pt-4 border-2 border-primary-400 ">
          {/* Personal Information */}
          <div className="px-6 py-6 rounded-md ">
            {/* heading */}
            <h2 className="text-2xl font-semibold text-primary-900 border-l-4 border-primary-400 pl-3 ">Personal Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 ">
              <CustomInput onChange={handelInputChange} label="First Name" placeholder="Enter First Name" type="text" value={formData?.firstName} error={formError?.firstName} name="firstName" />
              <CustomInput onChange={handelInputChange} label="Middle Name" placeholder="Enter Middle Name" type="text" value={formData?.middleName} error={formError?.middleName} name="middleName" />
              <CustomInput onChange={handelInputChange} label="Last Name" placeholder="Enter Last Name" type="text" value={formData?.surname} error={formError?.surname} name="surname" />
              <CustomInput onChange={handelInputChange} label="Email" placeholder="example@gmail.com" type="text" value={formData?.email} error={formError?.email} name="email" />
              <CustomInput onChange={handelInputChange} label="Contact Number" placeholder="09999999999" type="number" value={formData?.mobile} error={formError?.mobile} name="mobile" />
              <CustomSelect
                onChange={(e) => {
                  handelInputChange(e);
                  let country_id = countries?.filter((country) => country?.name == e.target.value)?.[0];
                  setSelectedCountry(country_id?.id);
                }}
                options={countries?.map((e) => e?.name)}
                label="Select Country"
                value={formData?.country}
                error={formError?.country}
                name="country"
                placeholder="-- Select Country --"
              />
              <CustomSelect
                onChange={(e) => {
                  handelInputChange(e);
                  let state_id = states?.filter((state) => state?.name == e.target.value)?.[0];
                  setSelectedState(state_id?.id);
                }}
                value={formData?.state}
                error={formError?.state}
                name="state"
                placeholder="-- Select State --"
                options={filteredStates}
                label="Select State"
              />
              <CustomSelect onChange={handelInputChange} options={filteredCities} label="Select City" value={formData.city} error={formError?.city} name="city" placeholder="-- Select City --" />
              <CustomInput onChange={handelInputChange} label="Area" placeholder="Enter Area" type="text" value={formData?.area} error={formError?.area} name="area" />
              <CustomInput onChange={handelInputChange} label="Address" placeholder="Enter Address" type="text" value={formData?.location} error={formError?.location} name="location" />
              <CustomInput onChange={handelInputChange} label="Pincode" placeholder="Enter Pincode" type="number" value={formData?.pincode} error={formError?.pincode} name="pincode" />
              {/* <CustomSelect onChange={handelInputChange} options={indianStatesAndUTs} label="State" value={formData?.state} error={formError?.state} name="state" placeholder="-- Select State --" /> */}
              <CustomSelect onChange={handelInputChange} options={educationLevels} label="Education" placeholder="-- Select Patient Education --" type="text" value={formData?.education} error={formError?.education} name="education" />
              <CustomSelect onChange={handelInputChange} options={['Homemaker', 'Teacher', 'Student', 'Retired', 'IT', 'Business', 'Engineering', 'Medical', 'Grade I & II', 'Senior Management', 'Defence', 'Baby', 'Police', 'Unknown', 'Self Employed']} label="Profession" value={formData?.profession} error={formError?.profession} name="profession" placeholder="-- Select Profession --" />
              <CustomInput onChange={handelInputChange} label="Industry" value={formData?.industry} error={formError?.industry} name="industry" placeholder="Enter Industry"></CustomInput>
              <CustomSelect onChange={handelInputChange} options={RefrenceList} label="Reference" placeholder="-- Select Reference --" type="text" value={formData?.reference} error={formError?.reference} name="reference" />
              {formData?.reference == 'Patient' && <CustomSelect onChange={handelInputChange} options={PatientRefrenceList} label="Patient Refrence" placeholder="-- Select Patient Reference --" type="text" value={formData?.patientReference} error={formError?.patientReference} name="patientReference" />}
              <CustomInput onChange={handelInputChange} label="Mother Tongue" placeholder="Enter Patient Mother Tongue" type="text" value={formData?.motherTongue} error={formError?.motherTongue} name="motherTongue" />
              <CustomSelect onChange={handelInputChange} options={['Male', 'Female', 'Other']} label="Gender" value={formData?.gender} error={formError?.gender} name="gender" placeholder="-- Select Gender --" />
              <CustomInput onChange={handelInputChange} label="Date of Birth" placeholder="Enter Date of Birth" type="date" value={formData?.dateOfBirth} error={formError?.dateOfBirth} name="dateOfBirth" />
              <CustomSelect onChange={handelInputChange} options={['Single', 'Married', 'Divorced']} label="Marital Status" value={formData?.maritalStatus} error={formError?.maritalStatus} name="maritalStatus" placeholder="-- Select Marital Status --" />
              <CustomInput onChange={handelInputChange} label="Anniversary" placeholder="Enter Anniversary" type="date" value={formData?.anniversary} error={formError?.anniversary} name="anniversary" />
              <CustomImageInput label="Profile Image" onChange={handleProfileUpload} res={profile_image_res} exist_profile={formData?.profile_image?.[0]} />
            </div>
          </div>

          {formData?._id && (
            <>
              <div className="px-6 py-6 rounded-md ">
                <h2 className="text-2xl font-semibold text-primary-900 border-l-4 border-primary-400 pl-3 ">Medical Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 ">
                  <CustomSelect onChange={handelInputChange} options={['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']} label={'Blood Group'} value={formData?.bloodGroup} error={formError?.bloodGroup} name="bloodGroup" placeholder="-- Select Blood Group --" />
                  <CustomInput onChange={handelInputChange} label="Weight (in KG)" placeholder="Enter Weight" type="number" value={formData?.weight} error={formError?.weight} name="weight" />
                  <CustomInput onChange={handelInputChange} label="Height (in Centimeters)" placeholder="Enter Height (cm)" type="number" value={formData?.height} error={formError?.height} name="height" />
                  <CustomNameSuggestion onChange={handleDiagnosis} options={diagnosis?.map((d) => Object.keys(d || {})?.[0])} label={'Primary Diagnosis'} value={formData?.diagnosis?.primary} error={formError?.diagnosis?.primary} name="primary" placeholder="-- Enter Primary Diagnosis --" />
                  <CustomNameSuggestion onChange={handleDiagnosis} options={diagnosis?.map((d) => Object.keys(d || {})?.[0])} label={'Secondary Diagnosis'} value={formData?.diagnosis?.secondary} error={formError?.diagnosis?.secondary} name="secondary" placeholder="-- Enter Secondary Diagnosis --" />
                  <CustomNameSuggestion onChange={handleDiagnosis} options={diagnosis?.map((d) => Object.keys(d || {})?.[0])} label={'Tertiary Diagnosis'} value={formData?.diagnosis?.third} error={formError?.diagnosis?.secondary} name="third" placeholder="-- Enter Tertiary Diagnosis --" />
                  <CustomNameSuggestion onChange={handleDiagnosis} options={diagnosis.find((diagnosis) => formData?.diagnosis?.primary in diagnosis)?.[formData?.diagnosis?.primary] || []} label={'Primary Sub Diagnosis'} value={formData?.diagnosis?.primarySub} error={formError?.diagnosis?.primarySub} name="primarySub" placeholder="-- Enter Primary Sub Diagnosis --" />
                  <CustomNameSuggestion onChange={handleDiagnosis} options={diagnosis.find((diagnosis) => formData?.diagnosis?.secondary in diagnosis)?.[formData?.diagnosis?.secondary] || []} label={'Secondary Sub Diagnosis'} value={formData?.diagnosis?.secondarySub} error={formError?.diagnosis?.secondarySub} name="secondarySub" placeholder="-- Enter Secondary Sub Diagnosis --" />
                  <CustomNameSuggestion onChange={handleDiagnosis} options={diagnosis.find((diagnosis) => formData?.diagnosis?.third in diagnosis)?.[formData?.diagnosis?.third] || []} label={'Tertiary Sub Diagnosis'} value={formData?.diagnosis?.thirdSub} error={formError?.diagnosis?.thirdSub} name="thirdSub" placeholder="-- Enter Tertiary Sub Diagnosis --" />
                  <CustomInput onChange={handelInputChange} label="Package" placeholder="Enter Package" type="number" min={0} value={formData?.package} error={formError?.package} name="package" />
                </div>
              </div>

              <div className="px-6 py-6 rounded-md ">
                <h2 className="text-2xl font-semibold text-primary-900 border-l-4 border-primary-400 pl-3 mb-10">Reports Upload</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 ">
                  <ChildrenComponent id={formData?.Date} label="PREVIOUS REPORTS" handelInputChange={handelInputChange} formData={formData} uploadType="previousReports" SectionType="PreviousReportNotes" />
                  <ChildrenComponent id={formData?.Date} label="PREVIOUS TREATMENT" handelInputChange={handelInputChange} formData={formData} uploadType="previousTreatment" SectionType="previousTreatmentNotes" />
                  <ChildrenComponent id={formData?.Date} label="Pictures" handelInputChange={handelInputChange} formData={formData} uploadType="pictures" SectionType="previousTreatmentNotes" />
                </div>
              </div>
            </>
          )}

          {/* add new patient button  */}
          <div className="lg:w-80 mx-auto w-full px-5  ">
            <CustomButton onClick={handelAddNewPatientClick} isProcessing={addNewPatientProcessing} label={patientId == 'addNew' ? 'Submit' : 'Update'} />
          </div>
          {/* <div className="lg:w-80 mx-auto w-full px-5  ">
          <CustomButton onClick={handelUpdatePatientClick} isProcessing={updatePatientProcessing} label="Update Patient Data" />
        </div> */}
        </div>
      )}

      {/* toast message  */}
      <ToastContainer />
    </div>
  );
}

const ChildrenComponent = ({ id, label, handelInputChange, formData, uploadType, SectionType }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [showImage, setShowImages] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleImageCloseModal = () => {
    setShowImages(false);
  };

  const handleFileUpload = (file) => {
    if (file) {
      dispatch(UploadFile(file, formData?._id, uploadType, 'customer'));
      setIsModalOpen(false);
    }
  };

  const handleImageUpload = async (file) => {
    if (file) {
      setIsModalOpen(false);

      let res = await dispatch(UploadImages(file, formData?._id, uploadType, 'customer'));
      if (res === true) {
        toast.success('Images Uploaded');
      }
    }
  };

  return (
    <div className="ChildernMain flex flex-col gap-2">
      <h4 className="font-semibold">{label}</h4>
      <label className="text-xs p-0 m-0 " htmlFor="">
        {uploadType !== 'pictures' ? (formData?.[uploadType] ? '1 File' : 'No File Uploaded') : `${formData?.[uploadType]?.length} image uploded`}
      </label>
      <div className="pChilldrenControls flex gap-5">
        <button className="border p-2 py-1 rounded rounded-md bg-neutral-400" onClick={() => setIsModalOpen(uploadType)}>
          <p className="text-xs font-semibold text-white">UPLOAD</p>
        </button>
        <button className="border p-2 py-1 rounded rounded-md bg-neutral-400">
          <p
            className="text-xs font-semibold text-white"
            onClick={() => {
              uploadType !== 'pictures' ? dispatch(RemoveFile(formData?.[uploadType], formData?._id, uploadType, 'customer')) : dispatch(DeleteImages({ fileIds: formData?.[uploadType] }, formData?._id, 'customer'));
            }}
          >
            DELETE
          </p>
        </button>
        {formData?.[uploadType] && (
          <button className="border p-2 py-1 rounded rounded-md bg-neutral-400">
            <p
              className="text-xs font-semibold text-white"
              onClick={(e) => {
                uploadType !== 'pictures' ? window.open(`${END_POINT}/customer/get/${formData?.[uploadType]}`) : setShowImages(true);
              }}
            >
              VIEW
            </p>
          </button>
        )}
      </div>
      {/* <div className="noteField">
        <label className="text-sm font-medium text-primary-900 mb-1">Note</label>
        <textarea id={id} className="w-full border border-primary-300 text-primary-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 resize-vertical" label="Symptoms" placeholder="Enter Note" onChange={handelInputChange} value={formData?.[SectionType]} name={SectionType} />
      </div> */}
      {isModalOpen !== 'pictures' ? <FileUploadModal isOpen={isModalOpen} closeModal={handleCloseModal} onFileUpload={handleFileUpload} uploadType={uploadType} /> : <ImageUploadModal isOpen={isModalOpen} closeModal={handleCloseModal} onImageUpload={handleImageUpload} />}
      {showImage == true && <ImageShowModal isOpen={showImage} closeModal={handleImageCloseModal} Images={formData?.[uploadType]} />}
    </div>
  );
};
