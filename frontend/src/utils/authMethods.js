
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

    // fetch('http://127.0.0.1:8090/api/v1/email/sendMail', {
    //     method: 'POST',
    //     body: JSON.stringify(emailDto),
    //     headers: { 'Content-Type': 'application/json' }
    // }).then( response => console.log(response.text()))
    // .catch(error => console.log(error))
}