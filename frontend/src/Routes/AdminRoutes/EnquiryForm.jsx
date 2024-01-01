import React, { useEffect, useState } from 'react';
import CustomBreadcrumbs from '../../Components/CommonComponents/CustomBreadcrumbs';
import CustomInput from '../../Components/CommonComponents/CustomInput';
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
import CustomTextarea from '../../Components/CommonComponents/CustomTextarea';
import CustomImageInput from '../../Components/CommonComponents/CustomImageInput';
import axios from 'axios';
import CustomSelect from '../../Components/CommonComponents/CustomSelect';
import { PatientRefrenceList, RefrenceList } from '../../Files/dropdownOptions';
import CustomNameSuggestion from '../../Components/CommonComponents/CustomNameSuggestion';
import diagnosis from '../../Files/diagnosis.json';

const fetchSingleItem = async (id) => {
  try {
    const result = await axios.get(`${END_POINT}/enquiry/${id}`, {
      headers: {
        Authorization: getJwtToken(),
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    toast.error('Something went wrong while fetching data');
  }
};

const createItem = async (data, navigate, setIsPorcessing) => {
  console.log(data, 'test data');
  try {
    const result = await axios.post(`${END_POINT}/enquiry`, data, {
      headers: {
        Authorization: getJwtToken(),
      },
    });
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
    const result = await axios.put(`${END_POINT}/enquiry/${data._id}`, data, {
      headers: {
        Authorization: getJwtToken(),
      },
    });
    toast.success('Details Updated');
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (error) {
    setIsPorcessing(false);
    toast.error('Failed To Updated');
  }
};

const initialFormData = {
  conslusion: '',
  purposeOfEnquiry: '',
  reference: '',
  location: '',
  number: '',
  name: '',
};

const initialFormError = initialFormData;

export default function EnquiryForm() {
  // define form state
  const [formData, setFormData] = useState();
  const [formError, setFormError] = useState(initialFormError);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { Enquiry_Id } = useParams();
  const [isProcessing, setIsPorcessing] = useState(false);
  const dispatch = useDispatch();
  const [profile_image_res, set_profile_image_res] = useState('');

  useEffect(() => {
    if (Enquiry_Id === 'addNew') {
      setFormData(initialFormData);
    } else {
      fetchSingleItem(Enquiry_Id).then((e) => {
        setFormData(e?.data);
      });
    }
  }, [Enquiry_Id]);

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
      Enquiry_Id == 'addNew' ? createItem(trimmedFormData, navigate, setIsPorcessing) : updateItem(trimmedFormData, setIsPorcessing);
    }
  };

  const handleDiagnosis = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, purposeOfEnquiry: { [name]: value } }));
  };

  return (
    <div className="m-3 rounded-md bg-slate-100 h-fit min-h-[100vh] lg:px-24 w-full p-10  bg-white">
      <button
        onClick={(e) => {
          navigate(-1);
        }}
        className="bg-blue-800 rounded-lg font-semibold text-white p-2 px-3"
      >
        Back
      </button>

      {formData !== null ? (
        <div className="pb-8 pt-4 ">
          {/* Personal Information */}
          <div className="px-6 py-6 rounded-md ">
            <h2 className="text-2xl font-semibold text-primary-900 border-l-4 border-primary-400 pl-3 ">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 ">
              <CustomInput label={'Name'} name={'name'} type={'text'} value={formData?.name} onChange={handleInputChange} placeholder={'Enter Name.'} error={formError.name} />
              <CustomInput label={'Number'} name={'number'} type={'number'} value={formData?.number} onChange={handleInputChange} placeholder={'9999999999'} error={formError.number} />
              <CustomSelect onChange={handleInputChange} options={RefrenceList} label="Reference" placeholder="-- Select Reference --" type="text" value={formData?.reference} error={formError?.reference} name="reference" />
              {formData?.reference == 'Patient' && <CustomSelect onChange={handleInputChange} options={PatientRefrenceList} label="Patient Refrence" placeholder="-- Select Patient Reference --" type="text" value={formData?.patientReference} error={formError?.patientReference} name="patientReference" />}
            </div>
          </div>

          <div className="px-6 py-6 rounded-md ">
            <h2 className="text-2xl font-semibold text-primary-900 border-l-4 border-primary-400 pl-3 "> Enquiry Details </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 ">
              <CustomInput label={'Location'} name={'location'} type={'text'} value={formData?.location} onChange={handleInputChange} placeholder={'Enter Your Location.'} error={formError.location} />
              <CustomInput label={'Purpose Of Enquiry'} name={'purposeOfEnquiry'} type={'text'} value={formData?.purposeOfEnquiry} onChange={handleInputChange} placeholder={'Enter Purpose Of Enquiry.'} error={formError.purposeOfEnquiry} />
              <CustomTextarea label={'Conslusion'} name={'conslusion'} type={'text'} value={formData?.conslusion} onChange={handleInputChange} placeholder={'Enter Conslusion.'} error={formError.conslusion} />
            </div>
          </div>

          <div></div>

          {/* create item button */}
          <div className="lg:w-80 mx-auto w-full px-5  ">
            <CustomButton onClick={handleForm} isProcessing={isProcessing} label={Enquiry_Id == 'addNew' ? 'Submit' : 'Save'} />
          </div>
          {/* <div className="lg:w-80 mx-auto w-full px-5  ">
            <button
              onClick={() => {
                setIsModalOpen(true);
              }}
              className={`w-full mt-6 font-bold bg-red-600  hover:bg-red-700 focus:ring-red-300 text-white py-2.5 rounded-lg transition duration-300 ease-in-out`}
            >
              EXIT
            </button>
          </div> */}
        </div>
      ) : (
        <CustomSpinner />
      )}

      <ToastContainer />

      <ModalCustom
        isShow={isModalOpen}
        setIsShow={setIsModalOpen}
        content={
          <div className="w-[30vw] text-center text-xl font-semibold">
            <div>EXIT</div>
            <CustomInput label={'Exit Date'} name="exit_date" type={'date'} value={formData?.exit_date} onChange={handleInputChange} placeholder={''} error={formError?.exit_date} />
            <CustomTextarea label={'Exit Reason'} name="exit_reason" type={'text'} value={formData?.exit_reason} onChange={handleInputChange} placeholder={'Enter Exit Reason'} error={formError?.exit_reason} />
            <button
              onClick={(e) => {
                setFormData((prev) => ({ ...prev, status: 'Left' }));
                handleForm(e);
              }}
              className="bg-red-400 p-2 rounded-lg"
            >
              Confirm
            </button>
          </div>
        }
      />
    </div>
  );
}
