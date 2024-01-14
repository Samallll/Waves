import React from 'react'
import UserForm from '../../components/forms/UserForm';
import RegisterButton from '../../components/buttons/RegisterButton';
import LoginButton from '../../components/buttons/LoginButton';

function Registration() {

  return (
    <>

        <div className='d-flex justify-content-center align-items-center'>
            <UserForm>
                <RegisterButton/>
                <LoginButton/>
            </UserForm>
        </div>
    </>
  )
}

export default Registration