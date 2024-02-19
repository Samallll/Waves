import React, { useState,useEffect } from 'react'
import UserHeader from '../components/headers/UserHeader'
import { Pagination,Button } from '@mui/material'
import ImageComponent from '../components/ImageComponent';
import { dateConverter } from '../utils/converter';
import { Link } from 'react-router-dom';

function Events() {

    const [records,setRecords] = useState([]);
    const [pageSize,setPageSize] = useState(10);
    const [page,setPage] = useState(0);
    const [searchData,setSearchData] = useState("");
    const [totalPages,setTotalPages] = useState(0);
    const [filter, setFilter] = useState({
        genre: [],
        contentTypeValues: [],
        eventStatusValues: [],
        eventModeValues: []
    });
    

    const eventServiceURI = import.meta.env.VITE_EVENT_SERVICE_BASE_URI

    useEffect(()=>{
        fetchEventDetails()
    },[page,pageSize,searchData,filter])

    const handlePageChange = (event, value) => {
        setPage(value - 1);
      };

    const searchChange = (event) => {
    setSearchData(event.target.value);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter(prevFilter => {
            if (prevFilter[name].includes(value)) {
                return {
                    ...prevFilter,
                    [name]: prevFilter[name].filter(item => item !== value)
                };
            } else {
                return {
                    ...prevFilter,
                    [name]: [...prevFilter[name], value]
                };
            }
        });
    };
    

    const fetchEventDetails = async () =>{

        const eventMode = filter.eventModeValues.map(mode => mode.toUpperCase())
        const contentType = filter.contentTypeValues.map(type => type.toUpperCase())
        const eventStatus = filter.eventStatusValues.map(status => status.toUpperCase())
        const removeEventStatus = "EXPIRED"
        try {
            const response = await fetch(`${eventServiceURI}/events?page=${page}&size=${pageSize}&searchQuery=${searchData}&genre=${filter.genre.join(',')}&contentType=${contentType.join(',')}&eventMode=${eventMode.join(',')}&eventStatus=${eventStatus.join(',')}&removeEventStatus=${removeEventStatus}`);
            const data = await response.json();
            setRecords(data.content);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.log(error);
        }        
    }

  return (

        <>
            <UserHeader/>
                    <div className="bg-white">
                            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                                <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Event Listing</h1>

                                    <div className="flex items-center">
                                        <div className="relative inline-block text-left">
                
                                        </div>
                                    </div>
                                </div>

                                <section aria-labelledby="products-heading" className="pb-24 pt-6">

                                    <div className="flex justify-between">

                                        <form className="large:block me-20 ms-10 sm:min-w-[200px]">

                                            <div className="border-b border-gray-200 py-6">
                                                <h3 className="-my-3 flow-root">

                                                    <button type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-0" aria-expanded="false">
                                                    <span className="font-medium text-gray-900">Status</span>
                                                    </button>
                                                </h3>

                                                <div className="pt-6" id="filter-section-0">
                                                    <div className="space-y-4">
                                                        <div className="flex items-center">
                                                            <input id="eventStatus-0" name="eventStatusValues" value="Live" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" onChange={handleFilterChange}/>
                                                            <label htmlFor="eventStatus-0" className="ml-3 text-sm text-gray-600">Live</label>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <input id="eventStatus-1" name="eventStatusValues" value="Organizing" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" onChange={handleFilterChange}/>
                                                            <label htmlFor="eventStatus-1" className="ml-3 text-sm text-gray-600">Organizing</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border-b border-gray-200 py-6">
                                                <h3 className="-my-3 flow-root">

                                                    <button type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-0" aria-expanded="false">
                                                    <span className="font-medium text-gray-900">Genre</span>
                                                    </button>
                                                </h3>

                                                <div className="pt-6" id="filter-section-0">
                                                    <div className="space-y-4">
                                                        <div className="flex items-center">
                                                            <input id="genre-0" name="genre" value="Music" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" onChange={handleFilterChange}/>
                                                            <label htmlFor="genre-0" className="ml-3 text-sm text-gray-600">Music</label>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <input id="genre-1" name="genre" value="Workshop" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" onChange={handleFilterChange}/>
                                                            <label htmlFor="genre-1" className="ml-3 text-sm text-gray-600">Workshop</label>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <input id="genre-2" name="genre" value="Comedy" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" onChange={handleFilterChange}/>
                                                            <label htmlFor="genre-2" className="ml-3 text-sm text-gray-600">Comedy</label>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <input id="genre-3" name="genre" value="Meetup" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" onChange={handleFilterChange}/>
                                                            <label htmlFor="genre-3" className="ml-3 text-sm text-gray-600">Meetup</label>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <input id="genre-4" name="genre" value="Other" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" onChange={handleFilterChange}/>
                                                            <label htmlFor="genre-4" className="ml-3 text-sm text-gray-600">Other</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            

                                            <div className="border-b border-gray-200 py-6">
                                                <h3 className="-my-3 flow-root">

                                                    <button type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-0" aria-expanded="false">
                                                    <span className="font-medium text-gray-900">Content Type</span>
                                                    </button>
                                                </h3>

                                                <div className="pt-6" id="filter-section-0">
                                                    <div className="space-y-4">
                                                        <div className="flex items-center">
                                                            <input id="contentType-0" name="contentTypeValues" value="Free" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" onChange={handleFilterChange}/>
                                                            <label htmlFor="contentType-0" className="ml-3 text-sm text-gray-600">Free</label>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <input id="contentType-1" name="contentTypeValues" value="Paid" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" onChange={handleFilterChange}/>
                                                            <label htmlFor="contentType-1" className="ml-3 text-sm text-gray-600">Paid</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                        

                                        <div className="lg:col-span-3">
                                            <section className="py-10 bg-gray-100 sm:py-10 rounded">
                                                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                                                    
                                                        <div className="flex flex-wrap items-center mb-5 mx-20">
                                                            <input
                                                            type="search"
                                                            className=" m-0 -mr-0.5 block min-w-0 flex-auto rounded-l border border-solid border-gray-600 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-gray-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-gray-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
                                                            placeholder="Search by Event Name"
                                                            aria-label="Search"
                                                            value={searchData} 
                                                            onChange={searchChange}
                                                            aria-describedby="button-addon3" />
                                                        </div>

                                                    <div className="grid max-w-md grid-cols-1 gap-6 mx-auto lg:grid-cols-1 lg:max-w-full">

                                                        {records && records.map((record, index) => (
                                                            <div key={index} className="overflow-hidden bg-white rounded shadow">
                                                            <div className="px-5 sm:flex mx-auto">
                                                                <Link to={`/user/event-details/${record.eventId}`} className="relative my-auto flex-shrink-0 w-72">
                                                                    <ImageComponent
                                                                        alt={"Event Image"}
                                                                        src={record.eventPictureId ? `${eventServiceURI}/get-picture/${record.eventPictureId}` : null}
                                                                        className="object-cover w-full h-full"
                                                                    />
                                                                    {record.contentType === 'PAID' && (
                                                                        <div className="absolute top-4 left-4">
                                                                            <span className="px-4 py-2 text-xs font-semibold tracking-widest text-amber-700 uppercase bg-yellow-300 rounded-full">
                                                                                {record.contentType}
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                </Link>
                                                                <div className='sm:p-5 sm:ms-5'>
                                                                    <span className="block mt-6 text-sm font-semibold tracking-widest text-gray-500 uppercase">
                                                                        {dateConverter(record.eventDate)}
                                                                    </span>
                                                                    <p className="mt-5 text-2xl font-semibold">
                                                                        <Link to={`/user/event-details/${record.eventId}`} title="" className="text-black">
                                                                            {record.eventName}
                                                                        </Link>
                                                                    </p>
                                                                    <p className="mt-4 text-base text-gray-600 max-w-xl line-clamp-4">
                                                                        {record.description}
                                                                    </p>
                                                                    <Link to={`/user/event-details/${record.eventId}`} title="" className="inline-flex items-center justify-center pb-5 mt-5 text-base font-semibold text-blue-600 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600">
                                                                        View More
                                                                        <svg className="w-5 h-5 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                                        </svg>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        
                                                        
                                                        ))}
                                                        
                                                    </div>

                                                    <div className='flex justify-center mt-10'>
                                                    <Pagination
                                                        count={totalPages}
                                                        page={page + 1}
                                                        onChange={handlePageChange}
                                                        variant="outlined"
                                                        shape="rounded"
                                                    />
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                        


                                    </div>
                                </section>
                            </main>                       
                    </div>




                                    
        </>
  )
}

export default Events