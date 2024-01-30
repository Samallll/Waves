import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { loggedUserUpdate } from '../../utils/authMethods';
import { updateLoggedUser } from '../../features/authSlice';

function EditUserProfile() {

    const loggedUser = useSelector(state=>state.auth.loggedUser)
    const dispatch = useDispatch();
    const registerURI = import.meta.env.VITE_REGISTRATION_SERVICE_BASE_URI;    

    const [formData,setFormData] = useState({
        fullName:loggedUser.fullName,
        emailId:loggedUser.emailId,
        phoneNumber:loggedUser.phoneNumber,
        userId:loggedUser.userId,
        isLocked:loggedUser.isLocked,
        role:loggedUser.role ,
        bankId:loggedUser.bankId 
    })

    const [error,setError] = useState("");

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        checkEmailAvailability();
    }

    async function checkEmailAvailability(){

        await fetch(`${registerURI}/emailCheck?email=${encodeURIComponent(formData.emailId)}`)
        .then((response) => {
            if (response.ok) {
              response.text().then((existingEmailId) => {
                if(existingEmailId === "" || existingEmailId == formData.emailId){
                    loggedUserUpdate(formData);
                    dispatch(updateLoggedUser(formData))
                }
                else{
                    setError("Email Id exists")
                }
              });
            } else {
              setError("Email check failed, Please try again later");
            }
          })
        .catch(() => {
            setError("Email check failed, Please try again later");
        })
    }

  return (
    <section className="py-10 bg-gray-800 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-5xl mx-auto">
              
                <div className="overflow-hidden bg-gray-100 rounded-xl">
                    <div className="px-6 py-12 sm:p-10">
                        <h3 className="text-3xl font-semibold text-center text-gray-900 mb-4">Edit Detaiils</h3>
                        { error && <h4 className='font-bold text-white bg-red-600 text-center my-4 mx-5 p-3 rounded border'>{error}</h4>}
                        <form onSubmit={handleSubmit}> 
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                                <div>
                                    <label htmlFor="" className="text font-medium text-gray-900 ms-3"> Full Name :</label>
                                    <div className="mt-2.5 relative">
                                        <input type="text" 
                                        name="fullName" 
                                        value={formData.fullName}
                                        onChange={onChange}
                                        id="fullName" 
                                        placeholder="Enter your full name" className="text block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900 ms-3"> Email address :</label>
                                    <div className="mt-2.5 relative">
                                        <input type="email" 
                                        name="email" 
                                        id="email" 
                                        value={formData.emailId}
                                        onChange={onChange}
                                        className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900 ms-3"> Phone number </label>
                                    <div className="mt-2.5 relative">
                                        <input type="tel" name="phoneNumber" id="phoneNumber" 
                                        value={formData.phoneNumber ? formData.phoneNumber : ""}
                                        onChange={onChange}
                                        className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                                    </div>
                                </div>

                                <div className='flex justify-end items-center'>
                                    <Link className='text-blue-700 text-underlined' to={'/forgot-password'}>Change Password ?</Link>
                                </div>

                                <div className="sm:col-span-1">
                                    <button type="submit" className="inline-flex items-center justify-center w-auto h-auto px-5 py-3 mt-2 text-sm font-semibold text-white bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">
                                    Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default EditUserProfile