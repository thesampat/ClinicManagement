import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { END_POINT, getJwtToken } from '../../Redux/AdminReducer/action';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';
import CustomButton from '../../Components/CommonComponents/CustomButton';

const resetPassword = async (data, path, setIsPorcessing, closeModal) => {
  console.log(path);
  try {
    const result = await axios.post(`${END_POINT}/resetPassword/${path}`, data, {
      headers: {
        Authorization: getJwtToken(),
      },
    });
    let { data: id } = result?.data;
    setIsPorcessing(false);
    toast.success('Password Changed Successfully');
    setTimeout(() => {
      closeModal(false);
    }, 1000);
  } catch (error) {
    setIsPorcessing(false);
    toast.error(error);
  }
};

const ResetPasswordPopup = ({ isOpen, onClose }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [processing, setIsProcessing] = useState(false);
  let loggedInUser = useSelector((state) => state.AuthReducer.userLogindata.data);

  const handleSubmit = () => {
    if (confirmPassword !== newPassword) {
      toast.error('Password does not match');
    } else {
      resetPassword({ newPassword: confirmPassword }, `${loggedInUser?._id}/${loggedInUser?.role}`, setIsProcessing, onClose);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className={`absolute inset-0 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white p-8 w-full max-w-md relative z-50">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <div className="relative mb-4">
          <input type={showPassword ? 'text' : 'password'} placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="p-2 mb-4 border border-gray-300 rounded-md w-full" />
          <span onClick={togglePasswordVisibility} className="absolute right-3 top-2 cursor-pointer">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className="relative mb-4">
          <input type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="p-2 mb-4 border border-gray-300 rounded-md w-full" />
          <span onClick={toggleConfirmPasswordVisibility} className="absolute right-3 top-2 cursor-pointer">
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className="flex justify-between gap-5">
          <CustomButton onClick={handleSubmit} isProcessing={processing} label="Submit" color={'primary-200'} width={32} />

          <CustomButton onClick={onClose} isProcessing={processing} label="Close" color={'red-500'} width={32} />
        </div>
      </div>
      <ToastContainer />
      <div className={`absolute inset-0 bg-black opacity-50 transition-opacity z-40 ${isOpen ? '' : 'hidden'}`}></div>
    </div>
  );
};

export default ResetPasswordPopup;
