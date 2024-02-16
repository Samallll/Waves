import { useDispatch, useSelector } from "react-redux"
import { dequeueToast, enqueueToast } from "../features/toastSlice";


const useToastService = () => {

    const dispatch = useDispatch();
    const currentToast = useSelector(state=>state.toast.currentToast)

    const showToast = (message,options) => {

        dispatch(enqueueToast({message,...options}));
        if(!currentToast){
            dispatch(dequeueToast());
        }
    }

    return {showToast};
}

export default useToastService