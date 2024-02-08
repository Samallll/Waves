import React, { useState } from 'react'
import { validateEventDetails, validateLocation } from '../../utils/validations';
import Event from '../../components/forms/Event/Event';
import Location from '../../components/forms/Event/Location';
import JobPost from '../../components/forms/Event/JobPost';

function EventRegistration() {

  const [error,setError] = useState("");

  const handleCategoryUpdate = (category, data) => {
    
    setFormData(prevState => ({ ...prevState, [category]: data }));

  };

  const [formData, setFormData] = useState({
    location: {},
    eventDetails: {},
    jobPost:{}
  });

  const onSubmit = (e) => {

    e.preventDefault();
    const validateEventResult = validateEventDetails(formData.eventDetails);
    if (!formData.eventDetails.eventName || formData.eventDetails.eventName.length <  3) {
      setError('Event Name must be at least 3 characters long');
      return;
    }
    // if(validateEventResult !== ""){
    //   setError(validateEventResult)
    //   return;
    // }
    // if(formData.eventDetails.eventMode === "Offline"){
    //   const validateLocation = validateLocation(formData.location);
    //   if(validateLocation !== ""){
    //     setError(validateLocation)
    //     return;
    //   }
    // }
    // if(formData.eventDetails.organizerCount.trim() > 0){
    //   const validateJobPost = validateJobPost(formData.jobPost);
    //   if(validateJobPost !== ""){
    //     setError(validateJobPost)
    //     return;
    //   }
    // }
    // if (!formData.eventDetails.termsAndConditions || formData.eventDetails.termsAndConditions.trim().length <   10) {
    //   setError('Terms And Conditions must not be empty and should be at least 10 characters long');
    //   return;
    // }
    setError("");
    console.log("Success");
  }

  return (
    <>
    <section className='bg-gray-900 py-10 px-20 mt-10'>
      <div className='py-10 px-20 bg-gray-100 mt-10 rounded-[15px]'>
      { error && <>
                    <h6 className='text-white mx-20 bg-red-600 py-2 mb-8 text-center rounded'>{error}</h6>
                    </>}
        <div>
          <Event onUpdate={(data) => handleCategoryUpdate('eventDetails', data)}/>
        </div>
        <div>
          <Location onUpdate={(data) => handleCategoryUpdate('location',data)} />
        </div>

        <div className="space-y-12">
          <div className="mt-8 border-b border-gray-900/10 pb-12">
            <h2 className="text-lg font-semibold leading-7 text-gray-900">Terms and Conditions</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Constraints for the users to be participating in the event. Please mention all your T&C in the below text area.</p>

            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">

              <div className="col-span-full">
                <div className="mt-2">
                  <textarea
                    type="text"
                    name="termsAndConditions"
                    id="termsAndConditions"
                    autoComplete="termsAndConditions"
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>             
            </div>
          </div>  
        </div>

        {
          formData?.eventDetails?.organizerCount>0 && 
          <div> 
            <JobPost onUpdate={(data) => handleCategoryUpdate('jobPost',data)}/>
          </div>
        }

        <div className="mt-6 flex items-center justify-center gap-x-6">
          <button
            type="button"
            onClick={onSubmit}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
        </div>
      </div>
    </section>
    </>
  )
}

export default EventRegistration