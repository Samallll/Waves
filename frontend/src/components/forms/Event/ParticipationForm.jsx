import React,{useState} from 'react'
import { useSelector } from 'react-redux';
import useToastService from '../../../services/useToastService';
import {loadStripe} from '@stripe/stripe-js'
import axios from '../../../utils/axiosHelper';
import { useNavigate } from 'react-router-dom';


function ParticipationForm({event}) {

    const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY
    const paymentServiceURI = import.meta.env.VITE_PAYMENT_SERVICE_BASE_URI;
    const stripePromise = loadStripe(stripeKey)
    const navigate = useNavigate();

    const loggedUser = useSelector(state=>state.auth.loggedUser)
    const eventServiceURI = import.meta.env.VITE_EVENT_SERVICE_BASE_URI
    const [error,setError] = useState("");
    const {showToast} = useToastService();
    const [formData, setFormData] = useState({
        about: '',
        designation: '',
        dietaryPreference: 'Vegetarian',
        userId:loggedUser.userId,
        eventId:event?.eventId,
        emailId:loggedUser?.emailId,
        fullName:loggedUser?.fullName
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
        formData.eventId=event.eventId,
        formData.emailId=loggedUser?.emailId,
        formData.fullName=loggedUser?.fullName
        if (formData.about.length <=  10) {
            setError( "About should be more than  10 characters" )
            return;
        }
        if (formData.designation.length <=  5) {
            setError("Designation should be more than  5 characters")
            return;
        }
        if (formData.dietaryPreference !== 'Vegetarian' && formData.dietaryPreference !== 'Non-Vegetarian') {
            setError("Dietary Preference should be either 'Vegetarian' or 'Non-Vegetarian'")
            return;
        }
        if(event?.ticketPrice >0){
            try {
                const stripe = await stripePromise;
                const amount = event?.ticketPrice 
                const eventId = event?.eventId
                const response = await axios.post(`${paymentServiceURI}/create-checkout-session`, {
                amount: amount,
                eventId: eventId
                });
                localStorage.setItem("participationData",JSON.stringify(formData));
                const sessionId  = response.data; 
                if(!sessionId){
                    showToast("Payment Failed. Please try again later!",{type:'danger'})
                }
                const { error } = await stripe.redirectToCheckout({
                sessionId: sessionId
                });
            }
            catch(error){
                console.log(error)
            }
        }
        if(event?.ticketPrice<1){
                try{
                  const response = await axios.post(`${eventServiceURI}/register-participant`,formData)
                  const data = response.data;
                  console.log(data)
                  navigate(`/user/event-details/${event?.eventId}`);
                }
                catch(error){
                  console.log(error)
                }
        }

    };

    const handleCancel = () => {
        setError("")
        navigate(`/user/event-details/${event?.eventId}`);
    };
    

    return (
            <div className="bg-gray-800 p-6 rounded-lg w-full">
                <h2 className="text-xl text-white font-medium text-start mb-4 pb-2">Participation Form</h2>
                {error && (
                    <div className='text-white mx-20 bg-red-600 py-2 mb-2 text-center rounded'>
                        {error}
                    </div>
                )}
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
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-4 py-2 mr-2 bg-green-600 text-white hover:bg-green-700 rounded-md focus:outline-blue-300 focus:shadow-outline"
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 focus:outline-none focus:shadow-outline"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
    );
}

export default ParticipationForm