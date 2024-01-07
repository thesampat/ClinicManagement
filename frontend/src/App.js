import logo from './logo.svg';
import './App.css';
import AllRoutes from './Routes/AllRoutes';
import { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import { useSelector } from 'react-redux';
import AdminNavbar from './Components/AdminNavbar';
import SidePanel from './Components/CommonComponents/SidePanel';
import { toast } from 'react-toastify';

function App() {

  const userLoginSuccess = useSelector((state) => state.AuthReducer.userLoginSuccess)
  const userLoginRole = useSelector((state) => state.AuthReducer.userLoginRole)

  useEffect(() => {
    toast.clearWaitingQueue();
    toast.dismiss();
    AOS.init();
  }, [])

  return (
    <div className='bg-white flex flex-col'>
      <div className={`Main ${userLoginSuccess ? 'flex' : ''}`}>
        <div className=''>
          {userLoginSuccess && <SidePanel />}
        </div>
        <AllRoutes />
      </div>
      <div className='w-full bg-gray-200 text-center py-2 px-4 mx-2'>
        <p className='text-black font-bold text-sm'>
          &copy; 2024 Shiven Consultancy Services. All rights reserved.
        </p>
      </div>

    </div>
  );
}

export default App;
