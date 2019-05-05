import {AUTH_PRIHLASEN,AUTH_ERROR,AUTH_ODHLASEN} from '../actions/type'
const DEDAULT_STATE = {
    skupina: [],
    errSkupMsg:''
};

export default (state = DEDAULT_STATE, action) => {
    switch(action.type){
        case AUTH_PRIHLASEN:
            return { ...state,skupina:action.skupiny,errSkupMsg:action.errSkupiny}
        case AUTH_ERROR:
            return { ...state,skupina:[],errSkupMsg:''}
        case AUTH_ODHLASEN:
            return { ...state,skupina:[],errSkupMsg:''}
        default:
            return state;
    }
        
 
    
};