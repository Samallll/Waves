import React from 'react'

function UserHome() {
  return (
    <>
      <div className="py-16 bg-white">
        <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-20">
            <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-20">
                <div className="md:5/12 lg:w-5/12">
                    <img
                        src="https://tailus.io/sources/blocks/left-image/preview/images/startup.png"
                        alt="image"
                    />
                </div>
                <div className="md:7/12 lg:w-6/12">
                    <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                        Alone we can do so little, Together we can do so much!!
                    </h2>
                    <p className="mt-6 text-gray-600">
                    Build your dream team, launch your dream event! This platform connects passionate hosts with skilled volunteers, 
                    crafting dream teams for unforgettable experiences. Whether you envision a dazzling conference, 
                    a lively community picnic, or anything in between, CrowdCraft simplifies it all. 
                    Post your event details, attract talented organizers with matching skills and collaborate seamlessly.
                    </p>
                    <p className="mt-4 text-gray-600">
                    Users, join an event and lend your expertise, or discover unique gatherings waiting for your
                    spark. So, let's craft magic together! Find your tribe, build your event, and forge memories that last. Visit CrowdCraft today!
                    </p>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default UserHome