const DEDAULT_STATE = {
    udalosti: {}
};

export default (state = DEDAULT_STATE, action) => {
    
        
    return { ...state,udalosti:action.udalost}
        
 
    
};