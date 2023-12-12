import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

const doctorsData = [
    {
        name: 'Dr. John Doe',
        department: 'Cardiology',
        fbLink: 'https://www.facebook.com/',
        igLink: 'https://www.instagram.com/',
        image: 'https://dentallavelle.com/wp-content/uploads/2019/06/Dental-Lavelle-Why-you-need-to-visit-your-Dentist-every-6-months.jpg',
      },{
        name: 'Dr. John Doe',
        department: 'Cardiology',
        fbLink: 'https://www.facebook.com/',
        igLink: 'https://www.instagram.com/',
        image: 'https://dentallavelle.com/wp-content/uploads/2019/06/Dental-Lavelle-Why-you-need-to-visit-your-Dentist-every-6-months.jpg',
      },{
        name: 'Dr. John Doe',
        department: 'Cardiology',
        fbLink: 'https://www.facebook.com/',
        igLink: 'https://www.instagram.com/',
        image: 'https://dentallavelle.com/wp-content/uploads/2019/06/Dental-Lavelle-Why-you-need-to-visit-your-Dentist-every-6-months.jpg',
      },{
        name: 'Dr. John Doe',
        department: 'Cardiology',
        fbLink: 'https://www.facebook.com/',
        igLink: 'https://www.instagram.com/',
        image: 'https://dentallavelle.com/wp-content/uploads/2019/06/Dental-Lavelle-Why-you-need-to-visit-your-Dentist-every-6-months.jpg',
      },{
        name: 'Dr. John Doe',
        department: 'Cardiology',
        fbLink: 'https://www.facebook.com/',
        igLink: 'https://www.instagram.com/',
        image: 'https://dentallavelle.com/wp-content/uploads/2019/06/Dental-Lavelle-Why-you-need-to-visit-your-Dentist-every-6-months.jpg',
      },{
        name: 'Dr. John Doe',
        department: 'Cardiology',
        fbLink: 'https://www.facebook.com/',
        igLink: 'https://www.instagram.com/',
        image: 'https://dentallavelle.com/wp-content/uploads/2019/06/Dental-Lavelle-Why-you-need-to-visit-your-Dentist-every-6-months.jpg',
      },{
        name: 'Dr. John Doe',
        department: 'Cardiology',
        fbLink: 'https://www.facebook.com/',
        igLink: 'https://www.instagram.com/',
        image: 'https://dentallavelle.com/wp-content/uploads/2019/06/Dental-Lavelle-Why-you-need-to-visit-your-Dentist-every-6-months.jpg',
      },
  // Add more doctor data here
];


const OurTeam = () => {
  return (
    <div className="bg-primary-300 py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold leading-tight text-primary-500 mb-2" data-aos="fade-up">Our Team</h1>
        <p className="font-semibold text-primary-50 mb-8 lg:px-36 px-8 text-justify lg:text-center" data-aos="fade-up">Objectively innovate empowered manufactured products whereas parallel platforms. Holistically predominate extensible testing procedures for reliable supply chains. Dramatically engage top-line web services vis-a-vis cutting-edge deliverables.</p>
        <div className="flex flex-wrap gap-4 items-center justify-center">
          {doctorsData.map((doctor, index) => (
            <div key={index} className="h-80 w-80" data-aos="fade-up">
              {/* Your Team Card Component */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default OurTeam;