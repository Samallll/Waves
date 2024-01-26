import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react';
import { Link } from 'react-router-dom';

function BankDetails() {

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

    useEffect(()=>{

        async function fetchUserBankDetails() {
            try {
                const response = await fetch(`${userServiceUri}/bank/${loggedUser.userId}`);
                if (!response.ok) {
                    throw new Error('Details not found');
                }
                const data = await response.json();
                setBankDetails(data);
            } catch (error) {
                console.error('Error fetching user bank details:', error);
            }
        }

        fetchUserBankDetails();
        
    },[loggedUser.userId])

  return (
    <section className="py-10 bg-gray-800 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-5xl mx-auto">
              
                <div className="overflow-hidden bg-gray-100 rounded-xl">
                
                    <div className="px-6 py-12 sm:p-12">

                        <div className="flex justify-between items-center">
                            <h3 className="text-3xl font-semibold text-center text-gray-900">Account Details</h3>
                            {bankDetails.bankId === "" ? 
                                <Link to={`/user/${loggedUser.userId}/bank/add`}
                                    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    type="button"
                                >
                                    Add Account
                                </Link>
                                :
                                <Link to={`/user/${loggedUser.userId}/bank/edit`}
                                    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    type="button"
                                >
                                    Edit Account
                                </Link>
                            }
                        </div>
                        
                        <form className="mt-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                                <div>
                                    <label htmlFor="" className="text font-medium text-gray-900"> Beneficiary Name :</label>
                                    <div className="mt-2.5 relative">
                                        <input type="text" value={bankDetails.beneficiaryName} name="beneficiaryName" id="beneficiaryName" disabled placeholder='No data' 
                                        className="text block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900"> Bank Name :</label>
                                    <div className="mt-2.5 relative">
                                        <input type="text" value={bankDetails.bankName} 
                                        name="bankName" 
                                        id="bankName" disabled placeholder='No data' 
                                        className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900"> Account Type : </label>
                                    <div className="mt-2.5 relative">
                                        <input type="text" disabled 
                                        placeholder="Enter your Bank IFSC code" 
                                        value={bankDetails.accountType} 
                                        className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900"> Acoount Number : </label>
                                    <div className="mt-2.5 relative">
                                        <input type="text" value={bankDetails.accountNumber} 
                                        name="accountNumber" 
                                        id="accountNumber" disabled placeholder='No data' 
                                        className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900"> Bank IFSC : </label>
                                    <div className="mt-2.5 relative">
                                        <input type="text" value={bankDetails.ifsc}
                                         name="ifsc" 
                                         id="ifsc" 
                                         disabled placeholder='No data' 
                                         className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                                    </div>
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

export default BankDetails