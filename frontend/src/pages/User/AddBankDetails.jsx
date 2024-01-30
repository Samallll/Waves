import React from 'react'
import { useEffect,useState } from 'react';
import {useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchLoggedUser } from '../../features/authSlice';

function AddBankDetails() {
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error,setError] = useState("");
    const navigate = useNavigate();

    const userServiceUri = import.meta.env.VITE_USER_SERVICE_BASE_URI

    const loggedUser = useSelector(state=>state.auth.loggedUser);
    const [bankDetails,setBankDetails] = useState({
        bankId:"",
        beneficiaryName:"",
        accountNumber:"",
        accountType:"",
        bankName:"",
        ifsc:""
    });

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!bankDetails.beneficiaryName.trim()) {
            setError('Beneficiary Name is required');
            return;
          }
      
          if (!bankDetails.bankName.trim()) {
            setError('Bank Name is required');
            return;
          }
      
          if (!/^\d{9,18}$/.test(bankDetails.accountNumber)) {
            setError('Account Number should be 9-18 digits');
            return;
          }
      
          if (!['savings', 'current'].includes(bankDetails.accountType.toLowerCase())) {
            setError('Account Type should be savings or current');
            return;
          }
      
          if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(bankDetails.ifsc)) {
            setError('IFSC Code is not valid');
            return;
          }
          setError("")

        openModal();
    }

    const submitForm = async () => {

        try {
            const response = await fetch(`${userServiceUri}/bank/add/${loggedUser.userId}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(bankDetails),
            });
            if (response.ok) {
              const data = await response.text();
              dispatch(fetchLoggedUser(loggedUser.email));
              console.log('Bank details created:', data);

              navigate(`/user/${loggedUser.userId}/bank`)
            } else {
              console.error('Failed to create bank details:', response.statusText);
            }
          } catch (error) {
            console.error('Error creating bank details:', error);
          }

          closeModal();
    }

    const handleChange = (e) => {
        setBankDetails({
            ...bankDetails,
            [e.target.name]:e.target.value
        })
    }

  return (
    <section className="py-10 bg-gray-800 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-5xl mx-auto">
              
                <div className="overflow-hidden bg-gray-100 rounded-xl">
                    <div className="px-6 py-12 sm:p-12">
                        <h3 className="text-3xl font-semibold text-center text-gray-900">Add Account Details</h3>
                        { error && <h4 className='font-bold text-white bg-red-600 text-center my-4 mx-5 p-3 rounded border'>{error}</h4>}
                        <form className="mt-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                                <div>
                                    <label htmlFor="" className="text font-medium text-gray-900"> Beneficiary Name :</label>
                                    <div className="mt-2.5 relative">
                                        <input type="text"
                                         name="beneficiaryName" 
                                         id="beneficiaryName" 
                                         placeholder="Enter your beneficiary name"
                                         value={bankDetails.beneficiaryName}
                                         onChange={handleChange}
                                         className="text block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900"> Bank Name :</label>
                                    <div className="mt-2.5 relative">
                                        <input type="text" 
                                        name="bankName" 
                                        id="bankName" 
                                        placeholder="Enter your bank name" 
                                        value={bankDetails.bankName} 
                                        onChange={handleChange}
                                        className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900"> Acoount Number : </label>
                                    <div className="mt-2.5 relative">
                                        <input type="text" 
                                        name="accountNumber" 
                                        id="accountNumber" 
                                        value={bankDetails.accountNumber} 
                                        onChange={handleChange}
                                        placeholder="Enter your account number" className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900"> Bank IFSC : </label>
                                    <div className="mt-2.5 relative">
                                        <input type="text" 
                                        name="ifsc" 
                                        id="ifsc" 
                                        placeholder="Enter your Bank IFSC code" 
                                        value={bankDetails.ifsc} 
                                        onChange={handleChange}
                                        className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="accountType" className="text-base font-medium text-gray-900">
                                    Account Type:
                                    </label>
                                    <div className="mt-2.5 relative">
                                        <select
                                            name="accountType"
                                            id="accountType"
                                            value={bankDetails.accountType}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md caret-blue-600"
                                        >
                                            <option value="">Select account type</option>
                                            <option value="savings">Savings</option>
                                            <option value="current">Current</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="sm:col-span-2">                                
                                <button
                                    className="block mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    type="submit"
                                >
                                    Submit
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
                                                onClick={submitForm}
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

export default AddBankDetails