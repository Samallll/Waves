import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import useToastService from '../services/useToastService'
import axiosHelper from '../utils/axiosHelper'

function PaymentSucces() {

  const eventServiceURI = import.meta.env.VITE_EVENT_SERVICE_BASE_URI;
  const paymentServiceURI = import.meta.env.VITE_PAYMENT_SERVICE_BASE_URI;
  
  const navigate = useNavigate();
  const { showToast } = useToastService();
  
  const participationData = JSON.parse(localStorage.getItem('participationData'));
  
  const urlParams = new URLSearchParams(window.location.search);
  const sessionIdFromUrl = urlParams.get('session_id');
  
  useEffect(() => {
      if (sessionIdFromUrl) {
          showToast('Payment completed successfully!', { type: 'success' });
          eventParticipation(participationData);
          localStorage.removeItem('participationData');
          navigate(`/user/event-details/${participationData?.eventId}`);
      } else if (participationData) { 
        showToast("Payment Failed. Please try again later", { type: "danger" });
      }
  }, []);

    const eventParticipation = async (participantDto) => {

        try{
          const response = await axiosHelper.post(`${eventServiceURI}/register-participant`,participantDto)
          const data = response.data;
          console.log(data)
        }
        catch(error){
          console.log(error)
        }
    }

  return (
    null
  )
}

export default PaymentSucces