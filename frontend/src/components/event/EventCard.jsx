import React from "react";
import ImageComponent from "../ImageComponent";

function EventCard({ eventDetails }) {
    
    const eventServiceURI = import.meta.env.VITE_EVENT_SERVICE_BASE_URI

  return (
    <>
      <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
        <div className="flex justify-center">
          <ImageComponent src={eventDetails?.event?.eventPictureId ? `${eventServiceURI}/get-picture/${eventDetails?.event?.eventPictureId}` : null} alt={"Event Image"} />
        </div>

        <div className="mt-8">
          <div className="mt-4 space-y-6">
            <pre
              className="text-md text-gray-600 font-sans tracking-wide leading-relaxed"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {eventDetails?.event.description}
            </pre>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-medium text-gray-900">Highlights</h3>

          <div className="mt-4">
            <ul role="list" className="list-disc space-y-1 pl-4 text-md">
              <li className="text-gray-400">
                <span className="text-gray-600">
                  Content Type : {eventDetails?.event.contentType} Event
                </span>
              </li>
              <li className="text-gray-400">
                <span className="text-gray-600">
                  Genre : {eventDetails?.event.genre}
                </span>
              </li>
              <li className="text-gray-400">
                <span className="text-gray-600 capitalize">
                  Event Mode: {eventDetails?.event.eventMode}
                </span>
              </li>
              <li className="text-gray-400">
                <span className="text-gray-600">
                  Organizers count: {eventDetails?.event.organizerCount}
                </span>
              </li>
              <li className="text-gray-400">
                <span className="text-gray-600">
                  Participants count: {eventDetails?.event.participantsCount}
                </span>
              </li>
              <li className="text-gray-400">
                <span className="text-gray-600">
                  Seats Available: {eventDetails?.event.seatsAvailable}
                </span>
              </li>
              <li className="text-gray-400">
                {eventDetails?.event?.profit && eventDetails?.eventStatus === "EXPIRED" ? (
                  <span className={`text-${eventDetails?.event?.profit > 0 ? 'green' : 'red'}-600`}>
                    Profit : {eventDetails?.event.profit} Rs
                  </span>
                ) : null}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-medium text-gray-900">
            Terms and Conditions
          </h3>
          <div className="mt-4 space-y-6">
            <pre
              className="text-md text-gray-600 font-sans tracking-wide leading-relaxed"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {eventDetails?.event.termsAndConditions}
            </pre>
          </div>
        </div>

        {eventDetails?.jobPost && (
          <pre
            className="mt-8 text-md text-gray-600 font-sans tracking-wide leading-relaxed"
            style={{ whiteSpace: "pre-wrap" }}
          >
            <h3 className="text-xl font-medium text-gray-900">
              Job Post Details
            </h3>
            <div className="mt-4 space-y-2 text-sm text-md text-gray-600 tracking-wide">
              <p>Job Name : {eventDetails?.jobPost?.jobName}</p>
              <div
                className="font-sans tracking-wide leading-relaxed flex"
                style={{ whiteSpace: "pre-wrap" }}
              >
                <h3>Job Description :</h3>
                <pre
                  className="font-sans tracking-wide leading-relaxed pl-1"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {eventDetails?.jobPost?.jobDescription}
                </pre>
              </div>
              <p>Skills Required : {eventDetails?.jobPost?.skillsRequired}</p>
              <div
                className="font-sans tracking-wide leading-relaxed flex"
                style={{ whiteSpace: "pre-wrap" }}
              >
                <h3>Terms And Conditions :</h3>
                <pre
                  className="font-sans tracking-wide leading-relaxed pl-1"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {eventDetails?.jobPost?.termsAndConditions}
                </pre>
              </div>
              <p>Salary : {eventDetails?.jobPost?.salary} Rs</p>
              <p>Open Positions : {eventDetails?.jobPost?.openPositions}</p>
            </div>
          </pre>
        )}
      </div>
    </>
  );
}

export default EventCard;
