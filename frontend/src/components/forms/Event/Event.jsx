import React from 'react'
import { useState,useEffect } from 'react';

function Event({onUpdate}) {

    const initialEvent = {
    eventId:"",
    eventName:"",
    date:"",
    time:"",
    genre:"",
    contentType:"",
    eventMode:"",
    organizerCount:0,
    seatsAvailable:0,
    about:"",
    ticketPrice:"",
    termsAndConditions:""
  }

  const [eventDetails,setEventDetails] = useState(initialEvent);

  useEffect(() => {
    onUpdate(eventDetails);
  }, [eventDetails]);

  const handleChange = (e) => {
    setEventDetails(
        { 
        ...eventDetails, 
        [e.target.name]: e.target.value 
        }
    );
  };

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
                    value={eventDetails.eventName} 
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
                    name="date"
                    id="date" 
                    value={eventDetails.date} 
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
                    name="time"
                    id="time" 
                    value={eventDetails.time} 
                    onChange={(e)=>handleChange(e)}
                    autoComplete="time"
                    className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="genre" className="block text-sm font-medium leading-6 text-gray-900">
                  Genre
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="genre"
                    id="genre" 
                    value={eventDetails.genre} 
                    onChange={(e)=>handleChange(e)}
                    autoComplete="genre"
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
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
                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                  About the Event
                </label>
                <div className="mt-2">
                  <textarea
                    type="text"
                    name="about"
                    id="about"
                    autoComplete="about" 
                    value={eventDetails.about} 
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
    </>
  )
}

export default Event