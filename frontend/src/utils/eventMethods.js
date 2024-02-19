import axiosHelper from "./axiosHelper"

const eventServiceURI = import.meta.env.VITE_EVENT_SERVICE_BASE_URI

export const participation = async (eventId,showToast) => {

    try{
        const response = await axiosHelper.get();
        const data = response.data;
        console.log(data)
    }
    catch(error){
        console.error(error)
    }
}

export const coordinateEvent = async (eventId,showToast) => {

    try{
        const response = await axiosHelper.get();
        const data = response.data;
        console.log(data)
    }
    catch(error){
        console.error(error)
    }
}

export const makeLive = async (eventId,showToast) => {

    const eventStatus = "LIVE"
    try{
        const response = await axiosHelper.get(`${eventServiceURI}/update-event-status/${eventId}/${eventStatus}`);
        const data = response.data;
        showToast(data,{ type: 'success' })
    }
    catch(error){
        console.error(error)
        showToast("Failed to update event Status","danger");
    }
}

export const cancelEvent = async (eventId,showToast) => {

    const eventStatus = "EXPIRED"
    try{
        const response = await axiosHelper.get(`${eventServiceURI}/update-event-status/${eventId}/${eventStatus}`);
        const data = response.data;
        showToast(data,{ type: 'success' })
    }
    catch(error){
        console.error(error)
        showToast("Failed to update event Status","danger");
    }
}