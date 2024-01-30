import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { uniqueHostRequest } from '../../utils/authMethods';

function HostRegistration() {

    const [error,setError] = useState("");
    const [showToast,setShowToast] = useState(false);
    const [isModalOpen,setIsModalOpen] = useState(false);
    const initialState = {
        aadharNumber:"",
        designation:"",
        about:"",
        userId:"",
        emailId:"",
        bankId:""
    }
    const [hostRequest,setHostRequest] = useState(initialState)
    
    const loggedUser = useSelector(state=>state.auth.loggedUser)

    const hostServiceURI = import.meta.env.VITE_HOST_SERVICE_BASE_URI

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const aadhaarRegex = /^\d{12}$/;

        if(hostRequest.designation === ""){
            setError("Please provide your designation")
            return;
        }
        if (!aadhaarRegex.test(hostRequest.aadharNumber)) {
            setError("Invalid Aadhar Number")
            return;
        }
        if(hostRequest.about.trim()<10){
            setError("About should be more than 10 characters")
            return;
        }
        //check does the user have an valid bank account or not?
        if(loggedUser.bankId === null){
            setError("Please update your bank details in the profile section")
            return;
        }
        //does user have a contact number or not?
        if(loggedUser.phoneNumber === null){
            setError("Please update your contact nubmer in the profile section")
            return;
        }

        const response = uniqueHostRequest(loggedUser.userId,"PENDING")
        response.then(response=>{
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json();
            } else {
                return response.text();
            }
         })
        .then(data => {
            if(data === ""){
                openModal();
                setError("");
            }
            else{
                setError("You have a request waiting for approval , please raise again if it got rejected")
                setHostRequest(initialState)
            }
        })
        .catch(error => {
            console.log(error);
        })
        setError("");
        
    }

    const onChange = (e) => {

        setHostRequest({
            ...hostRequest,
            [e.target.name]:e.target.value
        })
    }

    const onAccept = async () => {

        const url = `${hostServiceURI}/host-request/register`

        hostRequest.emailId = loggedUser.emailId;
        hostRequest.bankId = loggedUser.bankId;
        hostRequest.userId = loggedUser.userId;

        try{
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(hostRequest),
                headers: { "Content-Type": "application/json" },
            });
            if(response.ok){
                const hostDetails = await response.json();
                console.log(hostDetails) ;
            }
        }
        catch(error){
            console.error('Error fetching logged user:', error);
            throw error;
        }
        closeModal();

        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);

        setHostRequest(initialState)
        
    }
    

  return (

    <section className="py-10 bg-gray-600 sm:py-24 lg:py-24">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:items-stretch md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-10">
                <div className="flex flex-col justify-between lg:py-5">
                    <div>
                        <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:leading-tight lg:text-5xl">It’s time to build something exciting!</h2>
                        <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-white">Ready to connect with a new audience? Create unforgettable moments. Host your next event - Sign up now!</p>

                        <img className="relative z-10 max-w-xs mx-auto -mb-16 md:hidden" src="https://cdn.rareblocks.xyz/collection/celebration/images/contact/4/curve-line-mobile.svg" alt="" />

                        <img className="hidden w-full translate-x-24 translate-y-8 md:block" src="https://cdn.rareblocks.xyz/collection/celebration/images/contact/4/curve-line.svg" alt="" />
                    </div>

                    <div className="hidden md:mt-auto md:block">
                        <div className="flex items-center">
                            <svg className="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                />
                            </svg>
                            <svg className="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                />
                            </svg>
                            <svg className="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                />
                            </svg>
                            <svg className="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                />
                            </svg>
                            <svg className="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                />
                            </svg>
                        </div>

                        <blockquote className="mt-6">
                            <p className="text-lg leading-relaxed text-white">You made it so simple. Easy to manage,organize and connect with people. Such a great idea!</p>
                        </blockquote>

                        <div className="flex items-center mt-8">
                            <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/contact/4/avatar.jpg" alt="" />
                            <div className="ml-4">
                                <p className="text-base font-semibold text-white">Shreya Goshal</p>
                                <p className="mt-px text-sm text-gray-400">Musician</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:pl-12">
                    <div className="overflow-hidden bg-white rounded-md">
                        <div className="p-6 sm:p-10">
                            <h3 className="text-3xl font-semibold text-black text-center">Let's begin</h3>
                            <p className="mt-4 text-base text-gray-600">Your details will be validated and approved by the team.</p>
                            {error && <h5 className='text-center text-red-600 mt-2'>{error}</h5>}
                            <form onSubmit={handleSubmit} method="POST" className="mt-4">
                                <div className="space-y-6">
                                    <div>
                                        <label htmlFor="" className="text-base font-medium text-gray-900"> Designation </label>
                                        <div className="mt-2.5 relative">
                                            <input
                                                type="text"
                                                name="designation"
                                                id="designation" 
                                                value={hostRequest.designation} 
                                                onChange={onChange} 
                                                placeholder="Enter your designation"
                                                className="block w-full px-4 py-3 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 caret-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="" className="text-base font-medium text-gray-900"> Aadhar Number </label>
                                        <div className="mt-2.5 relative">
                                            <input
                                                type="text"
                                                name="aadharNumber"
                                                id="aadharNumber" 
                                                value={hostRequest.aadharNumber} 
                                                onChange={onChange} 
                                                placeholder="Enter your aadhar number"
                                                className="block w-full px-4 py-3 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 caret-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="" className="text-base font-medium text-gray-900"> About </label>
                                        <div className="mt-2.5 relative">
                                            <textarea
                                                name="about"
                                                id="about" 
                                                value={hostRequest.about} 
                                                onChange={onChange} 
                                                placeholder="Describe yourself"
                                                className="block w-full px-4 py-3 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md resize-y focus:outline-none focus:ring-blue-500 focus:border-blue-500 caret-blue-500"
                                                rows="4"
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div>
                                        <button type="submit" className="inline-flex items-center justify-center w-full px-3 py-3 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="md:hidden">
                    <div className="flex items-center">
                        <svg className="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            />
                        </svg>
                        <svg className="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            />
                        </svg>
                        <svg className="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            />
                        </svg>
                        <svg className="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            />
                        </svg>
                        <svg className="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            />
                        </svg>
                    </div>

                    <blockquote className="mt-6">
                        <p className="text-lg leading-relaxed text-white">You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change and click save.</p>
                    </blockquote>

                    <div className="flex items-center mt-8">
                        <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/contact/4/avatar.jpg" alt="" />
                        <div className="ml-4">
                            <p className="text-base font-semibold text-white">Jenny Wilson</p>
                            <p className="mt-px text-sm text-gray-400">Product Designer</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {isModalOpen && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 overflow-y-auto sm:mt-8"
        >
          <div className="relative p-4 w-full max-w-2xl overflow-y-auto">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 ">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Terms of Service
                </h3>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5 space-y-4">
                <p className="text-base leading-relaxed text-gray-300">
                    Terms and Conditions for Crowdcraft Host Registration
                </p>  
                <p className="text-base leading-relaxed text-gray-300">  
                    Welcome to Crowdcraft! By signing up as a host, you agree to these Terms and Conditions. Please read them carefully before proceeding.
                </p>
                <p className="text-base leading-relaxed text-gray-300">
                    1. Role and Responsibilities:

                    You can create an account as an attendee or switch to the host role to organize events.
                    As a host, you are solely responsible for your event's logistics, safety, and success. Crowdcraft is a platform facilitating connections, not an event organizer.
                    You can hire organizers through job postings on Crowdcraft, but the responsibility for managing and paying them remains yours.
                </p>
                <p className="text-base leading-relaxed text-gray-300">
                    2. Legal Implications:

                    You are legally bound to pay any agreed-upon compensation to organizers hired through Crowdcraft.
                    You are responsible for complying with all applicable laws and regulations regarding your event.
                </p>
                <p className="text-base leading-relaxed text-gray-300">
                    3. Additional Terms:

                    Please refer to our full Terms of Service and Privacy Policy for further details.
                    By registering as a host on Crowdcraft, you acknowledge and agree to these Terms and Conditions.
                </p>
              </div>
              {/* Modal footer */}
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={onAccept}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  I accept
                </button>
                <button
                  onClick={closeModal}
                  type="button"
                  className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
        )}

        {showToast && <div className="fixed bottom-0 right-0 m-6 p-4 bg-green-500 text-white rounded shadow-lg">
            <h1 className="mb-2 font-medium">Success!</h1>
            <p>Your request has been submitted successfully.</p>
        </div>}

    </section>

  )
}

export default HostRegistration