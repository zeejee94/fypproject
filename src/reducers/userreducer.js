import { ISLOADING, GET_USERS_LIST,GET_USER } from '../constants/action-types';
const getInitialState = () => ({
    user:[],
    users: [],
    isLoading: false,
  });
const userReducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case ISLOADING:
            return { ...state, isLoading: action.isLoading };
        case GET_USERS_LIST:
            return { ...state, users: action.users };
        case GET_USER:
            return {...state,user:action.user};
        default:
            return state;
    }
}
export default userReducer;