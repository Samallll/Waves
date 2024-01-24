import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchLoggedUser } from '../features/authSlice';

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
        console.log(data)
        switch (data.roles) {
          case 'ADMIN':
            navigate('/admin');
            console.log("admin")
            dispatch(fetchLoggedUser(data.username));
            break;
          case 'USER':
            navigate('/user');
            console.log("user")
            dispatch(fetchLoggedUser(data.username));
            break;
          default:
            console.log("default deviation")
            navigate('/home');
        }
      } catch (error) {
        console.log("error navigation")
        navigate('/home');
      }
    };

    fetchUserData();
  }, []);
  return null;
 }
 
 export default Redirect;