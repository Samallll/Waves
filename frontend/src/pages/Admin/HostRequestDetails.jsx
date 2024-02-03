import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function HostRequestDetails() {

    const {hostRequestId} = useParams();
    const [requestId,setRequestId] = useState("");
    const [hostRequestDetails,setHostRequestDetails] = useState();
    const [userDetails,setUserDetails] = useState();

    const userServiceURI = import.meta.env.VITE_USER_SERVICE_BASE_URI;
    const hostServiceURI = import.meta.env.VITE_HOST_SERVICE_BASE_URI;

    useEffect(() => {

        setRequestId(hostRequestId)
        fetch(`${hostServiceURI}/host-request/details/${hostRequestId}`)
            .then((response) => response.json())
            .then((data) => {

                setHostRequestDetails(data)  

                const { userId } = data;

                fetch(`${userServiceURI}/${userId}`)
                .then((response) => response.json())
                .then((userData) => {

                    setUserDetails(userData);
                });
            });
    }, [hostRequestId]);

    const approveRequest = () => {

        fetch(`${hostServiceURI}/host-request/approve/${hostRequestDetails.hostRequestId}`)
        .then(response => response.text())
        .then(data => console.log(data))
    }

  return (
    <>
            <div className='mt-20 bg-gray-800 text-white p-20 rounded-[20px] mx-10'>
                <div className="px-4 sm:px-0">
                    <h3 className="text-2xl font-semibold leading-7 text-white">Applicant Information</h3>
                    <p className="mt-1.5 max-w-2xl text-base leading-6 text-gray-300">Personal details and application.</p>
                </div>
                <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-base font-medium leading-6 text-white">Full name</dt>
                        <dd className="mt-1 text-base leading-6 text-gray-300 sm:col-span-2 sm:mt-0">{userDetails ? userDetails.fullName : ""}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-base font-medium leading-6 text-white">Designation</dt>
                        <dd className="mt-1 text-base leading-6 text-gray-300 sm:col-span-2 sm:mt-0">{hostRequestDetails ? hostRequestDetails.designation : ""}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-base font-medium leading-6 text-white">Email address</dt>
                        <dd className="mt-1 text-base leading-6 text-gray-300 sm:col-span-2 sm:mt-0">{userDetails ? userDetails.emailId : ""}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-base font-medium leading-6 text-white">Contact Number</dt>
                        <dd className="mt-1 text-base leading-6 text-gray-300 sm:col-span-2 sm:mt-0">{userDetails ? userDetails.phoneNumber : ""}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-base font-medium leading-6 text-white">About</dt>
                        <dd className="mt-1 text-base leading-6 text-gray-300 sm:col-span-2 sm:mt-0">{hostRequestDetails ? hostRequestDetails.about : ""}</dd>
                    </div>
                    <button onClick={approveRequest} className="mt-4 relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group">
                        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-600 rounded-full group-hover:w-56 group-hover:h-56"></span>
                        <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                        <span className="relative">Approve</span>
                    </button>
                    <button className="mt-4 ms-4 relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group">
                        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-red-600 rounded-full group-hover:w-56 group-hover:h-56"></span>
                        <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                        <span className="relative">Reject</span>
                    </button>
                    </dl>
                </div>
            </div>

    </>
  )
}

export default HostRequestDetails