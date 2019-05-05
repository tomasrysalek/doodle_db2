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
            console.log('serverToken',serverToken.token)
            if(serverToken.mssg=== "Email or Password"){
                alert('Email jiz existuje')
                dispatch({
                    type: AUTH_ERROR,
                    payload: res.data.mssg
            })
            }else{
              
                dispatch({
                    type: AUTH_PRIHLASEN,
                    payload: serverToken.token
                });
                
            }
            
            localStorage.setItem('JWT_TOKEN',serverToken.token);
            
            console.log('token',serverToken.token)
            //this.getUdalosti();
            
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

export const getUdalosti = _ => {

    
    return async dispatch => {
        try {
            //nefunguje nevim ako posilat token
            //const res = await axios.get('http://localhost:4433/udalost/all' , localStorage.getItem('JWT_TOKEN'))
            const res = await axios.get('http://localhost:4433/udalost/all',{headers: {"Authorization": 'Bearer ' + localStorage.getItem('JWT_TOKEN')}})
            console.log('datafromserverKal',res)
            const serverKal = res.data;
            console.log('serverKal',serverKal)
            console.log('serverKalUdalost',serverKal.Udalosti)
           
            dispatch({
                type: AUTH_PRIHLASEN,
                udalost: serverKal.Udalosti
            })
                
            
            
        } catch(err){
            
            console.log('err', err)
        }
    }
}

export const addUdalost = data => {

    return async dispatch => {
        try {
            //Pridani tokenu
            await axios.post('http://localhost:4433/udalost/add' , data,{headers: {"Authorization": 'Bearer ' + localStorage.getItem('JWT_TOKEN')}})
            const res = await axios.get('http://localhost:4433/udalost/all',{headers: {"Authorization": 'Bearer ' + localStorage.getItem('JWT_TOKEN')}})
            console.log('datafromserverKal',res.data)
            const serverKal = res.data;
            console.log('serverKal',serverKal)
           
            dispatch({
                type: AUTH_PRIHLASEN,
                udalost: serverKal.Udalosti
            })
            
        } catch(err){
            console.log('err', err)
        }
    }
}

export const createSkupinu = data => {

    return async dispatch => {
        try {
            
            //nefunguje nevim ako posilat token + stejny problem pro pridani skupin
            const res = await axios.post('http://localhost:4433/skupina/create' , data,{headers: {"Authorization": 'Bearer ' + localStorage.getItem('JWT_TOKEN')}})
            console.log('datafromserverskupCreate',res.data)
            const ress = await axios.get('http://localhost:4433/skupina/getsk' , {headers: {"Authorization": 'Bearer ' + localStorage.getItem('JWT_TOKEN')}})
            //nutnost ziskat info o vsech skupinach ve kterych je dany uzivatel
 
            dispatch({
                type: AUTH_PRIHLASEN,
                skupiny: ress.data.skupiny,
                errSkupMsg :res.data.mssg
            })
            
        } catch(err){
            console.log('err', err)
        }
    }
}

export const addUserSkupina = (metadata,jmenoskupiny) => {

    return async dispatch => {
        try {
            console.log('adduresSkupinydatadss',metadata)
            console.log('adduresSkupinydatassd',jmenoskupiny)

            const data = {
                email: metadata.email,
                skupina : jmenoskupiny
            }
            console.log('dataADDSkupina',data)
            
            const res = await axios.post('http://localhost:4433/skupina/adduser' , data)
            //nefunguje nevim ako posilat token + stejny problem pro pridani skupin      

            const ress = await axios.get('http://localhost:4433/skupina/getsk' ,{headers: {"Authorization": 'Bearer ' + localStorage.getItem('JWT_TOKEN')}})
            //nutnost ziskat info o vsech skupinach ve kterych je dany uzivatel
           
            dispatch({
                type: AUTH_PRIHLASEN,
                skupiny: ress.data.skupiny,
                errSkupMsg :res.data.mssg
            })
            
        } catch(err){
            console.log('err', err)
        }
    }
}

export const getSkupina = _ => {

    return async dispatch => {
        try {
            const res = await axios.get('http://localhost:4433/skupina/getsk' ,{headers: {"Authorization": 'Bearer ' + localStorage.getItem('JWT_TOKEN')}})
            //nutnost ziskat info o vsech skupinach ve kterych je dany uzivatel
        
            console.log('datafromserverskup',res.data)
            const serverSkup = res.data;
            console.log('serverSkup',serverSkup.skupiny)

            dispatch({
                type: AUTH_PRIHLASEN,
                skupiny: res.data.skupiny,
                errSkupMsg :res.data.mssg
            })
            
        } catch(err){
            console.log('err', err)
        }
    }
}