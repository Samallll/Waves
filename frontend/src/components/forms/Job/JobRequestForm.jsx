import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { validateJobRequest } from '../../../utils/validations';
import ToastContainer from '../../ToastContainer';
import axiosHelper from '../../../utils/axiosHelper';
import useToastService from '../../../services/useToastService'

function JobRequestForm({jobPostId}) {
    const [showModal, setShowModal] = useState(false);
    const loggedUser = useSelector(state=>state.auth.loggedUser)
    const eventServiceURI = import.meta.env.VITE_EVENT_SERVICE_BASE_URI
    const [error,setError] = useState("");
    const {showToast} = useToastService();
    const [formData, setFormData] = useState({
        about: '',
        designation: '',
        dietaryPreference: 'Vegetarian',
        aadharNumber: '',
        userId:loggedUser.userId,
        bankId:loggedUser.bankId,
        jobPostId:jobPostId,
        emailId:loggedUser.emailId,
        fullName:loggedUser.fullName
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => { 
        e.preventDefault();
        formData.jobPostId=jobPostId
        formData.emailId=loggedUser?.emailId
        formData.fullName=loggedUser?.fullName
        const validateJobRequestResult = validateJobRequest(formData);
        if(validateJobRequestResult !== ""){
            setError(validateJobRequestResult);
            return;
        }
        try{
            const response = await axiosHelper.post(`${eventServiceURI}/job-request/register/${jobPostId}`,formData)
            const data = response.data;
            console.log(data)
            setFormData({
                about: '',
                designation: '',
                dietaryPreference: 'Vegetarian',
                aadharNumber: '',
                userId:loggedUser.userId,
                bankId:loggedUser.bankId,
                jobPostId:jobPostId
            })
            showToast('Job Request submitted successfully!', { type: 'success' })
        }
        catch(error){
            console.log(error)
            showToast('Failed to submit the request!', { type: 'danger' })
        }
        setError("")
        setShowModal(false);
    };

    const handleCancel = () => {
        setError("")
        setShowModal(false);
    };

    return (
        <>
            <div className='mt-10 mb-3 flex justify-center'>
                <button className='bg-green-600 px-4 py-3 text-white rounded hover:bg-green-700 font-medium' onClick={() => setShowModal(true)}>Apply for the Job Role</button>
            </div>
            <ToastContainer/>

            {showModal && (
                <div className="fixed inset-0 flex items-center sm:pt-20 lg:pt-10 justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-gray-800 p-6 rounded-lg w-2/3">
                        <h2 className="text-xl text-white font-medium text-center mb-4 pb-2">Job Request Form</h2>
                        { error && 
                        <>
                            <h6 className='text-white mx-20 bg-red-600 py-2 mb-2 text-center rounded'>{error}</h6>
                        </>}
                        <form onSubmit={handleSubmit} className="max-w-full mx-auto bg-blue-200 shadow-lg rounded px-8 pt-6 pb-8 mt-4">
                            <div className="mb-4">
                                <label htmlFor="about" className="block text-gray-700 text-sm font-medium mb-2">Talk about yourself:</label>
                                <textarea
                                    id="about"
                                    name="about"
                                    value={formData.about}
                                    onChange={handleChange}
                                    required
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-300 focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="designation" className="block text-gray-700 text-sm font-medium mb-2">Designation:</label>
                                <input
                                    type="text"
                                    id="designation"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleChange}
                                    required
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-300 focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="dietaryPreference" className="block text-gray-700 text-sm font-medium mb-2">Dietary Preference:</label>
                                <select
                                    id="dietaryPreference"
                                    name="dietaryPreference"
                                    value={formData.dietaryPreference}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-300 focus:shadow-outline"
                                >
                                    <option value="Vegetarian">Vegetarian</option>
                                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                                </select>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="aadharNumber" className="block text-gray-700 text-sm font-medium mb-2">Aadhar Number:</label>
                                <input
                                    type="text"
                                    id="aadharNumber"
                                    name="aadharNumber"
                                    value={formData.aadharNumber}
                                    onChange={handleChange}
                                    required
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-300 focus:shadow-outline"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-4 py-2 mr-2 bg-green-600 text-white rounded-md focus:outline-blue-300 focus:shadow-outline"
                                >
                                    Apply
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md focus:outline-none focus:shadow-outline"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                        
                    </div>
                </div>
            )}
        </>
    );
}

export default JobRequestForm;
