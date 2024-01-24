import React from 'react'
import { useState } from 'react';

function EditBankDetails() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

  return (
    <section className="py-10 bg-gray-800 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-5xl mx-auto">
              
                <div className="overflow-hidden bg-white rounded-xl">
                    <div className="px-6 py-12 sm:p-12">
                        <h3 className="text-3xl font-semibold text-center text-gray-900">Edit Account Details</h3>

                        <form className="mt-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                                <div>
                                    <label htmlFor="" className="text font-medium text-gray-900"> Beneficiary Name :</label>
                                    <div className="mt-2.5 relative">
                                        <input type="text" name="" id="" disabled placeholder="Enter your beneficiary name" className="text block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900"> Bank Name :</label>
                                    <div className="mt-2.5 relative">
                                        <input type="email" name="" id="" placeholder="Enter your bank name" className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900"> Acoount Number : </label>
                                    <div className="mt-2.5 relative">
                                        <input type="tel" name="" id="" placeholder="Enter your account number" className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900"> Bank IFSC : </label>
                                    <div className="mt-2.5 relative">
                                        <input type="tel" name="" id="" placeholder="Enter your Bank IFSC code" className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                                    </div>
                                </div>
                                <div className="sm:col-span-1">
                                    
                                
                                
                                <button
                                    onClick={openModal}
                                    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    type="button"
                                >
                                    Save Changes
                                </button>

                                {isModalOpen && (
                                    <div
                                    id="popup-modal"
                                    className="fixed top-0 right-0 left-0 z-1300 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
                                    onClick={closeModal}
                                    >
                                    <div
                                        className="relative bg-white rounded-lg shadow p-4 w-full max-w-md"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <button
                                        onClick={closeModal}
                                        type="button"
                                        className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                                        >
                                        <svg
                                            className="w-3 h-3"
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
                                        <div className="p-4 md:p-5 text-center">
                                        <svg
                                            className="mx-auto mb-4 text-gray-400 w-12 h-12"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                            />
                                        </svg>
                                        <h3 className="mb-5 text-lg font-normal text-gray-500">
                                            Are you sure you want to save the details?
                                        </h3>
                                        <button
                                            onClick={closeModal}
                                            type="button"
                                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                                        >
                                            Yes, I'm sure
                                        </button>
                                        <button
                                            onClick={closeModal}
                                            type="button"
                                            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900"
                                        >
                                            No, cancel
                                        </button>
                                        </div>
                                    </div>
                                    </div>
                                )}
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

export default EditBankDetails