import React, { useEffect, useState } from 'react';
import { IoPersonOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from '../Components/CommonComponents/CustomInput';
import CustomButton from '../Components/CommonComponents/CustomButton';
import { checkLoggedIn, consultantLogin, doctorLogin, mainDoctorLogin, receptionistLogin, assistantDoctorLogin } from '../Redux/AuthReducer/action';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import { END_POINT, getJwtToken } from '../Redux/AdminReducer/action';

const fetchItemSingle = async (path) => {
  try {
    const result = await axios.get(`${END_POINT}/${path}`);
    return result;
  } catch (error) {
    console.log(error);
    toast.error('Something went wrong while fetching data');
  }
};

export default function Login() {
  const userLoginMessage = useSelector((state) => state.AuthReducer.userLoginMessage);
  const userLoginFail = useSelector((state) => state.AuthReducer.userLoginFail);
  const userLoginSuccess = useSelector((state) => state.AuthReducer.userLoginSuccess);
  const userLoginProcess = useSelector((state) => state.AuthReducer.userLoginProcess);
  const [userInput, setUserInput] = useState({ email: '', password: '' });
  const [userNames, setUserNames] = useState(null);
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState({ name: '', role: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // handel custom input change
  const handelCustomInputChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handelCustomButtonClick = async () => {
    let role = userNames?.filter((u) => u?.username === userName?.name)?.[0]?.role;
    let userEmail = await fetchItemSingle(`configAccess/users/getUsersDetails?role=${role}&username=${userName?.name}`);

    const data = {
      email: userEmail?.data?.trim(),
      password: userInput.password.trim(),
    };

    if (!data.email || !data.password) {
      return toast.error('Please fill all required fields.', { position: toast.POSITION.TOP_RIGHT });
    }

    if (!/\S+@\S+\.\S+/.test(data.email)) {
      toast.error('Invalid email.', { position: toast.POSITION.TOP_RIGHT });
      return;
    }

    if (role === 'MainDoctor') {
      dispatch(mainDoctorLogin(data));
    } else if (role === 'Receptionist') {
      dispatch(receptionistLogin(data));
    } else if (role === 'Consultant') {
      dispatch(consultantLogin(data));
    } else if (role === 'Doctor') {
      dispatch(doctorLogin(data));
    } else if (role === 'AssistantDoctor') {
      dispatch(assistantDoctorLogin(data));
    }
  };

  // check if user already login
  useEffect(() => {
    dispatch(checkLoggedIn());
    fetchItemSingle('configAccess/users/getUsers').then((e) => {
      setUserNames(e?.data);
    });
  }, []);

  useEffect(() => {
    if (!userLoginProcess && userLoginSuccess) {
      window.location.pathname == '/login' && navigate('/dashboard');
    }
  }, [userLoginProcess, userLoginSuccess, userLoginFail]);

  return (
    <div className="bg-blue-200">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" width="200" height="80">
        ShiVen
        <text x="10" y="50" font-family="Verdana, sans-serif" font-size="30" font-weight="bold" fill="black" className="uppercase">
          ShiVen
        </text>
      </svg>

      <div className="bg-blue-200 flex flex-col items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96 border border-gray-300">
          <p className="text-center mb-4 text-2xl font-bold ">Login to continue.</p>

          {/* select user role */}
          <label htmlFor="role" className="block mt-4 text-sm font-medium text-primary-900 mb-1">
            Select User
          </label>
          <select id="role" value={userName?.name} onChange={(e) => setUserName({ name: e.target.value })} className="w-full px-4 py-2 border border-primary-300 text-primary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500">
            <option value={''}>Select User</option>
            {userNames?.map((u) => (
              <option value={u?.username}>{u?.username}</option>
            ))}
          </select>

          <label htmlFor="password" className="block mt-4 text-sm font-medium text-primary-900 mb-1">
            Password
          </label>
          <div className="relative">
            <input id="password" type={showPassword ? 'text' : 'password'} name="password" value={userInput.password} onChange={handelCustomInputChange} placeholder="Enter Your Password" className="w-full px-4 py-2 border border-primary-300 text-primary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500" />
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={handlePasswordVisibility}>
              {showPassword ? <AiFillEyeInvisible className="h-5 w-5 text-primary-500" /> : <AiFillEye className="h-5 w-5 text-primary-500" />}
            </span>
          </div>

          <CustomButton onClick={handelCustomButtonClick} isProcessing={userLoginProcess} label="Login" />

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
    </div>
  );
}
