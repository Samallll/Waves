
export const validateEventDetails = (eventDetails) => {

    let errors = "";

    const eventDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const today = new Date();
    today.setHours(0,  0,  0,  0); 

    if (!eventDetails.eventDate || !eventDateRegex.test(eventDetails.eventDate)) {
        errors = 'Please select a valid date';
    } else {
        const selectedDate = new Date(eventDetails.eventDate);
        if (selectedDate <= today) {
            errors = 'The date cannot be in the past or today';
        }
    }
  
    if (!eventDetails.eventTime) {
        errors = 'Please select a valid time';
    }
  
    const genreRegex = /^[a-zA-Z]+$/;
    if (!eventDetails.genre || eventDetails.genre.length <  3 || !genreRegex.test(eventDetails.genre)) {
      errors = 'Genre must contain only English letters and be at least 3 characters long';
    }
  
    if (!['FREE', 'PAID'].includes(eventDetails.contentType)) {
      errors = 'Content Type must be either Free or Paid';
    }
  
    const organizerCountRegex = /^[0-9]+$/;
    if (parseInt(eventDetails.organizerCount,  10) <  0 || !organizerCountRegex.test(eventDetails.organizerCount)) {
      errors = 'Organizer count must be a positive number';
    }

    if (!eventDetails.seatsAvailable || parseInt(eventDetails.seatsAvailable,  10) <=  0 || !organizerCountRegex.test(eventDetails.seatsAvailable)) {
      errors = 'Seats available must be a positive number greater than zero';
    }
  

    if (!eventDetails.description || eventDetails.description.length <  10) {
      errors = 'About the Event must be more than 10 characters long';
    }
  
    const ticketPriceRegex = /^[0-9]+(\.[0-9]{1,2})?$/;
    if (!eventDetails.ticketPrice || !ticketPriceRegex.test(eventDetails.ticketPrice)) {
      errors = 'Ticket price must be a valid amount format';
    }

    if (!eventDetails.eventPictureId) {
      errors = 'Please upload event picture';
    }
  
    return errors;
  }

  export const validateLocation = (location) => {
    let errors = "";
  
    if (!location.streetAddress || location.streetAddress.trim().length <  3) {
      errors = 'Street Address must not be empty and should be at least 3 characters long';
    }
  
    if (!location.country || location.country.trim().length <  2) {
      errors = 'Country must not be empty and should be at least 2 characters long';
    }

    if (!location.state || location.state.trim().length <  2) {
      errors = 'State must not be empty and should be at least 2 characters long';
    }
  
    if (!location.city || location.city.trim().length <  2) {
      errors = 'City must not be empty and should be at least 2 characters long';
    }

    if (!location.zipCode || location.zipCode.trim().length <  5) {
      errors = 'Zip Code must not be empty and should be at least 5 characters long';
    }
  
    return errors;
  }

  export const validateJobPost = (jobPost) => {

    
    let errors = "";

    if(!jobPost){
      errors="Please update the Job details."
      return errors;
    }

    if (!jobPost.jobName || jobPost.jobName.trim().length <   3) {
      errors = 'Job Name must not be empty and should be at least 3 characters long';
    }

    if (!jobPost.skillsRequired || jobPost.skillsRequired.split(',').some(skill => skill.trim().length <   3)) {
      errors = 'Skills Required must not be empty and each skill should be at least 3 characters long';
    }

    if (!jobPost.jobDescription || jobPost.jobDescription.trim().length <   10) {
      errors = 'Job Description must not be empty and should be at least 10 characters long';
    }

    if (!jobPost.termsAndConditions || jobPost.termsAndConditions.trim().length <   10) { 
      errors = 'Terms And Conditions must not be empty and should be at least 10 characters long';
    }

    const ticketPriceRegex = /^[0-9]+(\.[0-9]{1,2})?$/;
    if (!jobPost.salary || !ticketPriceRegex.test(jobPost.salary)) {
      errors = 'Salary must be a positive number';
    }

    const organizerCountRegex = /^[0-9]+$/;
    if (parseInt(jobPost.openPositions,  10) <  0 || !organizerCountRegex.test(jobPost.openPositions)) {
      errors = 'Open Positions must be a positive integer';
    }
  
    return errors;
  }

  export const validateImage = (file) => {

    let errors = "";

    const MAX_FILE_SIZE =  9 *  1024 *  1024; 
    const ALLOWED_TYPES = ['image/jpeg', 'image/png']; 

    if (!file) {
      errors = 'No file selected';
      return errors;
    }

    const fileSize = file?.size;
    const fileType = file?.type;

    if (fileSize > MAX_FILE_SIZE) {
      errors = 'File size cannot exceed  3MB.';
    }

    if (!ALLOWED_TYPES.includes(fileType)) {
      errors = 'Invalid file format. Only JPEG and PNG formats are allowed.';
    }

    return errors;
  }