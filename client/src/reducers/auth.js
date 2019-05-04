import {AUTH_PRIHLASEN,AUTH_ERROR,AUTH_ODHLASEN} from '../actions/type'

const DEDAULT_STATE = {
    isAuthenticated:false,
    token: '',
    errorMessage: '134'
};

export default (state = DEDAULT_STATE, action) => {
    switch(action.type){
        case AUTH_PRIHLASEN:
            return { ...state,token:action.payload, isAuthenticated:true, errorMessage: ''}
        case AUTH_ODHLASEN:
            return { ...state,token:action.payload, isAuthenticated:false, errorMessage: ''}
        case AUTH_ERROR:
            return { ...state, errorMessage: action.payload}
        default:
            return state;
    }
    
};