export const dateConverter = (dateString) => {

    const date = new Date(dateString);
        
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
        
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
}

export const convertToNormalTime = (timeString) => {

    if (typeof timeString === 'undefined') {
        return 'Invalid time string';
    }
    const [hours, minutes, seconds] = timeString?.split(':');
    const date = new Date();
    date.setHours(parseInt(hours,  10));
    date.setMinutes(parseInt(minutes,  10));
    date.setSeconds(parseInt(seconds,  10));
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}