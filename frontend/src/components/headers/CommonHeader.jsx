import React from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from './Logo'


export default function CommonHeader() {

    const loginURI = import.meta.env.VITE_LOGIN_URI;
    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Logo/>
                    <div className="flex items-center lg:order-2">
                        <a
                            href={loginURI}
                            className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Login
                        </a>
                        <Link
                            to="/register"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Get started
                        </Link>
                    </div>
                    
                </div>
            </nav>
        </header>
    );
}