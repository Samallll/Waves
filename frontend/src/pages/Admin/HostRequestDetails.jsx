import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Paper } from '@mui/material';

function HostRequestDetails() {

    const {hostRequestId} = useParams();
    const [requestId,setRequestId] = useState("");
    const [hostRequestDetails,setHostRequestDetails] = useState();
    const [userDetails,setUserDetails] = useState();

    const userServiceURI = import.meta.env.VITE_USER_SERVICE_BASE_URI;
    const hostServiceURI = import.meta.env.VITE_HOST_SERVICE_BASE_URI;

    useEffect(() => {

        setRequestId(hostRequestId)
        fetch(`${hostServiceURI}/host-request/${hostRequestId}`)
            .then((response) => response.json())
            .then((data) => {
                // Extract userId from the data
                const { userId } = data;
                console.log(data)
                // Make the second API call using the extracted userId
                fetch(`${userServiceURI}/user/${userId}`)
                .then((response) => response.json())
                .then((userData) => {
                    // Set the user details
                    setUserDetails(userData);
                });
            });
    }, [hostRequestId]);

  return (
    <>
            <div className='mt-20 bg-gray-800 text-white p-20 rounded-[20px] mx-10'>
                <div class="px-4 sm:px-0">
                    <h3 class="text-2xl font-semibold leading-7 text-white">Applicant Information</h3>
                    <p class="mt-1.5 max-w-2xl text-base leading-6 text-gray-300">Personal details and application.</p>
                </div>
                <div class="mt-6 border-t border-gray-100">
                    <dl class="divide-y divide-gray-100">
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt class="text-base font-medium leading-6 text-white">Full name</dt>
                        <dd class="mt-1 text-base leading-6 text-gray-300 sm:col-span-2 sm:mt-0"></dd>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt class="text-base font-medium leading-6 text-white">Designation</dt>
                        <dd class="mt-1 text-base leading-6 text-gray-300 sm:col-span-2 sm:mt-0">$120,000</dd>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt class="text-base font-medium leading-6 text-white">Email address</dt>
                        <dd class="mt-1 text-base leading-6 text-gray-300 sm:col-span-2 sm:mt-0">margotfoster@example.com</dd>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt class="text-base font-medium leading-6 text-white">Contact Number</dt>
                        <dd class="mt-1 text-base leading-6 text-gray-300 sm:col-span-2 sm:mt-0">Backend Developer</dd>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt class="text-base font-medium leading-6 text-white">About</dt>
                        <dd class="mt-1 text-base leading-6 text-gray-300 sm:col-span-2 sm:mt-0">Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.</dd>
                    </div>
                    </dl>
                </div>
            </div>

    </>
  )
}

export default HostRequestDetails