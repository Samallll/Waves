export const dateConverter = (dateString) => {

    const date = new Date(dateString);
        
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
        
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
}