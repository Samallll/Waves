import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { cancelEvent, makeLive } from '../utils/eventMethods';
import useToastService from '../services/useToastService';

function HostEventActions({event}) {

    const navigate = useNavigate();
    const {showToast} = useToastService();
    
    const cancel = () => {

      const currentDate = new Date();

      const [year, month, day] = event.eventDate.split('-').map(Number);
      const [hours, minutes, seconds] = event.eventTime.split(':').map(Number);
      const eventDateTime = new Date(year, month - 1, day, hours, minutes, seconds);

      if (currentDate.getTime() > eventDateTime.getTime()) {
          showToast('Event status is Live', { type: 'danger' })
          navigate("/host/event-management");
      } else {
          cancelEvent(event.eventId);
          navigate("/host/event-management");
      }
      navigate("/host/event-management");
    }

    const goLive = () => {
      const currentDate = new Date();

      const [year, month, day] = event.eventDate.split('-').map(Number);
      const [hours, minutes, seconds] = event.eventTime.split(':').map(Number);
      const eventDateTime = new Date(year, month -  1, day, hours, minutes, seconds);

      if (currentDate.getTime() > eventDateTime.getTime()) {
          showToast('Invalid Event Date',{ type: 'danger' });
          console.log('The current time is after the event time');
      } else {
          makeLive(event.eventId,showToast);
          navigate("/host/event-management");
          console.log('The current time is before the event time');
      }

    }

  return (
    <>
    {
      event?.eventStatus === 'ORGANIZING' &&
      <>
        <button title="" className="flex items-center justify-center w-full px-4 py-2 mt-5 text-base font-semibold text-white transition-all duration-200 bg-green-600 border-2 border-transparent rounded-md hover:bg-green-800 focus:bg-blue-700" role="button"
          onClick={goLive}
          >
          Go Live !
        </button>
        <button title="" className="flex items-center justify-center w-full px-4 py-2 mt-4 text-base font-semibold text-black transition-all duration-200 bg-transparent border-2 border-black rounded-md hover:bg-black focus:bg-black hover:text-white focus:text-white" role="button"
            onClick={()=>navigate(`/host/update-event/${event.eventId}`)}
            >
            Edit Event Details
        </button>
      </>
    }       
    {
      event?.eventStatus !== 'EXPIRED' &&
      <button title="" className="flex items-center justify-center w-full px-4 py-2 mt-5 text-base font-semibold text-white transition-all duration-200 bg-red-600 border-2 border-transparent rounded-md hover:bg-red-800 focus:bg-blue-700" role="button"
        onClick={cancel}
        >
          Cancel Event
      </button>
    }
    </>
  )
}

export default HostEventActions