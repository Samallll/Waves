import React,{useState} from 'react'

function JobRequestDetails({jobRequest}) {

  return (
    <>
        <div className="w-full md:w-3/5 p-6 bg-blue-300 rounded-lg shadow-md">
            <h2 className="text-xl md:text-2xl text-center font-bold mb-4">Job Request Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="font-semibold">Job Request Id: {jobRequest?.jobRequestId}</label>
                </div>
                <div>
                    <label className="font-semibold">Email Id:</label>
                    <p>{jobRequest?.emailId}</p>
                </div>
                <div>
                    <label className="font-semibold">Full Name:</label>
                    <p>{jobRequest?.fullName}</p>
                </div>
                <div>
                    <label className="font-semibold">Designation:</label>
                    <p>{jobRequest?.designation}</p>
                </div>
                <div>
                    <label className="font-semibold">About Requester:</label>
                    <p className="whitespace-pre-wrap">{jobRequest?.about}</p>
                </div>
                <div>
                    <label className="font-semibold">Request Status:</label>
                    <p className="whitespace-pre-wrap font-bold text-gray-900">{jobRequest?.jobRequestStatus}</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default JobRequestDetails