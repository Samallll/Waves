import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchLoggedUser } from '../features/authSlice';
import { fetchHostDetails } from '../features/authSlice';

function Redirect() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const gatewayURI = import.meta.env.VITE_API_GATEWAY_BASE_URI
 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${gatewayURI}/me`,{mode:'no-cors'}); 
        if (!response.ok) {
          navigate('/home');
          return;
        }
        const data = await response.json();
        switch (data.roles) {
          case 'ADMIN':
            navigate('/admin/user-management');
            dispatch(fetchLoggedUser(data.username));
            break;
          case 'USER':
            navigate('/user');
            dispatch(fetchLoggedUser(data.username));
            break;
          case 'HOST':
            navigate('/host');
            dispatch(fetchLoggedUser(data.username));
            dispatch(fetchHostDetails(data.username));
            break;
          default:
            navigate('/home');
        }
      } catch (error) {
        console.log("error navigation",error)
        navigate('/home');
      }
    };

    fetchUserData();
  }, []);
  return null;
 }
 
 export default Redirect;