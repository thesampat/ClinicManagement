import React, { useEffect, useState } from 'react';
import { IoPersonOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from '../Components/CommonComponents/CustomInput';
import CustomButton from '../Components/CommonComponents/CustomButton';
import { checkLoggedIn, consultantLogin, doctorLogin, mainDoctorLogin, receptionistLogin, assistantDoctorLogin } from '../Redux/AuthReducer/action';

export default function Login() {
  const userLoginMessage = useSelector((state) => state.AuthReducer.userLoginMessage);
  const userLoginFail = useSelector((state) => state.AuthReducer.userLoginFail);
  const userLoginSuccess = useSelector((state) => state.AuthReducer.userLoginSuccess);
  const userLoginProcess = useSelector((state) => state.AuthReducer.userLoginProcess);
  const [userInput, setUserInput] = useState({ email: '', password: '' });
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // handel custom input change
  const handelCustomInputChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  // handel Custom Button Click
  const handelCustomButtonClick = () => {
    // trim user input
    const data = {
      email: userInput.email.trim(),
      password: userInput.password.trim(),
    };

    if (!data.email || !data.password) {
      return toast.error('Please fill all required fields.', { position: toast.POSITION.TOP_RIGHT });
    }

    // check for valid email
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      toast.error('Invalid email.', { position: toast.POSITION.TOP_RIGHT });
      return;
    }

    if (!userRole) {
      return toast.error('Select a role.', { position: toast.POSITION.TOP_RIGHT });
    }

    // dispatch login function as per the selected user role.
    if (userRole === 'mainDoctor') {
      dispatch(mainDoctorLogin(userInput));
    } else if (userRole === 'receptionist') {
      dispatch(receptionistLogin(userInput));
    } else if (userRole === 'consultant') {
      dispatch(consultantLogin(userInput));
    } else if (userRole === 'doctor') {
      dispatch(doctorLogin(userInput));
    } else if (userRole === 'assistantDoctor') {
      dispatch(assistantDoctorLogin(userInput));
    }
  };

  // check if user already login
  useEffect(() => {
    dispatch(checkLoggedIn());
  }, []);

  // useEffect
  useEffect(() => {
    // if login success
    if (!userLoginProcess && userLoginSuccess) {
      toast.success(userLoginMessage, { position: toast.POSITION.TOP_RIGHT });

      //  redirect to home page
      window.location.pathname == '/login' && navigate('/dashboard');
    }

    // if login fail
    else if (!userLoginProcess && userLoginFail) {
      toast.error(userLoginMessage, { position: toast.POSITION.TOP_RIGHT });
    }
  }, [userLoginProcess, userLoginSuccess, userLoginFail]);

  return (
    <div className="bg-blue-200 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 border border-gray-300">
        {/* heading */}
        <p className="text-center mb-4 text-2xl font-bold ">Login to continue.</p>

        {/* email input */}
        <label htmlFor="email" className="block mt-4 text-sm font-medium text-primary-900 mb-1">
          Email
        </label>
        <input id="email" type="text" name="email" value={userInput.email} onChange={handelCustomInputChange} placeholder="Enter Email!" className="w-full px-4 py-2 border border-primary-300 text-primary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500" />

        {/* password input */}
        <label htmlFor="password" className="block mt-4 text-sm font-medium text-primary-900 mb-1">
          Password
        </label>
        <input id="password" type="password" name="password" value={userInput.password} onChange={handelCustomInputChange} placeholder="Enter Your Password" className="w-full px-4 py-2 border border-primary-300 text-primary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500" />

        {/* select user role */}
        <label htmlFor="role" className="block mt-4 text-sm font-medium text-primary-900 mb-1">
          Select Role
        </label>
        <select id="role" value={userRole} onChange={(e) => setUserRole(e.target.value)} className="w-full px-4 py-2 border border-primary-300 text-primary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500">
          <option value={''}>Select Role</option>
          <option value="mainDoctor">Main Doctor</option>
          <option value="assistantDoctor">Assistant Doctor</option>
          <option value="doctor">Doctor</option>
          <option value="receptionist">Receptionist</option>
          <option value="consultant">Consultant</option>
        </select>

        {/* login button */}
        <CustomButton onClick={handelCustomButtonClick} isProcessing={userLoginProcess} label="Login" />

        {/* redirect to login page */}
        {/* {
          <p className="mt-4">
            {' '}
            Signup As Main Doctor,{' '}
            <span
              onClick={() => {
                navigate('/signup');
              }}
              className="font-bold text-primary-200 cursor-pointer "
            >
              Signup
            </span>{' '}
          </p>
        } */}
      </div>

      <ToastContainer />
    </div>
  );
}
