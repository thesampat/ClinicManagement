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

const fetchSingleItem = async (id) => {
  try {
    const result = await axios.get(`${END_POINT}/inventory/orders/${id}`, {
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

const fetchMedicine = async (id) => {
  try {
    const result = await axios.get(`${END_POINT}/inventory/inventory/${id}`, {
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

const fetchDistributor = async (cname) => {
  const encodedSearch = encodeURIComponent(JSON.stringify({ 'companies.name': cname }));

  try {
    const result = await axios.get(`${END_POINT}/inventory/distributors?search=${encodedSearch}`, {
      headers: {
        Authorization: getJwtToken(),
      },
    });
    return result;
  } catch (error) {
    console.error(error);
    toast.error('Something went wrong while fetching data');
  }
};
const createItem = async (data, navigate, setIsPorcessing) => {
  try {
    const result = await axios.post(`${END_POINT}/inventory/orders`, data, {
      headers: {
        Authorization: getJwtToken(),
      },
    });
    let { data: id } = result?.data;
    setIsPorcessing(false);
    toast.success('Order Created Successfully');
    setTimeout(() => {
      navigate(`/main/inventory/Order`);
    }, 1000);
  } catch (error) {
    setIsPorcessing(false);
    toast.error(error);
  }
};

const updateItem = async (data, setIsPorcessing) => {
  try {
    const result = await axios.put(`${END_POINT}/inventory/orders/${data._id}`, data, {
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
  nameOfMedicine: '',
  company: '',
  potencyOrPower: '',
  quantity: '',
  typeOfMedicine: '',
  damage: '',
  date: '',
  to: '',
  distributor: '',
};

const initialFormError = initialFormData;

export default function OrderForm() {
  // define form state
  const [formData, setFormData] = useState();
  const [formError, setFormError] = useState(initialFormError);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { inventory_item_id, medicine_id } = useParams();
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isProcessing, setIsPorcessing] = useState(false);
  const dispatch = useDispatch();
  const [profile_image_res, set_profile_image_res] = useState('');
  let [distributorsOptions, setDistributorsOptions] = useState([]);

  useEffect(() => {
    if (inventory_item_id === 'addNew') {
      fetchMedicine(medicine_id).then((e) => {
        setSelectedMedicine(e?.data);
        const { company, nameOfMedicine, potencyOrPower, typeOfMedicine } = e.data;
        setFormData({ company: company, nameOfMedicine: nameOfMedicine, potencyOrPower: potencyOrPower, typeOfMedicine: typeOfMedicine });
      });
      setFormData(initialFormData);
    } else {
      fetchSingleItem(inventory_item_id).then((e) => {
        setFormData(e?.data);
      });
    }
  }, [inventory_item_id, medicine_id]);

  useEffect(() => {
    if (selectedMedicine !== null) {
      fetchDistributor(selectedMedicine?.nameOfMedicine).then((e) => {
        e?.data?.map((e) => {
          setDistributorsOptions((prev) => [...prev, e]);
        });
      });
    }
  }, [selectedMedicine]);

  // handel input change
  const handleInputChange = (event) => {
    let { name, value, type, checked } = event.target;
    let filteredi;

    if (name == 'distributor') {
      filteredi = distributorsOptions?.filter((d) => d?.companyName == value)?.[0];
      value = filteredi?._id;
    }

    setFormData({
      ...formData,
      [name]: value,
      to: filteredi?.email,
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
    // if (!trimmedFormData?.name) {
    //   updatedFormError.name = 'Name is required!';
    //   isValidInput = false;
    // }

    setFormError(updatedFormError);

    console.log(formData);
    if (isValidInput) {
      setIsPorcessing(true);
      inventory_item_id == 'addNew' ? createItem(trimmedFormData, navigate, setIsPorcessing) : updateItem(trimmedFormData, setIsPorcessing);
    }
  };

  return (
    <div className="m-3 rounded-md bg-slate-100 h-fit min-h-[100vh] lg:px-24 w-full p-10  bg-white">
      <button className="bg-blue-300 px-3 py-1 rounded-lg font-bold font-gray-200" onClick={(e) => navigate(-1)}>
        Go Back
      </button>

      {formData !== null ? (
        <div className="pb-8 pt-4 ">
          {/* Personal Information */}

          <div className="px-6 py-6 rounded-md">
            <h2 className="text-2xl font-semibold text-primary-900 border-l-4 border-primary-400 pl-3">Order Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <CustomInput label="Name of Medicine" name="nameOfMedicine" type="text" value={selectedMedicine?.nameOfMedicine} onChange={handleInputChange} />
              <CustomInput label="Company" name="company" type="text" value={selectedMedicine?.company} onChange={handleInputChange} />
              <CustomInput label="Potency / Power" name="potencyOrPower" type="text" value={selectedMedicine?.potencyOrPower} onChange={handleInputChange} />
              <CustomInput label="Quantity" name="quantity" type="number" value={formData?.quantity} onChange={handleInputChange} />
              <CustomInput label="Type of Medicine" name="typeOfMedicine" type="text" value={selectedMedicine?.typeOfMedicine} onChange={handleInputChange} />

              <CustomSelect
                onChange={(e) => {
                  handleInputChange(e);
                }}
                options={distributorsOptions?.map((e) => e?.companyName)}
                label="distributor"
                value={formData?.distributor}
                error={formError?.distributor}
                name="distributor"
                placeholder="-- Select Distributor --"
              />
            </div>
          </div>

          {/* create item button */}
          <div className="lg:w-80 mx-auto w-full px-5  ">
            <CustomButton onClick={handleForm} isProcessing={isProcessing} label={inventory_item_id == 'addNew' ? 'Submit' : 'Save'} />
          </div>
          <div className="lg:w-80 mx-auto w-full px-5  "></div>
        </div>
      ) : (
        <CustomSpinner />
      )}

      <ToastContainer />
    </div>
  );
}
