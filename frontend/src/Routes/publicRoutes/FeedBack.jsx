import React, { useEffect, useState } from 'react';
import CustomInput from '../../Components/CommonComponents/CustomInput';
import CustomSelect from '../../Components/CommonComponents/CustomSelect';
import CustomTextarea from '../../Components/CommonComponents/CustomTextarea';
import statesData from '../../Files/states.json';
import { RefrenceList, educationLevels, indianStatesAndUTs, statusOptions } from '../../Files/dropdownOptions';
import axios from 'axios';
import { UploadFile, END_POINT, RemoveFile, UploadImages, DeleteImages } from '../../Redux/AdminReducer/action';
import CustomButton from '../../Components/CommonComponents/CustomButton';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const createItem = async (data, navigate, setIsPorcessing, setSelectedPatient, setOperateType) => {
  try {
    const result = await axios.post(`${END_POINT}/feedback`, data);
    setSelectedPatient(result?.data);
    setOperateType('comment');
    setIsPorcessing(false);
    // navigate(`/enquiry/${id}`);
    toast.success('Created Successfully');
  } catch (error) {
    setIsPorcessing(false);
    toast.error(error);
  }
};

const fetchItems = async (path) => {
  try {
    const result = await axios.get(`${END_POINT}/${path}`);
    return result;
  } catch (error) {
    console.log(error);
    toast.error('Something went wrong while fetching data');
  }
};

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
  Status: '',
  CaseNo: '',
  Date: '',
  complaints: Array.from({ length: 10 }, () => ({ content: '' })),
};

const initialFormError = { ...initialFormData };

export const FeedBack = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [filteredStates, setFilteredStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [states, setStates] = useState([]);
  const [patientList, setPatientList] = useState([]);
  const [operateType, setOperateType] = useState('add');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [isProcessing, setIsPorcessing] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  console.log('the selleted patient now done', selectedPatient);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    fetchItems('feedback/patients').then((res) => {
      console.log(res?.data);
      setPatientList(res?.data);
    });
  }, []);

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
    // let updatedFormError = { formError };

    // //  validate name
    // if (!trimmedFormData?.name) {
    //   updatedFormError.name = 'Name is required!';
    //   isValidInput = false;
    // }

    // // validate mobile
    // if (!trimmedFormData?.number) {
    //   updatedFormError.number = 'Phone number is required!';
    //   isValidInput = false;
    // } else if (!/^\d{10}$/.test(trimmedFormData?.number)) {
    //   updatedFormError.number = 'Invalid phone number, must be 10 digits!';
    //   isValidInput = false;
    // }

    // //  validate reference
    // if (!trimmedFormData?.reference) {
    //   updatedFormError.reference = 'reference is required!';
    //   isValidInput = false;
    // }

    // //  validate purposeOfEnquiry
    // if (!trimmedFormData?.purposeOfEnquiry) {
    //   updatedFormError.purposeOfEnquiry = 'Purpose Of Enquiry is required!';
    //   isValidInput = false;
    // }

    // setFormError(updatedFormError);

    if (isValidInput) {
      setIsPorcessing(true);
      createItem(trimmedFormData, navigate, setIsPorcessing, setSelectedPatient, setOperateType);
    }
  };

  const handleComplaintChange = (index, value) => {
    const updatedComplaints = [...formData.complaints];
    updatedComplaints[index]['content'] = value;

    setFormData({
      ...formData,
      complaints: updatedComplaints,
    });
  };

  return (
    <>
      <div className="w-full justify-between mx-auto w-full px-5 flex">
        <CustomSelect
          onChange={(e) => {
            let selectedPatienti = patientList?.filter((p) => p?.FirstName === e.target.value)?.[0];
            setSelectedPatient(selectedPatienti?._id);
          }}
          options={patientList?.map((e) => e?.FirstName)}
          label="Reference"
          placeholder="-- Select Patient Reference --"
          type="text"
          value={formData?.reference}
          error={formError.reference}
          name="reference"
        />
        <div className="groupofButtons flex gap-10">
          {operateType !== 'add' && (
            <button className="w-fit p-3 mt-6 font-bold bg-primary-200 text-white h-12" onClick={() => setOperateType('add')}>
              Add New
            </button>
          )}

          <button className="w-fit p-3 mt-6 font-bold bg-primary-200 text-white h-12" onClick={() => setOperateType(null)}>
            Back
          </button>
        </div>
      </div>

      {operateType == 'add' && (
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                    {formData?.complaints?.map((complaint, index) => (
                      <div key={index}>
                        <label className="block text-sm font-medium text-gray-700">{`Complaint ${index + 1}`}</label>
                        <input type="text" value={complaint?.content} onChange={(e) => handleComplaintChange(index, e.target.value)} className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-80 mx-auto w-full px-5  ">
              <CustomButton onClick={handleForm} isProcessing={isProcessing} label={'Submit'} />
            </div>
          </div>
        </div>
      )}

      {selectedPatient !== null && (
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
  );
};
