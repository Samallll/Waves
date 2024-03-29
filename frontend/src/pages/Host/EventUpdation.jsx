import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ToastContainer from '../../components/ToastContainer';
import Event from '../../components/forms/Event/Event';
import Location from '../../components/forms/Event/Location';
import JobPost from '../../components/forms/Event/JobPost';
import { addEventDetails,resetEventDetails } from '../../features/eventSlice';
import { validateEventDetails, validateLocation,validateJobPost } from '../../utils/validations';
import useToastService from '../../services/useToastService';
import { useNavigate, useParams } from 'react-router-dom';

function EventUpdation() {

  const [error,setError] = useState('');
  const eventDetails = useSelector(state=>state.event)
  const dispatch = useDispatch();
  const {showToast} = useToastService();
  const navigate = useNavigate();

  const {eventId} = useParams();

  const eventServiceURI = import.meta.env.VITE_EVENT_SERVICE_BASE_URI

  const onSubmit = async (e) => {
    e.preventDefault();
    const updatedEventDetails = {
      ...eventDetails,
      event: {
        ...eventDetails.event,
        contentType: eventDetails.event.contentType.toUpperCase(),
        eventMode: eventDetails.event.eventMode.toUpperCase(),
      },
    };

    const validateEventResult = validateEventDetails(updatedEventDetails.event);
    if (!updatedEventDetails.event.eventName || updatedEventDetails.event.eventName.length <  3) {
      setError('Event Name must be at least 3 characters long');
      return;
    }
    if(validateEventResult !== ""){
      setError(validateEventResult)
      return;
    }
    if(updatedEventDetails.event.eventMode === "Offline"){
      const validateLocation = validateLocation(updatedEventDetails.location);
      if(validateLocation !== ""){
        setError(validateLocation)
        return;
      }
    }
    if(updatedEventDetails.event.organizerCount > 0){
      const validateJobPostResult = validateJobPost(updatedEventDetails.jobPost)
      if(validateJobPostResult !== ""){
        setError(validateJobPostResult)
        return;
      }
    }
    const validateLocationDetails = validateLocation(updatedEventDetails.location);
    if(validateLocationDetails !== ""){
      setError(validateLocationDetails);
      return;
    }
    if (!updatedEventDetails.event.termsAndConditions || updatedEventDetails.event.termsAndConditions.trim().length <   10) {
      setError('Terms And Conditions must not be empty and should be at least 10 characters long');
      return;
    }
    setError("");

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEventDetails),
    };
    try {
      const response = await fetch(`${eventServiceURI}/${updatedEventDetails.event.eventId}`, requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      dispatch(resetEventDetails());
      showToast('Event Updated Successfully!', { type: 'success' })
      navigate("/host/event-management")
      } catch (error) {
        console.error('Error adding event: ', error);
      }

  }

  useEffect(()=>{
    fetchEventDetails();
  },[])

  const fetchEventDetails = async () => {
    try {
    const response = await fetch(`${eventServiceURI}/${eventId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    dispatch(addEventDetails(data))
    } catch (error) {
      console.error('Error adding event: ', error);
    }
  }
  return (
    <>
      <section className='bg-gray-900 py-10 px-20 mt-10'>
        <div className='py-10 px-20 bg-gray-100 mt-10 rounded-[15px]'>
        { error && <>
                      <h6 className='text-white mx-20 bg-red-600 py-2 mb-8 text-center rounded'>{error}</h6>
                      </>}
          <div>
            <Event/>
          </div>

          <div>
            <Location/>
          </div>

          {
            eventDetails?.event?.organizerCount>0 && 
            <div> 
              <JobPost/>
            </div>
          }

          <div className="mt-6 flex items-center justify-center gap-x-6">
            <button
              type="button"
              onClick={onSubmit}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                dispatch(resetEventDetails());
                navigate(`/user/event-details/${eventId}`);
              }}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
          </div>
        </div>
      </section>
      <ToastContainer/>
    </>
  )
}

export default EventUpdation