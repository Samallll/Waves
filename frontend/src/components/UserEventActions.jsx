import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';


function UserEventActions({event}) {

    const loggedUser = useSelector(state=>state.auth.loggedUser)
    const navigate = useNavigate();

    const participate = async () => {

        navigate(`/user/participate-event/${event?.eventId}`)

    }

    const organize = () => {
        navigate(`/user/organize-event/${event.eventId}`);
    }


  return (
    <>
        {
            loggedUser?.userId !== event?.hostedByUserId && event?.eventStatus === "LIVE" && event?.participantsCount < event?.seatsAvailable &&
            <button title="" className="flex items-center justify-center w-full px-4 py-2 mt-5 text-base font-semibold text-white transition-all duration-200 bg-green-600 border-2 border-transparent rounded-md hover:bg-green-800 focus:bg-blue-700" role="button"
                onClick={participate}
                >
                Participate in the event
            </button>
        }

        {
            event?.organizerCount > 0 && loggedUser?.userId !== event?.hostedByUserId && event?.eventStatus === "ORGANIZING" && 
            <button title="" className="flex items-center justify-center w-full px-4 py-2 mt-4 text-base font-semibold text-black transition-all duration-200 bg-transparent border-2 border-black rounded-md hover:bg-black focus:bg-black hover:text-white focus:text-white" role="button"
                onClick={organize}
                >
                Organize the event
            </button>
        }
    </>
  )
}

export default UserEventActions