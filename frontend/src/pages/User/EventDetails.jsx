import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../utils/axiosHelper'
import RowPost from '../../components/RowPost';
import { dateConverter } from '../../utils/converter';
import { convertToNormalTime } from '../../utils/converter';
import HostEventActions from '../../components/HostEventActions';
import UserEventActions from '../../components/UserEventActions';
import EventCard from '../../components/event/EventCard';
import ToastContainer from '../../components/ToastContainer';

function EventDetails() {

    const {eventId} = useParams();
    const [pageSize,setPageSize] = useState(10);
    const [page,setPage] = useState(0);
    const [similarRecords,setSimilarRecords] = useState([]);

    const eventServiceURI = import.meta.env.VITE_EVENT_SERVICE_BASE_URI

    const [eventDetails,setEventDetails] = useState();
    localStorage.removeItem('participationData');

    useEffect(()=>{
        fetchEventDetails(eventId);
    },[eventId])

    const fetchEventDetails = async (eventId) => {

        try{
            const response = await axios.get(`${eventServiceURI}/${eventId}`)
            const details = await response.data;
            setEventDetails(details)
            const genre = details.event.genre;
            const similarEventsResponse = await axios.get(`${eventServiceURI}/by-genre?page=${page}&size=${pageSize}&genre=${genre}`);
            const similarEventsData = similarEventsResponse.data;
            const filteredData = similarEventsData.content.filter(obj => obj.eventId !== details.event.eventId && obj.eventStatus !== "EXPIRED");
            setSimilarRecords(filteredData);
        }
        catch(error){
            console.log(error)
        }
    }

  return (
    <>
        <div className="bg-white">
            <div className="mt-10">
                          
                <div className="mx-auto max-w-2xl px-4 pb-10 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-18 lg:pt-16">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{eventDetails?.event.eventName}</h1>
                    </div>

                    <EventCard eventDetails={eventDetails}/>
                    
                    <div>
                        <div className="overflow-hidden border-solid border-gray-300 shadow-xl bg-gray-100 rounded-[15px]">   
                            
                            <div className="p-8 lg:px-10 lg:py-8">
                                <h3 className="text-xl font-semibold text-gray-900 text-center">Hosting Details</h3>
                                
                                <ul role="list" className="list-disc space-y-2 pl-4 text-sm mt-4 text-gray-600">
                                    <li><span className="text-gray-800">Date : {dateConverter(eventDetails?.event.eventDate)}</span></li>
                                    <li><span className="text-gray-800">Time : {convertToNormalTime(eventDetails?.event?.eventTime)}</span></li>
                                    {
                                        eventDetails?.event?.ticketPrice > 0 && 
                                        <li><span className="text-green-600 font-medium text-md">Ticket Price : {eventDetails?.event?.ticketPrice} Rs</span></li>
                                    }
                                </ul>

                                {
                                    eventDetails?.location && 
                                    <div className='bg-gray-800 mt-5 rounded px-4 py-2 text-gray-100'>
                                        <h4 className='text-white text-center'>Location</h4>
                                        <p className='text-sm mt-2'>{eventDetails?.location?.streetAddress}</p>
                                        <div className='flex justify-between text-sm'>
                                            <p className='text-gray-300'>{eventDetails?.location?.city}</p>
                                            <p className='text-gray-300'>PIN: {eventDetails?.location?.zipCode}</p>
                                        </div>
                                        <div className='flex justify-between text-sm'>
                                            <p className='text-gray-300'>{eventDetails?.location?.state}</p>
                                            <p className='text-gray-300'>{eventDetails?.location?.country}</p>
                                        </div>
                                    </div>
                                }

                                <UserEventActions event={eventDetails?.event}/>
                                <HostEventActions event={eventDetails?.event}/>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    similarRecords.length !== 0 && 
                    <div className='mx-auto max-w-2xl px-4 bg-gray-800 shadow pb-16 sm:px-6 lg:max-w-7xl lg:pb-5 mb-10 rounded-[20px]'>
                        <RowPost data={similarRecords} title={"People Also Searched for"}/>
                    </div>
                }
            </div>
            <ToastContainer/>
        </div>
    </>
  )
}

export default EventDetails