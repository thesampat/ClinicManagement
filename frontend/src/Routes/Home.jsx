import React from 'react';
import HeroSection from '../Components/HomePage/HeroSection';
import Doctors from '../Components/HomePage/Doctors';
import PatientTestimonials from '../Components/HomePage/PatientTestimonials';
import OurTeam from '../Components/HomePage/OurTeam';
import OurServices from '../Components/HomePage/OurServices';
import SubscribeNewsLatter from '../Components/HomePage/SubscribeNewsLatter';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Doctors />

      <OurTeam />
      <OurServices />

      <PatientTestimonials />
      <SubscribeNewsLatter />
    </div>
  );
}
