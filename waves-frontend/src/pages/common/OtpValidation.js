import React from 'react'
import OtpForm from '../../components/forms/OtpForm'
import LoginButton from '../../components/buttons/LoginButton'

function OtpValidation() {
  return (
    <div className='centered-container'>
        <OtpForm>
            <LoginButton/>
        </OtpForm>
    </div>
  )
}

export default OtpValidation