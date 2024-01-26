import React from 'react'
import { useSelector } from 'react-redux'

function UserProfile() {

    const loggedUser = useSelector(state=>state.auth.loggedUser)

  return (
    <section className="py-10 bg-gray-800 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-5xl mx-auto">
              
                <div className="overflow-hidden bg-gray-100 rounded-xl">
                    <div className="px-6 py-12 sm:p-12">
                        <h3 className="text-3xl font-semibold text-center text-gray-900">About You!</h3>

                        <form className="mt-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                                <div>
                                    <label htmlFor="" className="text font-medium text-gray-900 ms-3"> Full Name :</label>
                                    <div className="mt-2.5 relative">
                                        <input type="text" value={loggedUser.fullName} disabled className="text block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900 ms-3"> Email address :</label>
                                    <div className="mt-2.5 relative">
                                        <input type="email" value={loggedUser.emailId} disabled className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900 ms-3"> Phone number :</label>
                                    <div className="mt-2.5 relative">
                                        <input type="tel" disabled value={loggedUser.phoneNumber ? loggedUser.phoneNumber : ""} className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md" />
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

export default UserProfile