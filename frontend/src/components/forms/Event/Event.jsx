import React from 'react'
import { useState,useEffect } from 'react';
import ImageComponent from '../../../components/ImageComponent';
import Modal from '../../ImageCropper/Modal';
import { useDispatch,useSelector } from 'react-redux';
import { updateEvent, updateUserId } from '../../../features/eventSlice';

function Event() {

  const eventServiceURI = import.meta.env.VITE_EVENT_SERVICE_BASE_URI

  const eventDetails = useSelector(state=>state.event.event);
  const [modalOpen, setModalOpen] = useState(false);
  
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.auth.loggedUser)

  const handleChange = (e) => {
    
    let value = e.target.value;  
    dispatch(updateEvent({ [e.target.name]: value }));
  };

  useEffect(() => {
    dispatch(updateUserId(userDetails?.userId));
  }, [userDetails,eventDetails]);

  return (
    <>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-2xl text-center font-semibold leading-7 text-gray-900">{eventDetails?.eventId != "" ? "Edit" : ""} Event Information</h2>
            <p className="mt-1 text-sm text-center leading-6 text-gray-600">You can edit the details during the event organizing phase.</p>

            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="eventName" className="block text-sm font-medium leading-6 text-gray-900">
                  Event Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="eventName"
                    id="eventName"
                    value={eventDetails?.eventName} 
                    onChange={(e)=>handleChange(e)}
                    autoComplete="given-name"
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
                  Date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="eventDate"
                    id="eventDate" 
                    value={eventDetails.eventDate} 
                    onChange={(e)=>handleChange(e)}
                    className="block px-2 w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="time" className="block text-sm font-medium leading-6 text-gray-900">
                  Time
                </label>
                <div className="mt-2">
                  <input
                    type="time"
                    name="eventTime"
                    id="eventTime" 
                    value={eventDetails.eventTime} 
                    onChange={(e)=>handleChange(e)}
                    autoComplete="eventTime"
                    className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="genre" className="block text-sm font-medium leading-6 text-gray-900">
                  Genre
                </label>
                <div className="mt-2">
                <select
                    id="genre"
                    name="genre" 
                    value={eventDetails.genre} 
                    onChange={(e)=>handleChange(e)}
                    autoComplete="genre"
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>Workshop</option>
                    <option>Other</option>
                    <option>Music</option>
                    <option>Comedy</option>
                    <option>Meetup</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="contentType" className="block text-sm font-medium leading-6 text-gray-900">
                  Content Type
                </label>
                <div className="mt-2">
                  <select
                    id="contentType"
                    name="contentType" 
                    value={eventDetails.contentType} 
                    onChange={(e)=>handleChange(e)}
                    autoComplete="contentType"
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>Free</option>
                    <option>Paid</option>
                  </select>
                </div>
              </div>


              <div className="sm:col-span-1">
                <label htmlFor="eventMode" className="block text-sm font-medium leading-6 text-gray-900">
                  Event Mode
                </label>
                <div className="mt-2">
                  <select 
                    disabled
                    id="eventMode"
                    name="eventMode" 
                    value={eventDetails.eventMode} 
                    onChange={(e)=>handleChange(e)}
                    autoComplete="eventMode"
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>Offline</option>
                    <option>Online</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="organizerCount" className="block text-sm font-medium leading-6 text-gray-900">
                  Organizer Count
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="organizerCount"
                    id="organizerCount" 
                    value={eventDetails.organizerCount} 
                    onChange={(e)=>handleChange(e)}
                    autoComplete="organizerCount" 
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="seatsAvailable" className="block text-sm font-medium leading-6 text-gray-900">
                  Seats Available
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="seatsAvailable"
                    id="seatsAvailable" 
                    value={eventDetails.seatsAvailable} 
                    onChange={(e)=>handleChange(e)}
                    autoComplete="seatsAvailable"
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                  Description the Event
                </label>
                <div className="mt-2">
                  <textarea
                    type="text"
                    name="description"
                    id="description"
                    autoComplete="description" 
                    value={eventDetails.description} 
                    onChange={(e)=>handleChange(e)}
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="ticketPrice" className="block text-sm font-medium leading-6 text-gray-900">
                  Ticket Price
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="ticketPrice"
                    id="ticketPrice" 
                    value={eventDetails.ticketPrice} 
                    onChange={(e)=>handleChange(e)}
                    autoComplete="ticketPrice"
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>  
        </div>

        <div className="space-y-12">
          <div className="mt-8 border-b border-gray-900/10 pb-12 flex space-x-5">

            <div className='w-full'>
              <h2 className="text-lg font-semibold leading-7 text-gray-900">Terms and Conditions</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">Constraints for the users to be participating in the event. Please mention all your T&C in the below text area.</p>

              <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">

                <div className="col-span-full">
                  <div className="mt-2">
                    <textarea
                      type="text"
                      name="termsAndConditions"
                      id="termsAndConditions"
                      autoComplete="termsAndConditions"
                      value={eventDetails.termsAndConditions} 
                      onChange={(e)=>handleChange(e)}
                      className="block min-h-[180px] px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>             
              </div>
            </div>

            <div className='flex flex-col items-center'>
              <p className="mt-1 text-sm leading-6 text-gray-600">Event Picture</p>
              <ImageComponent src={eventDetails.eventPictureId ? `${eventServiceURI}/get-picture/${eventDetails.eventPictureId}` : null}/>

              <button
                type="button"
                onClick={()=>setModalOpen(true)}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-3"
              >
                Upload!
              </button>

              {modalOpen && (
                <Modal
                  closeModal={() => {
                    setModalOpen(false)
                  }}
                  imageUploadUrl={eventServiceURI+'/add-picture'}
                />
              )}
            </div>

          </div> 

        </div>
    </>
  )
}

export default Event