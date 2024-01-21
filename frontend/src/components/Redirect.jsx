import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoggedUser, setAuthenticated } from '../features/authSlice'; 

function Redirect() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8090/me',{mode:'no-cors'}); 
        if (!response.ok) {
          navigate('/home');
          return;
        }
        const data = await response.json();
        console.log(data.roles)
        switch (data.roles) {
          case 'ADMIN':
            navigate('/admin');
            break;
          case 'USER':
            navigate('/user');
            break;
          default:
            navigate('/home');
        }
      } catch (error) {
        navigate('/home');
      }
    };

    fetchUserData();
  }, []);
    
    
 
  return null;
 }
 
 export default Redirect;