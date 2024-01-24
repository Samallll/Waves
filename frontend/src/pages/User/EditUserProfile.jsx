import React from 'react'
import { Link } from 'react-router-dom'

function EditUserProfile() {

  return (
    <section className="py-10 bg-gray-800 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-5xl mx-auto">
              
                <div className="overflow-hidden bg-white rounded-xl">
                    <div className="px-6 py-12 sm:p-10">
                        <h3 className="text-3xl font-semibold text-center text-gray-900">Edit Detaiils</h3>

                        <form className="mt-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                                <div>
                                    <label htmlFor="" className="text font-medium text-gray-900"> Full Name :</label>
                                    <div className="mt-2.5 relative">
                                        <input type="text" name="fullName" id="fullName" placeholder="Enter your full name" className="text block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900"> Email address :</label>
                                    <div className="mt-2.5 relative">
                                        <input type="email" name="email" id="email" placeholder="Enter your email" className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900"> Phone number </label>
                                    <div className="mt-2.5 relative">
                                        <input type="tel" name="" id="" placeholder="Enter your contact number" className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                                    </div>
                                </div>

                                <div className='flex justify-end items-center'>
                                    <Link className='text-blue-700 text-underlined' to={'/forgot-password'}>Change Password ?</Link>
                                </div>

                                <div class="sm:col-span-1">
                                    <button type="submit" class="inline-flex items-center justify-center w-auto h-auto px-5 py-3 mt-2 text-sm font-semibold text-white bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">
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