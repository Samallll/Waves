import React from 'react';
import Image from '../assets/defaultImage.jpg'
import { Link } from 'react-router-dom';

const RowPost = ({ title, data, isSmall }) => {

  const eventServiceURI = import.meta.env.VITE_EVENT_SERVICE_BASE_URI

  return (
    <div className="flex flex-col ml-5 text-black">
      <h2 className="mb-2 mt-4 text-xl">{title}</h2>
      <div className="flex overflow-x-auto overflow-y-hidden p-5 space-x-10">
        {data && data.map((event, index) => (
          <Link to="/user/event-details" key={index} className={`w-60 h-36 cursor-pointer hover:scale-110 transition-transform relative`}>
            <img
              // src={event.eventPictureId ? `${eventServiceURI}/get-picture/${event.eventPictureId}` : Image}
              src={Image}
              alt="poster"
              className="w-full h-full object-cover rounded"
            />
            <h3 className='text-sm tracking-tight text-center absolute bottom-0 left-0 right-0 bg-opacity-10 p-2 text-white'>{event.eventName}</h3>
          </Link>
        ))}
      </div>
    </div>


  );
};

export default RowPost;
