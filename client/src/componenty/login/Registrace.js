import React, {Component} from 'reactn';


import {  Form,Button } from 'react-bootstrap';
import axios from 'axios';
import GoogleLogin from 'react-google-login';




export default class Registrace extends Component{
    constructor(props){
        super(props)
        this.responseGoogle = this.responseGoogle.bind(this);
        this.state = {
            email: '',
            psswd: '',
            passScnd: '',
            username:'',
            }
    }

    async onSubmit(data){
        data.preventDefault();
        
        if(this.state.psswd===this.state.passScnd){
            const datas = this.state;
            this.setState({
                email: '',
                psswd: '',
                passScnd: '',
                username:'',
                })
            await this.signUp(datas);
            if(this.global.isAuth){
                this.props.history.push(`/kalendar`)
            }
        }else{
            alert('Hesla nejsou stejna')
        }
    }
    handleChange = async (event) => {
        const { target } = event;
        const value = target.value;
        const { name } = target;
        await this.setState({
          [ name ]: value,
        });
    }

    async signUp(data) {
      try {
        const res = await axios.post('http://localhost:4433/user/signup' , data)
          const serverToken = res.data;
        if(serverToken.message=== "email"){
            alert('Email jiz existuje')
                
            }else{
                this.setGlobal({isAuth: true,
                    token:serverToken.token,
                    emailUzivatele:serverToken.username});
                localStorage.setItem('isAuth',true);
                localStorage.setItem('JWT_TOKEN',serverToken.token);
                localStorage.setItem('EmailUzivatele',serverToken.username);
                localStorage.setItem('Email',serverToken.email)

                
            }
      } catch(err){
          console.log('err', err)
      }

    }
  
    async responseGoogle(ress){
        try {
            const res = await axios.post('http://localhost:4433/user/googleauth' , ress)

            const serverToken = res.data;
            
            this.setGlobal({isAuth: true,
                token:serverToken.token,
                emailUzivatele:serverToken.username});
            localStorage.setItem('isAuth',true);
            localStorage.setItem('JWT_TOKEN',serverToken.token);
            localStorage.setItem('EmailUzivatele',serverToken.username);  
            localStorage.setItem('Email',serverToken.email)

            if(this.global.isAuth){
                this.props.history.push(`/kalendar`)
            }
          } catch(err){
              console.log('err', err)
          }

    }

    render(){
       
        const {email,psswd,passScnd,username}=this.state;
        return(
            <div>
               <div className="d-flex justify-content-center ">
                    <Form className="border border-dark p-5 bg-blue" onSubmit={(e) => this.onSubmit(e)}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Zadejte váš mail:</Form.Label>
                            <Form.Control required  name="email" type="email" placeholder="Enter email"  value={ email } onChange={ (e) => this.handleChange(e) }/>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Zadejte váš username:</Form.Label>
                            <Form.Control required  name="username" type="text" placeholder="Enter username"  value={ username } onChange={ (e) => this.handleChange(e) }/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required name="psswd" type="password" placeholder="Password" value={ psswd } onChange={ (e) => this.handleChange(e) }/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required name="passScnd" type="password" placeholder="Password" value={ passScnd } onChange={ (e) => this.handleChange(e) }/>
                        </Form.Group>
                        <div align="center">
                        <Button variant="primary" type="submit">
                            Přihlásit se
                        </Button >
                        <br/>
                        <br/>
                        <GoogleLogin
                            clientId="142150448088-l06fe1kenh32iurkqvtk3kthbpnhrhjp.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                        </div>
                    </Form>
                </div>
                <div>

                </div>
            </div>
        );
    }
};