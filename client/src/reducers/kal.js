import {AUTH_PRIHLASEN,AUTH_ERROR,AUTH_ODHLASEN} from '../actions/type'
const DEDAULT_STATE = {
    udalosti: []
};

export default (state = DEDAULT_STATE, action) => {
    switch(action.type){
        case AUTH_PRIHLASEN:
            return { ...state,udalosti:action.udalost}
        case AUTH_ERROR:
            return { ...state,udalosti:[]}
        case AUTH_ODHLASEN:
            return { ...state,udalosti:[]}
        default:
            return state;
    }
        
 
    
};