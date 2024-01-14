import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import "./UserForm.css"

function UserForm({children}) {

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
    });

    const [error,setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
    setFormData({
         ...formData, 
         [e.target.name]: e.target.value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(Object.values(formData).some(value => value === null || value === '')){
            setError("Please complete the form")
            return;
        }
// Email Id exists check needed
        console.log("form submitted");
        sessionStorage.setItem("registerRequest",formData)
        navigate("/otp/verify")
    };

  return (
    <>
        <form className="form" onSubmit={handleSubmit}>

            {error && <p style={{
                textAlign:"center",
                color:"red",
                marginTop:"25px",
                marginBottom:"10px"
                }}>{error}</p>}

            <div className="form-body">
                <div className="username">
                    <label className="form__label" htmlFor="firstName">Full Name </label>
                    <input className="form__input" type="text" id="firstName" placeholder="First Name" name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}/>
                </div>
                <div className="email">
                    <label className="form__label" htmlFor="email">Email </label>
                    <input  type="email" id="email" className="form__input" placeholder="Email" name="email"
                        value={formData.email}
                        onChange={handleChange}/>
                </div>
                <div className="password">
                    <label className="form__label" htmlFor="password">Password </label>
                    <input className="form__input" type="password"  id="password" placeholder="Password" name="password"
                        value={formData.password}
                        onChange={handleChange}/>
                </div>
            </div>
            <div className="footer">
                {children}
            </div>
        </form>
    </>
  )
}

export default UserForm