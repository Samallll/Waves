import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/square-logo.jpg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ConfirmPasswordForm() {

    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [error,setError] = useState("")
    const navigate = useNavigate();

    const registerUri = import.meta.env.VITE_REGISTRATION_SERVICE_BASE_URI;

    const handleSubmit = (e) => {
        
        e.preventDefault();
        if (!password.trim()) {
            setError("Please enter a password");
            return;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }
        if (!confirmPassword.trim()) {
            setError("Please confirm your password!");
            return;
        }
        if (password !== confirmPassword) {
            setError("Password doesn't match");
            return;
        }

        const email = localStorage.getItem("registeredEmail");
        
        const url = `${registerUri}/forgot-password`; 
        const userFormData = { 
            emailId:email,
            password:password
         };

        const response = fetch(url, {
            method: "POST",
            body: JSON.stringify(userFormData),
            headers: { "Content-Type": "application/json" },
        });

        response.then(
            () => {
                localStorage.removeItem("registeredEmail");
                navigate("/");
            }
          ).catch((error) => {
            console.error("Network error:", error);
            setError("An error occurred. Please try again later.");
          });

    }
  
    return (
    <section className="bg-white">
        <div className="flex flex-col items-center justify-center px-6 py-6 mx-auto md:my-20">
            <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-black">
                <img className="w-16 h-18 mr-2 rounded-xl" src={logo} alt="logo"/>
                CrowdCraft      
            </Link>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-white" >
                        Confirm Password
                    </h1>
                    { error && <>
                        <h6 className='text-white bg-red-700 py-2 text-center rounded'>{error}</h6>
                    </>}
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <p className="block text-center my-4 text-sm font-medium text-gray-900 dark:text-white">Enter your new password and confirm it</p>
                            <input type="password" 
                                placeholder='New Password'
                                name="password" 
                                id="password" 
                                value = {password} 
                                onChange={(e)=>setPassword(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                            <input type="password" 
                                placeholder='Confirm New Password'
                                name="confirmPassword" 
                                id="confirmPassword" 
                                value = {confirmPassword} 
                                onChange={(e)=>setConfirmPassword(e.target.value)}
                                className="bg-gray-50 mt-4 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                        </div>
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 hover:ring-4 hover:outline-none hover:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update Password</button>
                        <Link to='/' type="button" className="w-full text-white bg-primary-600 hover:bg-primary-700 hover:ring-4 hover:outline-none hover:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ConfirmPasswordForm