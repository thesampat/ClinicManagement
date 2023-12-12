import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from '../../Components/CommonComponents/CustomInput';
import CustomButton from '../../Components/CommonComponents/CustomButton';
import CustomBreadcrumbs from '../../Components/CommonComponents/CustomBreadcrumbs';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomTextarea from '../../Components/CommonComponents/CustomTextarea';
import { addNewEnquiry } from '../../Redux/AdminReducer/action';

const initialState = {
  conslusion: '',
  purposeOfEnquiry: '',
  reference: '',
  location: '',
  number: '',
  name: '',
};

export default function AddEnquiry() {
  const { addEnquiryMessage, addEnquiryFail, addEnquirySuccess, addEnquiryProcessing } = useSelector((state) => state.AdminReducer);
  const [formData, setFormData] = useState(initialState);
  const [formError, setFormError] = useState(initialState);

  const dispatch = useDispatch();

  // handel input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handel button Click
  const handelButtonClick = () => {
    // create temp object for trim data & error
    const trimmedFormData = { ...formData };
    let updatedFormError = { formError };

    let isValidInput = true;

    // Trim all fields
    for (const key in trimmedFormData) {
      if (trimmedFormData.hasOwnProperty(key)) {
        if (typeof trimmedFormData[key] === 'string') {
          trimmedFormData[key] = trimmedFormData[key].trim();
        }
      }
    }

    //  validate name
    if (!trimmedFormData.name) {
      updatedFormError.name = 'Name is required!';
      isValidInput = false;
    }

    // validate mobile
    if (!trimmedFormData.number) {
      updatedFormError.number = 'Phone number is required!';
      isValidInput = false;
    } else if (!/^\d{10}$/.test(trimmedFormData.number)) {
      updatedFormError.number = 'Invalid phone number, must be 10 digits!';
      isValidInput = false;
    }

    //  validate location
    if (!trimmedFormData.location) {
      updatedFormError.location = 'location is required!';
      isValidInput = false;
    }

    //  validate reference
    if (!trimmedFormData.reference) {
      updatedFormError.reference = 'reference is required!';
      isValidInput = false;
    }

    //  validate purposeOfEnquiry
    if (!trimmedFormData.purposeOfEnquiry) {
      updatedFormError.purposeOfEnquiry = 'Purpose Of Enquiry is required!';
      isValidInput = false;
    }

    //  validate conslusion
    if (!trimmedFormData.conslusion) {
      updatedFormError.conslusion = 'Conslusion is required!';
      isValidInput = false;
    }

    // Update the formError state
    setFormError(updatedFormError);

    // dispatch if no error found in form
    if (isValidInput) {
      dispatch(addNewEnquiry(formData));
    }
  };

  // display toast messages
  useEffect(() => {
    if (addEnquirySuccess && !addEnquiryProcessing) {
      toast.success(addEnquiryMessage, { position: toast.POSITION.TOP_RIGHT });

      //  reset states
      setFormData(initialState);
      setFormError(initialState);
    }
    if (addEnquiryFail && !addEnquiryProcessing) {
      toast.error(addEnquiryMessage, { position: toast.POSITION.TOP_RIGHT });
    }
  }, [addEnquiryProcessing]);

  return (
    <>
      <div className="h-fit min-h-[100vh] lg:px-24 w-full p-10 bg-white">
        {/* bread crumbs */}
        <CustomBreadcrumbs data={[{ title: 'Dashboard', url: '/dashboard' }, { title: 'Add Enquiry' }]} />

        {/* input container */}
        <div className="bg-primary-50 pb-8 rounded-md pt-4 border-2 border-primary-400 ">
          {/* Personal Information */}
          <div className="px-6 py-6 rounded-md ">
            <h2 className="text-2xl font-semibold text-primary-900 border-l-4 border-primary-400 pl-3 "> Personal Information </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 ">
              <CustomInput label={'Name'} name={'name'} type={'text'} value={formData.name} onChange={handleInputChange} placeholder={'Enter Name.'} error={formError.name} />
              <CustomInput label={'Number'} name={'number'} type={'number'} value={formData.number} onChange={handleInputChange} placeholder={'9999999999'} error={formError.number} />
              <CustomInput label={'Location'} name={'location'} type={'text'} value={formData.location} onChange={handleInputChange} placeholder={'Enter Your Location.'} error={formError.location} />
            </div>
          </div>

          {/* Other Details */}
          <div className="px-6 py-6 rounded-md ">
            <h2 className="text-2xl font-semibold text-primary-900 border-l-4 border-primary-400 pl-3 "> Enquiry Details </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 ">
              <CustomInput label={'Reference'} name={'reference'} type={'text'} value={formData.reference} onChange={handleInputChange} placeholder={'Enter Reference.'} error={formError.reference} />
              <CustomInput label={'Purpose Of Enquiry'} name={'purposeOfEnquiry'} type={'text'} value={formData.purposeOfEnquiry} onChange={handleInputChange} placeholder={'Enter Purpose Of Enquiry.'} error={formError.purposeOfEnquiry} />
              <CustomTextarea label={'Conslusion'} name={'conslusion'} type={'text'} value={formData.conslusion} onChange={handleInputChange} placeholder={'Enter Conslusion.'} error={formError.conslusion} />
            </div>
          </div>

          {/* handel add appointment  */}
          <div className="lg:w-80 mx-auto w-full px-5  ">
            <CustomButton isProcessing={addEnquiryProcessing} onClick={handelButtonClick} label="Add Enquiry" />
          </div>
        </div>
      </div>

      {/* toast message  */}
      <ToastContainer />
    </>
  );
}
