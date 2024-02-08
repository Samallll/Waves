import React, { useState,useEffect } from 'react'

function Location({onUpdate}) {

    const initialLocation = {
        eventId:"",
        streetAddress:"",
        country:"",
        state:"",
        city:"",
        zipCode:"",
    }

    const [location,setLocation] = useState(initialLocation);

    const handleChange = (e) => {
        setLocation(
            { 
                ...location, 
                [e.target.name]: e.target.value 
            });
    };

    useEffect(() => {
        onUpdate(location);
      }, [location]);

    return (
        <>
            <div className="space-y-12">
                <div className="mt-8 border-b border-gray-900/10 pb-12">
                    <h2 className="text-lg font-semibold leading-7 text-gray-900">{location?.eventId === "" ? "":"Edit "}Location Details</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">The location details about the place of event hosting.</p>
                    <input type='hidden' value={location.eventId}/>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">

                    <div className="col-span-4">
                        <label htmlFor="streetAddress" className="block text-sm font-medium leading-6 text-gray-900">
                        Street address
                        </label>
                        <div className="mt-2">
                        <textarea
                            type="text"
                            name="streetAddress"
                            id="streetAddress"
                            value={location.streetAddress} 
                            onChange={(e)=>handleChange(e)}
                            autoComplete="streetAddress"
                            className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                        Country
                        </label>
                        <div className="mt-2">
                        <select
                            id="country"
                            name="country"
                            autoComplete="country"
                            onChange={(e)=>handleChange(e)}
                            className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option>India</option>
                            <option>United States</option>
                            <option>Canada</option>
                            <option>Mexico</option>
                        </select>
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                        City
                        </label>
                        <div className="mt-2">
                        <input
                            type="text"
                            name="city"
                            id="city"
                            onChange={(e)=>handleChange(e)}
                            autoComplete="address-level2"
                            className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                        State / Province
                        </label>
                        <div className="mt-2">
                        <input
                            type="text"
                            name="state"
                            id="state"
                            onChange={(e)=>handleChange(e)}
                            autoComplete="state"
                            className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="zipCode" className="block text-sm font-medium leading-6 text-gray-900">
                        ZIP / Postal code
                        </label>
                        <div className="mt-2">
                        <input
                            type="text"
                            name="zipCode"
                            id="zipCode"
                            onChange={(e)=>handleChange(e)}
                            autoComplete="zipCode"
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

export default Location