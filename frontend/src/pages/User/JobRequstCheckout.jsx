import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axiosHelper from '../../utils/axiosHelper';
import JobPostWithEvent from '../../components/job/JobPostWithEvent';
import JobRequestDetails from '../../components/job/JobRequestDetails';
import RejectionModal from '../../components/job/RejectionModal';

function JobRequestCheckout() {

    const [jobPost,setJobPost] = useState();
    const { jobPostId, jobRequestId } = useParams();
    const [jobRequest,setJobRequest] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const eventServiceURI = import.meta.env.VITE_EVENT_SERVICE_BASE_URI

    useEffect(()=>{
        fetchJobRequestDetails();
        fetchJobPostDetails();
    },[jobRequestId])

    const fetchJobRequestDetails = async () => {

        try{
            const response = await axiosHelper.get(`${eventServiceURI}/job-request/${jobRequestId}`)
            const data = response.data;
            setJobRequest(data)
        }
        catch(error){
            console.log(error)
        }
    }
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

    const handleRejectionSubmit = async (reason) => {
        setIsModalOpen(false);
        try {
            const response = await axiosHelper.post(`${eventServiceURI}/job-request/reject/${jobRequest?.jobRequestId}`, { reason });
            setJobRequest(response.data)
        } catch (error) {
            console.error('Error rejecting job request:', error);
        }
        navigate(`/user/job-post/${jobPostId}/job-request/${jobRequestId}`)
    };
    
    const approveRequest = async () => {

        try {
            const response = await axiosHelper.get(`${eventServiceURI}/job-request/approve/${jobRequestId}`);
            const data = response.data;
            console.log(data);
            if (response.status === 200) { 
                navigate(`/host/job-post/${jobPostId}`); 
            }
        } catch (error) {
            console.error(error);
        }
    };

  return (
    <>
        <div className='mx-20 mt-28 '>
            <JobPostWithEvent event={jobPost?.event} jobPost={jobPost}/>
        </div>

        <div className='flex justify-center items-center my-10 gap-x-5'>
            <JobRequestDetails jobRequest={jobRequest}/>
            {
                jobRequest?.jobRequestStatus === "PENDING" &&
                <div className='flex flex-col gap-y-5'>
                    <button
                        type="submit"
                        className="px-4 py-2 mr-2 bg-green-600 text-white rounded-md focus:outline-blue-300 focus:shadow-outline"
                        onClick={approveRequest}
                    >
                        Approve Request
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 mr-2 bg-red-500 text-white rounded-md focus:outline-none focus:shadow-outline"
                    >
                        Reject Request
                    </button>
                </div>
            }
        </div>
        <RejectionModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleRejectionSubmit}
        />
    </>
  )
}

export default JobRequestCheckout