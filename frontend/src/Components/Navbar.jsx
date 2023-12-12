import React, { useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { AiOutlineClose } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosDocument, IoMdApps } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [sliderOpen, setSliderOpen] = useState(false);
  const userLoginSuccess = useSelector((state) => state.AuthReducer.userLoginSuccess);

  const toggleSlider = () => {
    setSliderOpen(!sliderOpen);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 px-8 flex items-center justify-between p-4 z-50 bg-primary-400">
        <div className="flex items-center space-x-6">
          <div className="text-white px-4">
            <span className="text-xl font-semibold">Logo</span>
          </div>
        </div>
        <div className="lg:hidden  ">
          <button onClick={toggleSlider} className="text-white focus:outline-none  focus:text-gray-400">
            <GiHamburgerMenu size={'25'} />
          </button>
        </div>

        <div className={`font-semibold   hidden lg:flex lg:gap-10 `}>
          <NavItem label="Home" url="/" />
          <NavItem label="About US" url="/about_us" />
          <NavItem label="Contact US" url="/contact_us" />
          <DropdownNavItem label="Pages">
            <DropdownItem label="FAQ" url="/faq" />
            <DropdownItem label="Departments" url="/departments" />
          </DropdownNavItem>

          {!userLoginSuccess ? <NavItem label="Login" url="/login" /> : <NavItem label="Logout" url="/login" />}
        </div>
      </nav>
      {sliderOpen && <Sidebar toggleSlider={toggleSlider} userLoginSuccess={userLoginSuccess} />}
    </>
  );
};

const NavItem = ({ label, url }) => (
  <Link to={url}>
    <div className="text-white">{label}</div>
  </Link>
);

const DropdownNavItem = ({ label, children }) => (
  <div className="relative group  ">
    <div className="flex items-center space-x-2  cursor-pointer">
      <span className="text-white">{label}</span>
      <RiArrowDownSLine className="text-white" />
    </div>
    <div className="absolute border-t-2 border-b-2 border-primary-50 left-0 mt-2 lg:w-40 lg:-left-10 w-full bg-primary-400 lg:mr-8 rounded shadow-lg opacity-0 group-hover:opacity-100">{children}</div>
  </div>
);

const DropdownItem = ({ label, url }) => (
  <Link to={url}>
    <div className="flex items-center px-2 py-2 text-white hover:bg-gray-600 rounded">
      <span>{label}</span>
    </div>
  </Link>
);

const Sidebar = ({ toggleSlider, userLoginSuccess }) => {
  return (
    <div className="fixed lg:hidden top-0 right-0 h-full w-64 bg-primary-400 p-4 z-50">
      <button onClick={toggleSlider} className="text-white focus:outline-none focus:text-gray-400">
        <AiOutlineClose size={'25'} />
      </button>
      <div className="flex flex-col space-y-4 mt-8">
        <NavItem label="Home" url="/" />
        <NavItem label="About US" url="/about_us" />
        <NavItem label="Contact US" url="/contact_us" />
        <DropdownNavItem label="Pages">
          <DropdownItem label="FAQ" url="/faq" />
          <DropdownItem label="Departments" url="/departments" />
        </DropdownNavItem>
        {!userLoginSuccess ? <NavItem label="Login" url="/login" /> : <NavItem label="Logout" url="/login" />}
      </div>
    </div>
  );
};

export default Navbar;
