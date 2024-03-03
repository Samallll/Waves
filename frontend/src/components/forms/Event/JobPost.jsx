import React,{useState,useEffect} from 'react'
import { updateJobPost } from '../../../features/eventSlice';
import { useDispatch,useSelector } from 'react-redux';

function JobPost() {

  const dispatch = useDispatch();
  const loggedUser = useSelector(state=>state.auth.loggedUser);
  const jobPost = useSelector(state => state.event.jobPost) || {
    jobPostId:jobPost?.jobPostId ,
    jobName: "",
    skillsRequired: "",
    jobDescription: "",
    termsAndConditions: "",
    salary: "",
    openPositions: "",
    postedByUserId: loggedUser.userId,
    isActive:jobPost?.isActive,
    organizers:jobPost?.organizers
  };
  
    const handleChange = (e) => {
    
      const updatedJobPost = {
        ...jobPost,
        postedByUserId:loggedUser?.userId,
        [e.target.name]: e.target.value,
      };
      dispatch(updateJobPost(updatedJobPost));
    };

  return (
    <>
        <div className="space-y-12">
            <div className="mt-8 border-b border-gray-900/10 pb-12">
            <h2 className="text-lg font-semibold leading-7 text-gray-900">Job Post Details</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">You can hire a team for organizing the event. Note: Salary for free events are optional.</p>
                <input type='hidden' value={jobPost?.jobPostId}/>
                <input type='hidden' name='postedByUserId' value={loggedUser?.userId}/>
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="jobName" className="block text-sm font-medium leading-6 text-gray-900">
                    Job Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="jobName"
                      id="jobName"
                      onChange={(e)=>handleChange(e)}
                      value={jobPost?.jobName}
                      autoComplete="given-name"
                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="skillsRequired" className="block text-sm font-medium leading-6 text-gray-900">
                    Skills Required
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="skillsRequired"
                      id="skillsRequired"
                      value={jobPost?.skillsRequired}
                      onChange={(e)=>handleChange(e)}
                      autoComplete="skillsRequired"
                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="jopDescription" className="block text-sm font-medium leading-6 text-gray-900">
                    Job Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      type="text"
                      name="jobDescription"
                      id="jobDescription"
                      value={jobPost?.jobDescription}
                      onChange={(e)=>handleChange(e)}
                      autoComplete="jobDescription"
                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="termsAndConditions" className="block text-sm font-medium leading-6 text-gray-900">
                    Terms and Conditions
                  </label>
                  <div className="mt-2">
                    <textarea
                      type="text"
                      name="termsAndConditions"
                      id="termsAndConditions"
                      value={jobPost?.termsAndConditions}
                      onChange={(e)=>handleChange(e)}
                      autoComplete="termsAndConditions"
                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <label htmlFor="salary" className="block text-sm font-medium leading-6 text-gray-900">
                    Salary
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="salary"
                      id="salary"
                      autoComplete="salary"
                      value={jobPost?.salary}
                      onChange={(e)=>handleChange(e)}
                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <label htmlFor="openPositions" className="block text-sm font-medium leading-6 text-gray-900">
                    Open Positions
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="openPositions"
                      id="openPositions"
                      autoComplete="openPositions"
                      value={jobPost?.openPositions}
                      onChange={(e)=>handleChange(e)}
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

export default JobPost