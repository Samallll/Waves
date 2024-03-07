import React from 'react';

const Modal = ({ isOpen, setIsOpen, title, message, type }) => {
  const bgColorClass = () => {
    switch (type) {
      case 'warning':
        return 'text-yellow-900';
      case 'success':
        return 'text-green-900';
      case 'failure':
        return 'text-red-900';
      default:
        return 'text-black';
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="flex items-center justify-center min-h-screen">
        <div className={`inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full bg-white`}>
          <div className="flex justify-center py-3">
            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className={`text-center text-xl leading-6 font-medium ${bgColorClass()}`} id="modal-title">
                    {title}
                  </h3>
                  <div className="mt-2">
                    <p className="text-base text-gray-700">
                      {message}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse sm:justify-center">
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;