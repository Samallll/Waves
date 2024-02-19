import React from 'react'
import { useNavigate } from 'react-router-dom';

function EventManagemtActions() {

  const navigate = useNavigate();
  return (
    <>
      <div className='sm:mt-24 mb-5 mx-20 flex justify-end'>
          <button className='mr-5 bg-green-500 px-5 py-2 border shadow-md rounded text-white font-normal hover:bg-green-700 hover:text-white'
            onClick={()=>navigate("/host/register-event")}
            >
            List your Event</button>
      </div>
    </>
  )
}

export default EventManagemtActions