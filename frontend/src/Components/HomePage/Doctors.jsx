import React, { useEffect } from 'react';
import ReadMoreButton from '../CommonComponents/ReadMoreButton';
import AOS from "aos";
import "aos/dist/aos.css";

// A reusable component for a single doctor's card
const DoctorCard = ({ imageUrl, title, description }) => (
  <div data-aos="fade-up" className="mx-3 lg:-mt-28  flex flex-col rounded-lg bg-white shadow-primary-400 sm:shrink-0 sm:grow sm:basis-0">
    <a href="#!">
      <img className="rounded-t-lg h-60 w-full" src={imageUrl} alt={title} />
    </a>
    <div className="p-6">
      <h5 className="mb-2 text-xl font-medium leading-tight text-primary-300 ">
        {title}
      </h5>
      <p className="mb-4 text-base text-primary-300 ">
        {description}
      </p>
    </div>
    <div className="mt-auto border-t-2 border-primary-300 px-6 py-3 text-center ">

      <ReadMoreButton label={"Read More"} />

    </div>
  </div>
);

const doctorData = [
  {
    id: 1,
    title: 'Great staff',
    description:
      'Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps.',
    imageUrl:
      'https://image1.masterfile.com/getImage/NjE0LTA2ODk3NDc0ZW4uMDAwMDAwMDA=AJ4VY5/614-06897474en_Masterfile.jpg',
  },
  {
    id: 2,
    title: 'Affordable',
    description:
      'Podcasting operational change management inside of workflows to establish a framework. Taking seamless key performance to maximise offline indicators.',
    imageUrl:
      'https://www.tricitymed.org/wp-content/uploads/2018/10/shutterstock_601718768-400x267.jpg',
  },
  {
    id: 3,
    title: 'Great facilities',
    description:
      'Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas.',
    imageUrl:
      'https://s3-ap-southeast-1.amazonaws.com/m3india-prod/content/1492420745567.jpg',
  },
  // {
  //   id: 1,
  //   title: 'Dentist',
  //   description:
  //     'Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas. Dynamically innovate resource-leveling customer service for state of the art customer service.',
  //   imageUrl:
  //     'https://dentallavelle.com/wp-content/uploads/2019/06/Dental-Lavelle-Why-you-need-to-visit-your-Dentist-every-6-months.jpg',
  // },
  // {
  //   id: 2,
  //   title: 'Cardiologist',
  //   description:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod risus a nisl volutpat, eu efficitur elit aliquam. Vivamus eu iaculis lectus. Quisque porttitor fermentum est, et finibus libero dignissim nec.',
  //   imageUrl:
  //     'https://www.hawaiipacifichealth.org/media/3922/what-is-a-cardiologist-web.jpg',
  // },
  // {
  //   id: 3,
  //   title: 'Orthopedic Surgeon',
  //   description:
  //     'Nullam quis odio et ligula vehicula ullamcorper ut eu ex. Proin a erat fringilla, fermentum felis non, pellentesque arcu. Aenean in risus ac odio auctor euismod.',
  //   imageUrl:
  //     'https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img/https://chicagohealthonline.com/wp-content/uploads/2017/08/Orthopedics.F17-1-1170x700.jpg',
  // },
  // Add more doctor entries here
];


export default function Doctors() {
  return (
    <div className="grid grid-cols-1 bg-primary-500 py-16 sm:grid-cols-2 md:grid-cols-3 gap-4 px-5 lg:px-24">
      {doctorData.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          imageUrl={doctor.imageUrl}
          title={doctor.title}
          description={doctor.description}
        />
      ))}
    </div>
  );
}
