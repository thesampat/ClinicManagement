import React, { useEffect, useState } from 'react';
import CustomInput from '../../Components/CommonComponents/CustomInput';
import CustomButton from '../../Components/CommonComponents/CustomButton';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { getJwtToken } from '../../Redux/AdminReducer/action';
import { useNavigate, useParams } from 'react-router-dom';
import { END_POINT } from '../../Redux/AdminReducer/action';
import CustomSpinner from '../../Components/CommonComponents/CustomSpinner';
import axios from 'axios';
import CustomSelect from '../../Components/CommonComponents/CustomSelect';

const fetchOrdersIds = async () => {
  try {
    const result = await axios.get(`${END_POINT}/inventory/ids/orders/`, {
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

const fetchSingleItem = async (id) => {
  try {
    const result = await axios.get(`${END_POINT}/inventory/returns/${id}`, {
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
  try {
    const result = await axios.post(`${END_POINT}/inventory/returns`, data, {
      headers: {
        Authorization: getJwtToken(),
      },
    });
    setIsPorcessing(false);
    toast.success('Return Order Created Successfully');
    setTimeout(() => {
      navigate(`/main/inventory/Returns`);
    }, 1000);
  } catch (error) {
    setIsPorcessing(false);
    toast.error(error);
  }
};

const updateItem = async (data, setIsPorcessing) => {
  try {
    const result = await axios.put(`${END_POINT}/inventory/returns/${data._id}`, data, {
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
  order: '',
  damage: '',
  date: '',
};

const initialFormError = initialFormData;

export default function ReturnForm() {
  // define form state
  const [formData, setFormData] = useState();
  const [formError, setFormError] = useState(initialFormError);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderIds, setOrderIds] = useState([]);
  const navigate = useNavigate();
  const { inventory_item_id } = useParams();
  const [isProcessing, setIsPorcessing] = useState(false);
  const dispatch = useDispatch();
  const [profile_image_res, set_profile_image_res] = useState('');

  useEffect(() => {
    fetchOrdersIds().then((e) => {
      setOrderIds(e?.data);
    });
  }, []);

  useEffect(() => {
    if (inventory_item_id === 'addNew') {
      setFormData(initialFormData);
    } else {
      fetchSingleItem(inventory_item_id)
        .then((e) => {
          setFormData(e?.data);
        })
        .catch(setFormData([]));
    }
  }, [inventory_item_id]);

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
    // if (!trimmedFormData?.name) {
    //   updatedFormError.name = 'Name is required!';
    //   isValidInput = false;
    // }

    setFormError(updatedFormError);

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
            <h2 className="text-2xl font-semibold text-primary-900 border-l-4 border-primary-400 pl-3">Order Return Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <CustomSelect onChange={handleInputChange} options={orderIds} label="Select Order Id" value={formData?.order} error={formError?.order} name="order" placeholder="-- Select Order --" />
              <CustomInput label="Damage" name="damage" type="text" value={formData?.damage} onChange={handleInputChange} />
              <CustomInput onChange={handleInputChange} label="Order Date" placeholder="Date" type="date" value={formData?.date} error={formError?.date} name="date" />
            </div>
          </div>

          {/* create item button */}
          <div className="lg:w-80 mx-auto w-full px-5  ">
            <CustomButton onClick={handleForm} isProcessing={isProcessing} label={inventory_item_id == 'addNew' ? 'Submit' : 'Save'} />
          </div>
        </div>
      ) : (
        <CustomSpinner />
      )}

      <ToastContainer />
    </div>
  );
}
