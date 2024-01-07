import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Added FaTimes for the close sidebar button
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri'; // Added RiArrowUpSLine for the dropdown open icon
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaUserAlt, FaPrescriptionBottleAlt, FaCalendarCheck } from 'react-icons/fa';

// Navbar link code
const NavbarLink = ({ label, url, onClick }) => (
  <Link to={url} onClick={onClick}>
    <span className="cursor-pointer block px-3 py-2 text-primary-50 hover:text-primary-500 ">{label}</span>
  </Link>
);

// dropdown code
const Dropdown = ({ label, items, active, onItemClick }) => (
  <div className={`z-10 bg-primary-400 font-bold divide-y divide-gray-100 rounded-lg shadow w-44 absolute mt-2 right-0 ${active ? '' : 'hidden'}`}>
    <ul className="py-2 text-sm ">
      {/* map dropdown options */}
      {items.map((el, index) => (
        <li key={index}>
          <NavbarLink label={el.label} url={el.url} onClick={onItemClick} />
        </li>
      ))}
    </ul>
  </div>
);

const CustomDropdown = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = (e) => {
    // Check if the mouse is leaving both the button and the dropdown content
    const relatedTarget = e.relatedTarget || e.toElement;

    if (relatedTarget instanceof Node) {
      // relatedTarget is a DOM node
      if (buttonRef.current && !buttonRef.current.contains(relatedTarget)) {
        setIsOpen(false);
      }
    } else {
      setIsOpen(false);
    }
  };

  // Ref to store the button element
  const buttonRef = React.useRef(null);

  return (
    <div className="relative inline-block" onMouseLeave={handleMouseLeave}>
      <button onMouseEnter={handleMouseEnter} ref={buttonRef} className="text-white bg-transparent focus:bg-primary-500 hover:text-primary-500 focus:text-primary-400 hover:ring-2 hover:ring-blue-300 font-bold rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center " type="button">
        {label}
        {isOpen ? <RiArrowUpSLine className="w-5 h-5 ml-1" /> : <RiArrowDownSLine className="w-5 h-5 ml-1" />}
      </button>

      {isOpen && (
        <div className="z-50 bg-transperent w-44 absolute right-0" onMouseEnter={handleMouseEnter}>
          <div className="bg-primary-400 font-bold divide-y divide-gray-100 rounded-lg shadow-md w-44 right-0 mt-6">
            {/* Dropdown content goes here */}
            <ul className="py-2 text-sm">
              {items.map((el, index) => (
                <li key={index}>
                  <NavbarLink label={el.label} url={el.url} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// admin navbar code
const AdminNavbar = () => {
  // define state
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userLogged = useSelector((state) => state.AuthReducer);

  // dropdown data
  const dropdownData = {
    Doctors: [
      { label: 'Add New Doctor', url: '/doctors/addNew' },
      { label: 'View All Doctors', url: 'doctors/list' },
    ],
    Receptionist: [
      { label: 'Add New Receptionist', url: '/receptionist/addNew' },
      { label: 'View All Receptionists', url: 'table/receptionist/list' },
    ],
    Patients: [
      { label: 'Add New Patient', url: '/patients/addNew' },
      { label: 'View All Patients', url: 'table/patients/list' },
    ],
    Consultant: [
      { label: 'Add New Consultant', url: '/consultant/addNew' },
      { label: 'View All Consultants', url: 'table/consultant/list' },
    ],
    Graphs: [{ label: 'View', url: '/graphs' }],
  };

  // toggle dropdown
  const toggleDropdown = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  // toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);

    // Close the dropdown when the sidebar is opened
    setActiveDropdown(null);
  };

  useEffect(() => {
    const handleResize = () => {
      // Close the sidebar on medium and small screens
      if (window.innerWidth <= 768 && sidebarOpen) {
        setSidebarOpen(false);

        // Close the dropdown when the sidebar is closed
        setActiveDropdown(null);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [sidebarOpen]);

  // close dropdown and sidebar
  const closeDropdownAndSidebar = () => {
    setActiveDropdown(null);
    setSidebarOpen(false);
  };

  return (
    <nav className=" bg-primary-400 p-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* logo */}
        <Link to="/dashboard" className="text-white font-bold text-xl">
          <span className="mr-2">LOGO</span>
        </Link>
        {userLogged?.userLoginRole == 'SuperAdmin' && (
          <div className=" space-x-2 hidden md:inline-block">
            {Object.keys(dropdownData).map((category, index) => (
              <div key={index} className="relative inline-block text-left">
                <CustomDropdown label={category} items={dropdownData[category]} />
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-5">
          <div className="flex items-center text-white">
            <FaUserAlt className="inline-block" />
            <h5 className="inline-block ml-2">{userLogged?.userLogindata?.data?.name}</h5>
          </div>
          <button
            onClick={() => {
              sessionStorage.clear();
              window.location.reload();
            }}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
        {/* sidebar buttons */}
        <div className="md:hidden">
          {/* Hamburger icon for mobile */}
          <button onClick={toggleSidebar} className="text-white hover:text-gray-200 focus:outline-none" type="button">
            {sidebarOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* sidebar for small screen */}
      {sidebarOpen && (
        <div className="md:hidden bg-primary-400 z-50 w-64 fixed top-12 right-0 h-full overflow-y-auto">
          <div className=" px-4 py-6">
            <div className="space-y-2 flex flex-col items-start">
              {Object.keys(dropdownData).map((category, index) => (
                <React.Fragment key={index}>
                  {/* element title */}
                  <button onClick={() => toggleDropdown(category)} className="text-primary-500 font-bold focus:outline-none" type="button">
                    {category}
                  </button>
                  {activeDropdown === category && (
                    <ul>
                      {/* element options */}
                      {dropdownData[category].map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <NavbarLink label={item.label} url={item.url} onClick={closeDropdownAndSidebar} />
                        </li>
                      ))}
                    </ul>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
