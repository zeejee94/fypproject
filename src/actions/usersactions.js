import { ISLOADING, GET_USERS_LIST, GET_USER } from '../constants/action-types';
import { userRef, authRef,storage } from '../firebase/init';
import toastr from 'toastr';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const isLoading = bool => ({
    type: ISLOADING,
    isLoading: bool

});
export const getUserList = users => ({
    type: GET_USERS_LIST,
    users
});
export const getUserDetail = user => ({
    type: GET_USER,
    user
});


export const getUser = () => {
    return (dispatch) => {
        dispatch(isLoading(true));
        let user = [];
        userRef.once("value").then((snapshot) => {
            snapshot.forEach(function (childSnapshot) {
                let values = childSnapshot.val();
                let userUid = authRef.currentUser.uid;
                if (values.id == userUid){
                let childData = {
                    id: values.id,
                    firstname: values.firstname,
                    lastname: values.lastname,
                    email: values.email,
                    phone: values.phone,
                    key:childSnapshot.key,
                    userrole: values.userrole,
                    picture:values.picture

                };
            
                user.push(childData);
            }
            });
            
            dispatch(getUserDetail(user));
        })

    }
}

export const getUsers = () => {
    return (dispatch) => {
        dispatch(isLoading(true));
        let users = [];
        userRef.once("value").then((snapshot) => {
            snapshot.forEach(function (childSnapshot) {
                let values = childSnapshot.val();
              
                let childData = {
                    id: values.id,
                    firstname: values.firstname,
                    lastname: values.lastname,
                    email: values.email,
                    phone: values.phone,
                    key:childSnapshot.key,
                    userrole: values.userrole


                };
            
                users.push(childData);
            
            });
            dispatch(getUserList(users));
        })

    }
}
export const addUser = (user,password) => {
    return (dispatch) => {
        dispatch(isLoading(true));
        authRef
            .createUserWithEmailAndPassword(user.email, password)
            .then((res) => {
                user.id = res.user.uid;
                userRef.push(user, (res) => {
                    toast.success('User added!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                        });
                });
            })
    }
}
export const editUser = (user) => {
   
    return (dispatch) => {
        dispatch(isLoading(true)); 
        if(user.picture!=null){
            storage.child(`users-profile/${new Date().getTime()}`).put(user.picture).then(function(snapshot) {
            snapshot.ref.getDownloadURL().then(function(downloadURL) {
            userRef
            .child(user.key)
            .update({firstname:user.firstname, lastname: user.lastname, phone: user.phone, userrole:user.userrole, picture:downloadURL})
            .then (toast.success('User Edited!', {
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
            })}

            else
        {
            userRef
            .child(user.key)
            .update({firstname:user.firstname, lastname: user.lastname, phone: user.phone, userrole:user.userrole})
            .then (toast.success('User Edited!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
                }))
        }
            
    }
}
export const removeUser=(key)=>{
    return (dispatch) => {
        dispatch(isLoading(true));
        var data=userRef.equalTo({key});
       
    }
}

