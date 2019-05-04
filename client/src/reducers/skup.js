import {AUTH_PRIHLASEN,AUTH_ERROR,AUTH_ODHLASEN} from '../actions/type'
const DEDAULT_STATE = {
    skupina: []
};

export default (state = DEDAULT_STATE, action) => {
    switch(action.type){
        case AUTH_PRIHLASEN:
            return { ...state,skupina:action.skupiny}
        case AUTH_ERROR:
            return { ...state,skupina:[]}
        case AUTH_ODHLASEN:
            return { ...state,skupina:[]}
        default:
            return state;
    }
        
 
    
};