const userServiceUri = import.meta.env.VITE_USER_SERVICE_BASE_URI
const emailServiceUri = import.meta.env.VITE_EMAIL_SERVICE_BASE_URI
const hostServiceURI = import.meta.env.VITE_HOST_SERVICE_BASE_URI

export const generateRandomOtp = () => {
    
    const digits = '0123456789';
    let otp = '';

    for (let i = 0; i < 6; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    console.log("generated otp: ",otp)
    return otp;
}


export const sendEmail = (toList,subject,body) => {

    const emailDto = {
        toList,
        subject,
        body
    }

    fetch(`${emailServiceUri}/sendMail`, {
        method: 'POST',
        body: JSON.stringify(emailDto),
        headers: { 'Content-Type': 'application/json' }
    }).then( response => console.log(response.text()))
    .catch(error => console.log(error))
}

export const lockUser = (userId) => {

    fetch(`${userServiceUri}/lock/${userId}`) 
    .then(response => response.text()) 
    .then(responseData => {
        console.log(responseData); 
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

}

export const unlockUser = (userId) => {

    fetch(`${userServiceUri}/unlock/${userId}`) 
    .then(response => response.text()) 
    .then(responseData => {
        console.log(responseData); 
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

}

export const whomami = (email) => {

    fetch(`${userServiceUri}/email/${email}`)
    .then(response => response.json())
    .then(responseData => {
        console.log(responseData);
        return responseData;
    })
    
}

export const loggedUserUpdate = (userData) => {
    try {
        const response = fetch(`${userServiceUri}/update-user`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
    } catch (error) {
        console.error('Error updating user:', error);
    }
}

export const uniqueHostRequest = (userId,status) => {
    try{
        const response = fetch(`${hostServiceURI}/host-request/?userId=${userId}&status=${status}`)
        return response;
    }
    catch(error){
        console.log(error);
    }
}
