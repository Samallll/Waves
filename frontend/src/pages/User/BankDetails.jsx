import React from 'react'

function BankDetails() {
  return (
    <section className="py-10 bg-gray-800 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-5xl mx-auto">
              
                <div className="overflow-hidden bg-white rounded-xl">
                    <div className="px-6 py-12 sm:p-12">
                        <h3 className="text-3xl font-semibold text-center text-gray-900">Account Details</h3>

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