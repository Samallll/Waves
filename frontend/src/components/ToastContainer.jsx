import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { dequeueToast } from "../features/toastSlice";

const ToastContainer = () => {
    const currentToast = useSelector((state) => state.toast.currentToast);
    const dispatch = useDispatch();

    if (!currentToast) {
        return null;
    }
    
    const { message, type } = currentToast;
    const toastId = `toast-${type}`;
    const iconClass = type === 'success' ? 'text-green-500' :
                        type === 'danger' ? 'text-red-500' :
                        'text-orange-500';
    const iconPath = type === 'success' ? 'M10 .5a9.5  9.5  0  1  0  9.5  9.5A9.51  9.51  0  0  0  10 .5Zm3.707  8.207-4  4a1  1  0  0  1-1.414  0l-2-2a1  1  0  0  1  1.414-1.414L9  10.586l3.293-3.293a1  1  0  0  1  1.414  1.414Z' :
                        type === 'danger' ? 'M10 .5a9.5  9.5  0  1  0  9.5  9.5A9.51  9.51  0  0  0  10 .5Zm3.707  11.793a1  1  0  1  1-1.414  1.414L10  11.414l-2.293  2.293a1  1  0  0  1-1.414-1.414L8.586  10  6.293  7.707a1  1  0  0  1  1.414-1.414L10  8.586l2.293-2.293a1  1  0  0  1  1.414  1.414L11.414  10l2.293  2.293Z' :
                        'M10 .5a9.5  9.5  0  1  0  9.5  9.5A9.51  9.51  0  0  0  10 .5ZM10  15a1  1  0  1  1  0-2  1  1  0  0  1  0  2Zm1-4a1  1  0  0  1-2  0V6a1  1  0  0  1  2  0v5Z';

  
    return (
        <div id={toastId} className={`fixed flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 rounded-lg shadow bottom-5 right-5 bg-blue-600`} role="alert">
            
            <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${iconClass} rounded-lg bg-white`}>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0  0  20  20">
                <path d={iconPath} />
            </svg>
            <span className="sr-only">{type === 'success' ? 'Check icon' : type === 'danger' ? 'Error icon' : 'Warning icon'}</span>
            </div>
            <div className="ms-3 text-sm font-semibold text-white">{message}</div>
            <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8" data-dismiss-target={`#${toastId}`} aria-label="Close" onClick={() => dispatch(dequeueToast())}>
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0  0  14  14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1  1  6  6m0  0  6  6M7  7l6-6M7  7l-6  6"/>
            </svg>
            </button>
        </div>
    );
  };
  
  export default ToastContainer;