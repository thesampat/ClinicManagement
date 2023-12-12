import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DetailsCard({ title, value, icon }) {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={(e) => {
          let appointment = title?.split(' ');
          if (appointment?.[1] == "Appointment's") {
            navigate(`/appointment/list/${appointment?.[0]}`);
          }
        }}
        className="flex justify-between items-center w-[280px] shadow-md bg-white rounded-lg py-6 px-4 hover:bg-blue-300"
      >
        <p>
          <p>{value}</p>
          <strong>{title}</strong>
        </p>

        <button className="bg-primary-500 rounded-full px-3 py-3 ">{icon}</button>
      </button>
    </>
  );
}
