import axios from 'axios';
import {AUTH_PRIHLASEN , AUTH_ERROR , AUTH_ODHLASEN} from './type'


export const signUp = data => {

    
    return async dispatch => {
        try {
            const res = await axios.post('http://localhost:4433/user/signup' , data)
            console.log('datafromserver',res.data)
            const serverToken = res.data;
            console.log('serverToken',serverToken)
            if(serverToken.message=== "email"){
                alert('Email jiz existuje')
                dispatch({
                    type: AUTH_ERROR,
                    payload: res.data.message
            })
            }else(

                dispatch({
                    type: AUTH_PRIHLASEN,
                    payload: res.data.message
                })
                
            )
            
            localStorage.setItem('JWT_TOKEN',res.data.token);
            console.log('token',res.data.token)
            
        } catch(err){
            dispatch({
                type: AUTH_ERROR,
                payload: 'Email used'
            })
            console.log('err', err)
        }
    }
}

export const signIn = data => {

    
    return async dispatch => {
        try {
            const res = await axios.post('http://localhost:4433/user/login' , data)
            console.log('datafromserver',res.data)
            const serverToken = res.data;
            console.log('serverToken',serverToken)
            if(serverToken.mssg=== "Email or Password"){
                alert('Email jiz existuje')
                dispatch({
                    type: AUTH_ERROR,
                    payload: res.data.mssg
            })
            }else{
                
                dispatch({
                    type: AUTH_PRIHLASEN,
                    payload: res.data.mssg
                });
                this.getUdalosti();
            }
            
            localStorage.setItem('JWT_TOKEN',res.data.token);
            console.log('token',res.data.token)
            
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
            payload: '',
            udalost: {}
        })
    }
}

export const getUdalosti = _ => {

    
    return async dispatch => {
        try {
            const res = await axios.post('http://localhost:4433/udalost/getAll' , localStorage.getItem('JWT_TOKEN'))
            console.log('datafromserverKal',res.data)
            const serverKal = res.data;
            console.log('serverKal',serverKal)
           
            dispatch({
                udalost: serverKal.Udalosti
            })
                
            
            
        } catch(err){
            
            console.log('err', err)
        }
    }
}

export const getAdd = data => {

    return async _ => {
        try {
            await axios.post('http://localhost:4433/udalost/add' , data)
            
            
        } catch(err){
            console.log('err', err)
        }
    }
}