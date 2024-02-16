import { useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import setCanvasPreview from "../../utils/setCanvasPreview";
import axios from "../../utils/axiosHelper";
import useToastService from "../../services/useToastService";
import { useDispatch, useSelector } from "react-redux";
import { updateEvent } from "../../features/eventSlice";

const ASPECT_RATIO = 1.4;
const MIN_WIDTH = 350;
const MIN_HEIGHT = 250;

const ImageCropper = ({ closeModal,imageUploadUrl}) => {

  const {showToast} = useToastService();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const event = useSelector(state=>state.event.event)

  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setError("Please select a valid image");
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalWidth < MIN_WIDTH || naturalHeight < MIN_HEIGHT) {
          setError("Image must be at least 350 x 250 pixels.");
          return setImgSrc("");
        }
      });
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_WIDTH / width) * 100;
    const cropHeightInPercent = (MIN_HEIGHT / height) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
        height: cropHeightInPercent
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  return (
    <>
      <label className="block w-fit">
        <span className="sr-only">Choose profile photo</span>
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-sky-300 hover:file:bg-gray-600"
        />
      </label>
      {error && <p className="text-red-400 text-xs">{error}</p>}
      {imgSrc && (
        <div className="flex flex-col items-center">
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_WIDTH}
            minHeight={MIN_HEIGHT}
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              style={{ maxHeight: "70vh" }}
              onLoad={onImageLoad}
            />
          </ReactCrop>

            <button
                className="text-white font-mono text-xs py-2 px-4 rounded-2xl mt-4 bg-sky-500 hover:bg-sky-600"
                onClick={async () => {
                    setCanvasPreview(
                    imgRef.current, 
                    previewCanvasRef.current,
                    convertToPixelCrop(
                        crop,
                        imgRef.current.width,
                        imgRef.current.height
                    )
                    );
                    const canvas = previewCanvasRef.current;
                    canvas.toBlob(async (blob) => {

                    const croppedFile = new File([blob], 'croppedImage.jpg', {
                        type: 'image/jpeg',
                    });


                    const formData = new FormData();
                    formData.append('file', croppedFile);

                    try {
                        const res = await axios.post(imageUploadUrl, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                        });
                        closeModal();
                        showToast('Image uploaded successfully!', { type: 'success' })
                        dispatch(updateEvent(
                          {...event,
                          eventPictureId:res.data}
                        ))
                    } catch (err) {
                        console.error(err);
                        closeModal();
                        showToast('Image upload Failed. Please try again later!', { type: 'danger' })
                    } finally {
                        closeModal();
                    }
                    }, 'image/jpeg',  0.95); 
                }}
            >
            Crop Image
            </button>
        </div>
      )}
      {crop && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4"
          style={{
            display: "none",
            border: "1px solid black",
            objectFit: "contain",
            width: 350,
            height: 250,
          }}
        />
      )}
    </>
  );
};
export default ImageCropper;