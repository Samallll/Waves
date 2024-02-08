
export const validateEventDetails = (eventDetails) => {
    let errors = "";
  
    // Date must be a valid date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!eventDetails.date || !dateRegex.test(eventDetails.date)) {
        errors = 'Date must be in the format YYYY-MM-DD';
    }
  
    // Time must be a valid time format
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!eventDetails.time || !timeRegex.test(eventDetails.time)) {
        errors = 'Time must be in the format HH:MM';
    }
  
    // Genre must be English letters and at least  3 characters long
    const genreRegex = /^[a-zA-Z]+$/;
    if (!eventDetails.genre || eventDetails.genre.length <  3 || !genreRegex.test(eventDetails.genre)) {
      errors = 'Genre must contain only English letters and be at least 3 characters long';
    }
  
    // Event mode must be either 'free' or 'paid'
    if (!['Free', 'Paid'].includes(eventDetails.contentType)) {
      errors = 'Event mode must be either Free or Paid';
    }
  
    // Organizer Count must not be English letters and must not be negative
    const organizerCountRegex = /^[0-9]+$/;
    if (!eventDetails.organizerCount || parseInt(eventDetails.organizerCount,  10) <=  0 || !organizerCountRegex.test(eventDetails.organizerCount)) {
      errors = 'Organizer count must be a positive number';
    }
  
    // Seats Available must not be English letters, must not be negative, and cannot be zero
    if (!eventDetails.seatsAvailable || parseInt(eventDetails.seatsAvailable,  10) <=  0 || !organizerCountRegex.test(eventDetails.seatsAvailable)) {
      errors = 'Seats available must be a positive number greater than zero';
    }
  
    // About the Event must be more than  10 characters long
    if (!eventDetails.about || eventDetails.about.length <  10) {
      errors = 'About the Event must be more than 10 characters long';
    }
  
    // Ticket Price must be a valid amount format (e.g., no letters, no negative numbers)
    const ticketPriceRegex = /^[0-9]+(\.[0-9]{1,2})?$/;
    if (!eventDetails.ticketPrice || !ticketPriceRegex.test(eventDetails.ticketPrice)) {
      errors = 'Ticket price must be a valid amount format';
    }
  
    return errors;
  }

  export const validateLocation = (location) => {
    let errors = "";
  
    // Street Address must not be empty and should be at least  3 characters long
    if (!location.streetAddress || location.streetAddress.trim().length <  3) {
      errors = 'Street Address must not be empty and should be at least 3 characters long';
    }
  
    // Country must not be empty and should be at least  2 characters long
    if (!location.country || location.country.trim().length <  2) {
      errors = 'Country must not be empty and should be at least 2 characters long';
    }
  
    // State must not be empty and should be at least  2 characters long
    if (!location.state || location.state.trim().length <  2) {
      errors = 'State must not be empty and should be at least 2 characters long';
    }
  
    // City must not be empty and should be at least  2 characters long
    if (!location.city || location.city.trim().length <  2) {
      errors = 'City must not be empty and should be at least 2 characters long';
    }
  
    // Zip Code must not be empty and should be at least  5 characters long
    if (!location.zipCode || location.zipCode.trim().length <  5) {
      errors = 'Zip Code must not be empty and should be at least 5 characters long';
    }
  
    return errors;
  }

  export const validateJobPost = (jobPost) => {
    let errors = "";
  
    // Job Name must not be empty and should be at least   3 characters long
    if (!jobPost.jobName || jobPost.jobName.trim().length <   3) {
      errors.jobName = 'Job Name must not be empty and should be at least 3 characters long';
    }
  
    // Skills Required must not be empty and each skill should be at least 3 characters long
    if (!jobPost.skillsRequired || jobPost.skillsRequired.split(',').some(skill => skill.trim().length <   3)) {
      errors.skillsRequired = 'Skills Required must not be empty and each skill should be at least 3 characters long';
    }
  
    // Job Description must not be empty and should be at least   10 characters long
    if (!jobPost.jobDescription || jobPost.jobDescription.trim().length <   10) {
      errors.jobDescription = 'Job Description must not be empty and should be at least 10 characters long';
    }
  
    // Terms And Conditions must not be empty and should be at least   10 characters long
    if (!jobPost.termsAndConditions || jobPost.termsAndConditions.trim().length <   10) { 
      errors.termsAndConditions = 'Terms And Conditions must not be empty and should be at least 10 characters long';
    }
  
    // Salary must be a positive number
    if (jobPost.salary <=   0) {
      errors.salary = 'Salary must be a positive number';
    }
  
    // Open Positions must be a positive integer
    if (jobPost.openPositions <=   0 || !Number.isInteger(jobPost.openPositions)) {
      errors.openPositions = 'Open Positions must be a positive integer';
    }
  
    return errors;
  }