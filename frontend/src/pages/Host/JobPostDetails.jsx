import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosHelper from '../../utils/axiosHelper'
import JobPostWithEvent from '../../components/job/JobPostWithEvent';
import JobRequestsTable from '../../components/job/JobRequestsTable';

function JobPostDetails() {

    const {jobPostId} = useParams();
    const [jobPost,setJobPost] = useState();
    const eventServiceURI = import.meta.env.VITE_EVENT_SERVICE_BASE_URI

    useEffect(()=>{
        fetchJobPostDetails();
    },[jobPostId])

    const fetchJobPostDetails = async () => {

        try{
            const response = await axiosHelper.get(`${eventServiceURI}/job-post/${jobPostId}`);
            const data = response.data;
            setJobPost(data)
        }
        catch(error){
            console.log(error)
        }
    }
  return (
    <>
        <div className='mt-24 mx-20'>
            <JobPostWithEvent jobPost={jobPost} event={jobPost?.event}/>
        </div>
        <div className='mx-20 mt-15 mb-10'>
            <JobRequestsTable jobPostId={jobPostId}/>
        </div>
    </>
  )
}

export default JobPostDetails