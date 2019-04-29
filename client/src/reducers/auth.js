import {AUTH_PRIHLASEN,AUTH_ERROR} from '../actions/type'

const DEDAULT_STATE = {
    isAuthenticated:false,
    token: '',
    errorMessage: ''
};

export default (state = DEDAULT_STATE, action) => {
    switch(action.type){
        case AUTH_PRIHLASEN:
            return { ...state,token:action.payload, isAuthenticated:true, errorMessage: ''}
        case AUTH_ERROR:
            return { ...state, errorMessage: action.payload}
        default:
            return state;
    }
    
};