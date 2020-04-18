
import { userRef, authRef,storage,brochureRef} from '../firebase/init';
import { ISLOADING, GET_USERS_LIST, GET_USER } from '../constants/action-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const isLoading = bool => ({
    type: ISLOADING,
    isLoading: bool

});

export const addBrochure = (brochure) => {
   
    return (dispatch) => {
        dispatch(isLoading(true));
        console.log(brochure);
            storage.child(`brochure/${new Date().getTime()}`).put(brochure.picture).then(function(snapshot) {
            snapshot.ref.getDownloadURL().then(function(downloadURL) {
            brochureRef          
            .push({company:brochure.company, date: brochure.date, picture:downloadURL})
            .then (toast.success('Posted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
                }))
            })
        })
            .catch(error => {
                toast.error(error.message);
            })
            
    }
}


