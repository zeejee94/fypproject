import { GET_BROCHURES,UPDATE_FILTER } from '../constants/action-types';

const initialState = {
  brochures: [],
  items: []
};

const  productreducer = (state = initialState, action) =>{
  switch (action.type) {
    case GET_BROCHURES:
      return {
        ...state,
        brochures: action.payload
      };
    case UPDATE_FILTER:
    return {
        ...state,
        items: action.payload
    };
    default:
      return state;
  }
}
export default productreducer;