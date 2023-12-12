import logo from './logo.svg';
import './App.css';
import AllRoutes from './Routes/AllRoutes';
import { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import { useSelector } from 'react-redux';
import AdminNavbar from './Components/AdminNavbar';
import SidePanel from './Components/CommonComponents/SidePanel';

function App() {

  const userLoginSuccess = useSelector((state) => state.AuthReducer.userLoginSuccess)
  const userLoginRole = useSelector((state) => state.AuthReducer.userLoginRole)

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <div className='bg-primary-50 flex flex-col' >
      <div className={`Main ${userLoginSuccess ? 'flex' : ''}`}>
        <div className='pt-3 pb-3 ps-3'>
          {userLoginSuccess && <SidePanel />}
        </div>
        <AllRoutes />
      </div>
    </div>
  );
}

export default App;
