
import { userRef, databaseRef,storage,brochureRef,productRef,timeRef} from '../firebase/init';
import { ISLOADING, UPDATE_FILTER, GET_BROCHURES } from '../constants/action-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export const isLoading = bool => ({
    type: ISLOADING,
    isLoading: bool

});

export const updateFilters = filters => ({
    type: UPDATE_FILTER,
    payload: filters
  });

  export const getBrochureDetail = brochures => ({
    type: GET_BROCHURES,
    payload: brochures
});


export const addBrochure = (brochure) => {
   
    return (dispatch) => {
        dispatch(isLoading(true));
        var newPostKey = brochureRef.push().key;
        
        
            storage.child(`brochure/${new Date().getTime()}`).put(brochure.picture).then(function(snapshot) {
            snapshot.ref.getDownloadURL().then(function(downloadURL) {
            databaseRef.child('brochures/'+newPostKey)          
            .set({company:brochure.company, date: brochure.date, picture:downloadURL,id:newPostKey})
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

// const brochureApi = () => {
//     let brochures=[];
//     brochureRef.once("value").then((snapshot)=>{
//     snapshot.forEach(function (childSnapshot){
//     let values = childSnapshot.val();
    
//     let childData = {
//         company: values.company,
//         date:values.date,
//         picture:values.picture
//     };
//     brochures.push(childData);
    
// });


// })

// return brochures;
// }


export const getBrochure = (filters,callback)=>{

    return(dispatch) =>{
        let brochures=[];
    brochureRef.once("value").then((snapshot)=>{
    snapshot.forEach(function (childSnapshot){
    let values = childSnapshot.val();
    
    let childData = {
        company: values.company,
        date:values.date,
        picture:values.picture
    };
    brochures.push(childData);
    
});
if ( !!filters && filters.length > 0 ){
    brochures = brochures.filter(p =>
      filters.find(f => p.company=== f )
      );
}

if (!!callback){
    callback();
}

dispatch(getBrochureDetail(brochures));
})
}
}


export const addProduct = (product) => {
   
    return (dispatch) => {
        dispatch(isLoading(true));
        var newPostKey = productRef.push().key;
        
        
            
            
            databaseRef.child('products/'+newPostKey)          
            .set({name:product.name, retailer:product.retailer,address:product.address,date: timeRef, price:product.price,id:newPostKey})
            .then (toast.success('Posted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
                }))
            
        
            .catch(error => {
                toast.error(error.message);
            })
            
    }
}