import React from 'react'
import { convertToNormalTime,dateConverter } from '../../utils/converter'

function JobPostWithEvent({jobPost,event}) {
  return (
    <>
        <div className="border shadow-xl border-gray-200 rounded-[20px]">
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-3/5 p-6 bg-blue-50 rounded-lg shadow-md">
                    <h2 className="text-xl md:text-2xl text-center font-bold mb-4">Job Post Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="font-semibold">Job Name:</label>
                            <p>{jobPost?.jobName}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Skills Required:</label>
                            <p>{jobPost?.skillsRequired}</p>
                        </div>
                        <div className="col-span-1 md:col-span-2 flex flex-col">
                            <label className="font-semibold">Job Description:</label>
                            <p className="whitespace-pre-wrap">{jobPost?.jobDescription}</p>
                        </div>
                        <div className="col-span-1 md:col-span-2 flex flex-col">
                            <label className="font-semibold">Terms and Conditions:</label>
                            <p className="whitespace-pre-wrap">{jobPost?.termsAndConditions}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Open Positions:</label>
                            <p>{jobPost?.openPositions}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Salary:</label>
                            <p>{jobPost?.salary} Rs</p>
                        </div>
                    </div>
                </div>

                <div className="w-px bg-gray-300" />

                <div className="w-full md:w-2/5 bg-gray-600 rounded-r-[20px] text-white p-6">
                    <h2 className="text-2xl md:text-3xl text-center font-bold mb-4">Event Details</h2>
                    <div className="flex flex-col space-y-2 px-4 md:px-10">
                        <div className="flex justify-between">
                            <div>
                                <label className="font-semibold">Event Name:</label>
                                <p>{event?.eventName}</p>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <label className="font-semibold">Event Date:</label>
                                <p>{dateConverter(event?.eventDate)}</p>
                            </div>
                            <div>
                                <label className="font-semibold">Event Time:</label>
                                <p className='text-end'>{convertToNormalTime(event?.eventTime)}</p>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <label className="font-semibold">Event Status:</label>
                                <p>{event?.eventStatus}</p>
                            </div>
                            <div>
                                <label className="font-semibold">Content Type:</label>
                                <p className='text-end'>{event?.contentType}</p>
                            </div>
                        </div>
                        <div className="max-h-40 overflow-hidden">
                            <label className="font-semibold">Description:</label>
                            <p className="whitespace-pre-wrap line-clamp-3 truncate">{event?.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default JobPostWithEvent