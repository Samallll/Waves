import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axiosHelper from '../../utils/axiosHelper';
import JobPostWithEvent from '../../components/job/JobPostWithEvent';
import JobRequestForm from '../../components/forms/Job/JobRequestForm';

function OrganizeCheckout() {

    const [jobPost,setJobPost] = useState();
    const {eventId} = useParams();
    const eventServiceURI = import.meta.env.VITE_EVENT_SERVICE_BASE_URI

    useEffect(()=>{
        fetchJobPostDetails();
    },[eventId])

    const fetchJobPostDetails = async () => {

        try{
            const response = await axiosHelper.get(`${eventServiceURI}/job-post/by-eventId/${eventId}`)
            const data = response.data;
            setJobPost(data)
        }
        catch(error){
            console.log(error)
        }
    }
  return (
    <>
        <div className='mx-20 mt-28 '>
            <JobPostWithEvent event={jobPost?.event} jobPost={jobPost}/>
        </div>
        
        <div>
            <JobRequestForm jobPostId={jobPost?.jobPostId}/>
        </div>
    </>
  )
}

export default OrganizeCheckout