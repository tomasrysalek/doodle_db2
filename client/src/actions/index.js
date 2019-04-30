import axios from 'axios';
import {AUTH_PRIHLASEN , AUTH_ERROR , AUTH_ODHLASEN} from './type'


export const signUp = data => {


    return async dispatch => {
        try {
            const res = await axios.post('http://localhost:4433/user/signup' , data)
            dispatch({
                type: AUTH_PRIHLASEN,
                payload: res.data.token
            })
            localStorage.setItem('JWT_TOKEN',res.data.token);
        } catch(err){
            dispatch({
                type: AUTH_ERROR,
                payload: 'Email used'
            })
            console.log('err', err)
        }
    }
}

export const signOut = ()=>{
    return dispatch => {
        localStorage.removeItem('JWT_TOKEN');

        dispatch({
            type: AUTH_ODHLASEN,
            payload: ''
        })
    }
}