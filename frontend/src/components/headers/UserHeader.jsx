import React, { useEffect,useState } from 'react'
import { Link,NavLink, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import { AppBar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

function UserHeader() {

    const logoutURI = import.meta.env.VITE_LOGOUT_URI;
    const gatewayURI = import.meta.env.VITE_API_GATEWAY_BASE_URI

    const loggedUser = useSelector((state)=> state.auth.loggedUser)
    const userId = loggedUser ? loggedUser.userId : "";

    const[role,setRole] = useState("");

    function logout(){
        localStorage.removeItem('logged_user');
        window.location.href = logoutURI
    }

    useEffect(()=>{
        try{
            const response = fetch(`${gatewayURI}/me`,{mode:'no-cors'});
            response.then(response => response.json())
            .then(data => setRole(data.roles))
        }
        catch(error){
            console.log(error)
        }
    },[role])
    
  return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Logo/>
                    <div className="flex items-center lg:order-2">
                        <Link
                            to={`/user/${userId}`}
                            className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Profile
                        </Link>
                        <button
                            onClick={logout}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Log out
                        </button>
                    </div>
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                to="/"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
                                        ${isActive ? "text-blue-700" : "text-gray-700" } lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to="/events"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
                                        ${isActive ? "text-blue-700" : "text-gray-700" } lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                                    }
                                >
                                    Events
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to="/user/event-details"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
                                        ${isActive ? "text-blue-700" : "text-gray-700" } lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                                    }
                                >
                                    Organize
                                </NavLink>
                            </li>    
                            <li>
                                {
                                    role && role === "USER" ?

                                    <NavLink
                                        to='/user/host-registration'
                                        className={({isActive}) =>
                                            `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
                                            ${isActive ? "text-blue-700" : "text-gray-700" } lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                                        }
                                    >
                                        Be an Host
                                    </NavLink>
                                    
                                    :

                                    <NavLink
                                        to="/host/register-event"
                                        className={({isActive}) =>
                                            `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
                                            ${isActive ? "text-blue-700" : "text-gray-700" } lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                                        }
                                    >
                                        List your Event
                                    </NavLink>
                                }
                            </li>                      
                        </ul>
                    </div>
                </div>
            </nav>
        </AppBar>
  )
}

export default UserHeader