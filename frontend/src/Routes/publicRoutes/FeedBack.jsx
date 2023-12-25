import React, { useState } from 'react';
import CustomInput from '../../Components/CommonComponents/CustomInput';
import CustomSelect from '../../Components/CommonComponents/CustomSelect';
import CustomTextarea from '../../Components/CommonComponents/CustomTextarea';
import statesData from '../../Files/states.json';
import { RefrenceList, educationLevels, indianStatesAndUTs, statusOptions } from '../../Files/dropdownOptions';
import { END_POINT } from '../../Redux/AdminReducer/action';
import axios from 'axios'; // Import Axios
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
  comments1: '',
  signature1: '',
  comments2: '',
  signature2: '',
  comments3: '',
  signature3: '',
  comments4: '',
  signature4: '',
  Status: '',
  CaseNo: '',
  Date: '',
};

const fetchSingleItem = async (id) => {
  try {
    const result = await axios.get(`${END_POINT}/enquiry/${id}`);
    return result;
  } catch (error) {
    console.log(error);
    toast.error('Something went wrong while fetching data');
  }
};

const createItem = async (data, navigate, setIsPorcessing) => {
  console.log(data, 'test data');
  try {
    const result = await axios.post(`${END_POINT}/enquiry`, data);
    let { data: id } = result?.data;
    setIsPorcessing(false);
    navigate(`/enquiry/${id}`);
    toast.success('Enquiry Created Successfully');
  } catch (error) {
    setIsPorcessing(false);
    toast.error(error);
  }
};

const updateItem = async (data, setIsPorcessing) => {
  try {
    const result = await axios.put(`${END_POINT}/enquiry/${data._id}`, data);
    toast.success('Details Updated');
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (error) {
    setIsPorcessing(false);
    toast.error('Failed To Updated');
  }
};

const initialFormError = initialFormData;

export const FeedBack = () => {
  // define form state
  const [formData, setFormData] = useState();
  const [formError, setFormError] = useState(initialFormError);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [isProcessing, setIsPorcessing] = useState(false);
  const [profile_image_res, set_profile_image_res] = useState('');
  const [operateType, setOperateType] = useState(null);

  // useEffect(() => {
  //   if (Enquiry_Id === 'addNew') {
  //     setFormData(initialFormData);
  //   } else {
  //     fetchSingleItem(Enquiry_Id).then((e) => {
  //       setFormData(e?.data);
  //     });
  //   }
  // }, [Enquiry_Id]);

  // handel input change
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleForm = () => {
    const trimmedFormData = { ...formData };
    let isValidInput = true;

    for (const key in trimmedFormData) {
      if (trimmedFormData?.hasOwnProperty(key)) {
        if (typeof trimmedFormData[key] === 'string') {
          trimmedFormData[key] = trimmedFormData[key].trim();
        }
      }
    }

    let updatedFormError = { formError };

    //  validate name
    if (!trimmedFormData?.name) {
      updatedFormError.name = 'Name is required!';
      isValidInput = false;
    }

    // validate mobile
    if (!trimmedFormData?.number) {
      updatedFormError.number = 'Phone number is required!';
      isValidInput = false;
    } else if (!/^\d{10}$/.test(trimmedFormData?.number)) {
      updatedFormError.number = 'Invalid phone number, must be 10 digits!';
      isValidInput = false;
    }

    //  validate reference
    if (!trimmedFormData?.reference) {
      updatedFormError.reference = 'reference is required!';
      isValidInput = false;
    }

    //  validate purposeOfEnquiry
    if (!trimmedFormData?.purposeOfEnquiry) {
      updatedFormError.purposeOfEnquiry = 'Purpose Of Enquiry is required!';
      isValidInput = false;
    }

    setFormError(updatedFormError);

    if (isValidInput) {
      setIsPorcessing(true);
      createItem(trimmedFormData, navigate, setIsPorcessing);
    }
  };

  return (
    <div className="m-3 rounded-md bg-slate-100 h-fit min-h-[100vh] lg:px-24 w-full p-10  bg-white">
      <>
        {operateType === 'add' && (
          <div className="p-20">
            <div className="bg-primary-50 pb-8 rounded-md pt-4 border-2 border-primary-400 ">
              <div className="pb-8 rounded-md pt-4">
                <div className="px-6 py-6 rounded-md">
                  <div className="grid grid-cols-3 gap-x-6">
                    <CustomInput onChange={handleInputChange} label="Status" placeholder="Enter Status" type="text" value={formData?.Status} error={formError.Status} name="Status" />
                    <CustomInput onChange={handleInputChange} label="Case No" placeholder="Enter Case No" type="text" value={formData?.CaseNo} error={formError.CaseNo} name="CaseNo" />
                    <CustomInput onChange={handleInputChange} label="Date  " type="date" value={formData?.Date} error={formError.Date} name="Date" />
                  </div>
                </div>
              </div>
              <div className="pb-8 rounded-md pt-4">
                <div className="px-6 py-6 rounded-md">
                  <h2 className="text-2xl font-semibold text-primary-900 border-l-4 border-primary-400 pl-3">Patient Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <CustomInput onChange={handleInputChange} label="First Name" placeholder="Enter First Name" type="text" value={formData?.FirstName} error={formError.FirstName} name="FirstName" />

                    <CustomInput onChange={handleInputChange} label="Middle Name" placeholder="Enter Middle Name" type="text" value={formData?.MiddleName} error={formError.MiddleName} name="MiddleName" />
                    <CustomInput onChange={handleInputChange} label="Last Name" placeholder="Enter Last Name" type="text" value={formData?.LastName} error={formError.LastName} name="LastName" />

                    <CustomInput onChange={handleInputChange} label="Date of Birth" placeholder="Enter Date of Birth" type="date" value={formData?.dateOfBirth} error={formError.dateOfBirth} name="dateOfBirth" />
                    <CustomSelect onChange={handleInputChange} options={['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']} label={'Blood Group'} value={formData?.bloodGroup} error={formError?.bloodGroup} name="bloodGroup" placeholder="-- Select Blood Group --" />
                    <CustomSelect onChange={handleInputChange} options={['Male', 'Female', 'Other']} label="Gender" value={formData?.gender} error={formError?.gender} name="gender" placeholder="-- Select Gender --" />
                    <CustomInput onChange={handleInputChange} label="Mobil Number" placeholder="09999999999" type="number" value={formData?.mobile} error={formError?.mobile} name="mobile" />

                    <CustomSelect onChange={handleInputChange} options={['Single', 'Married', 'Divorced', 'Widow']} label="Marital Status" value={formData?.maritalStatus} error={formError?.maritalStatus} name="maritalStatus" placeholder="-- Select Marital Status --" />

                    <CustomSelect onChange={handleInputChange} options={['English', 'Spanish', 'French', 'German', 'Hindi', 'Chinese', 'Other']} label="Mother Tongue" value={formData?.motherTongue} error={formError?.motherTongue} name="motherTongue" placeholder="-- Select Mother Tongue --" />

                    <CustomSelect onChange={handleInputChange} options={indianStatesAndUTs} label="State" value={formData?.state} error={formError.state} name="state" placeholder="-- Select State --" />

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
            </div>
          </div>
        )}
        {operateType === 'comment' && (
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
            </div>
          </div>
        )}
      </>

      <ToastContainer />
    </div>
  );
};
