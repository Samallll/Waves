import CloseIcon from "./CloseIcon";
import ImageCropper from "./ImageCropper";

const Modal = ({ closeModal,imageUploadUrl }) => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="crop-image-dialog"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-all backdrop-blur-sm"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-[95%] justify-center px-2 py-12 text-center mt-10">
          <div className="relative w-[95%] sm:w-[80%] min-h-[60vh] rounded-2xl bg-gray-800 text-slate-100 text-left shadow-xl transition-all flex items-center justify-center">
            <div className="px-5 py-4 my-3">
              <button
                type="button"
                className="rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:bg-gray-700 focus:outline-none absolute top-2 right-2"
                onClick={closeModal}
              >
                <span className="sr-only">Close menu</span>
                <CloseIcon />
              </button>
              <ImageCropper
                closeModal={closeModal}
                imageUploadUrl={imageUploadUrl}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;