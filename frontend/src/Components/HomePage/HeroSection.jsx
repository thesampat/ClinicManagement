import React from 'react';
import ReadMoreButton from '../CommonComponents/ReadMoreButton';

export default function HeroSection() {
  return (
    <div data-aos="fade-up" className="flex mt-50 items-center justify-center h-screen bg-gradient-to-b from-purple-800 via-purple-600 to-slate-900">
      <div className="bg-gradient-to-b from-violet-600/[.15] via-transparent">
        <div className="max-w-[85rem] text-center mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
          {/* Title */}
          <img className="w-auto mx-auto pt-8 h-auto lg:max-h-[50vh] max-h-[50vh]  shadow-lg rounded-lg" src="http://res.cloudinary.com/dfrhy6m3m/image/upload/v1693573826/ojmdx9kaobbs6qb95cyy.png" alt="Your Logo" />
          <h1 className="block font-extrabold text-white text-3xl sm:text-3xl md:text-3xl lg:text-3xl leading-tight">
            Your doctor, Your treatment
          </h1>
          <div className="max-w-3xl text-center mx-auto">
            <p className="text-lg text-gray-300">Proactively envisioned multimedia based expertise and cross-media growth strategies. Seamlessly visualize quality intellectual capital without superior collaboration and idea-sharing.</p>
          </div>

          {/* Buttons */}
          <ReadMoreButton label={'HOSPITAL SERVICES'} />
          {/* End Buttons */}
        </div>
      </div>
    </div>
  );
}
