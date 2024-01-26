import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { generateOtp } from '../features/otpSlice';
import { generateRandomOtp, sendEmail } from '../utils/authMethods'

const OtpTimer = ({ expiryTime }) => {

    const [error,setError] = useState("");
    const dispatch = useDispatch();  
    const registeredEmail = localStorage.getItem("registeredEmail");

  const calculateTimeLeft = () => {
    const difference = expiryTime - Date.now();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  const reSendOtp = () => {

    const otp = generateRandomOtp()
    dispatch(generateOtp(otp))
    const message = "Here is your otp: " + otp;
    const subject = "OTP Verification - CrowdCraft.com"
    sendEmail(registeredEmail,subject,message);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const { minutes, seconds } = timeLeft;

  return (
    <div className=''>
      {minutes > 0 || seconds > 0 ? (
        <p className='text-white bg-yellow-600 py-2 text-center rounded'>
          Time remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds} seconds
        </p>
      ) : (
        <>
            <p className='text-white bg-red-700 py-2 text-center rounded'>Time's up!</p>
            <button className='w-full mt-3 text-white bg-green-600 py-2 text-center rounded' onClick={reSendOtp}>Resend Otp</button>
        </>
      )}
    </div>
  );
};

export default OtpTimer;
