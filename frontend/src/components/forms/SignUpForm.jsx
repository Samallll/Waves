import React, { useState } from 'react'
import logo from '../../assets/square-logo.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { generateOtp } from '../../features/otpSlice';

function SignUpForm() {

    const loginURI = import.meta.env.VITE_LOGIN_URI;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userRegisterData,setUserRegisterData] = useState({
        fullName : "",
        email : "",
        password : ""
    });

    const [error,setError] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();
        if(validateFormData(userRegisterData)){
            dispatch(generateOtp())
            navigate("/otp");
        }   
    }

    function validateFormData(userRegisterData) {

        if (!userRegisterData.fullName.trim()) {
            setError("Please enter your full name");
            return false;
        }
        if (!userRegisterData.email.trim()) {
            setError("Please enter your email address");
            return false;
        }
        if (!userRegisterData.password.trim()) {
            setError("Please enter a password");
            return false;
        }
        if (userRegisterData.password.length < 8) {
            setError("Password must be at least 8 characters long");
            return false;
        }
    
        // fetch('/api/check-email-availability', {
        // method: 'POST',
        // body: JSON.stringify({ email }),
        // })
        // .then(response => response.json())
        // .then(data => {
        //     if (!data.available) {
        //         setError("Email is already taken.");
        //         return false;
        //     }
        // })
        // .catch(()=>{
        //     setError("Error checking email availability");
        //     return false;
        // });

        return true;
    }

    const handleChange = (e) =>(
        setUserRegisterData(
            {
                ...userRegisterData, 
                [e.target.name]: e.target.value     
            }
        )
    );


  return (
    <section className="bg-white">
        <div className="flex flex-col items-center justify-center px-6 py-6 mx-auto md:h-screen lg:py-0">
            <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-800 ">
                <img className="w-16 h-18 mr-2 rounded-xl" src={logo} alt="logo"/>
                CrowdCraft      
            </Link>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create account
                    </h1>
                    { error && <>
                        <h6 className='text-white bg-red-700 py-2 text-center rounded'>{error}</h6>
                    </>}
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                            <input type="text" 
                                name="fullName" 
                                id="fullName" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                required=""
                                value={userRegisterData.fullName}
                                onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" 
                            name="email" 
                            id="email" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="name@company.com" 
                            required=""
                            value={userRegisterData.email}
                            onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" 
                            name="password" 
                            id="password" 
                            placeholder="••••••••" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            required=""
                            value={userRegisterData.password}
                            onChange={handleChange}/>
                        </div>
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send OTP</button>
                        <p className="text-sm font-light text-white dark:text-white">
                            Already have an account? <a href={loginURI} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}

export default SignUpForm