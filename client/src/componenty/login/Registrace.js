import React, {Component} from 'reactn';


import { Nav, Form,Button } from 'react-bootstrap';
import axios from 'axios';
import GoogleLogin from 'react-google-login';

import MujInput from '../mojeComponenty/MujInput'
import * as actions from '../../actions';


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
        
        console.log('email',this.state)
        if(this.state.psswd===this.state.passScnd){
            const datas = this.state;
            this.setState({
                email: '',
                psswd: '',
                passScnd: '',
                username:'',
                })
            console.log('statedata',datas)
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
        console.log('datafromserver',res.data)
          const serverToken = res.data;
          console.log('serverToken',serverToken.token)
        if(serverToken.message=== "email"){
            alert('Email jiz existuje')
                
            }else{
                this.setGlobal({isAuth: true,
                    token:serverToken.token,
                    emailUzivatele:data.email});
                localStorage.setItem('isAuth',true);
                localStorage.setItem('JWT_TOKEN',serverToken.token);
                localStorage.setItem('EmailUzivatele',data.email);
                
            }
          
          
          
      } catch(err){
          
          console.log('err', err)
      }

    }
  
    async responseGoogle(ress){
        console.log(ress)
        try {
            const res = await axios.post('http://localhost:4433/user/googleauth' , ress)
            
            console.log('datafromserver',res.data)
            const serverToken = res.data;
            console.log('serverToken',serverToken.token)
            
            this.setGlobal({isAuth: true,
                token:serverToken.token,
                emailUzivatele:serverToken.email});
            localStorage.setItem('isAuth',true);
            localStorage.setItem('JWT_TOKEN',serverToken.token);
            localStorage.setItem('EmailUzivatele',serverToken.email);  
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
            /*
            <div className="d-flex justify-content-center">
                <form className="border border-dark p-5 bg-blue" onSubmit={this.onSubmit}  >
                    <div className="mt-2">
                        <fieldset>
                        <Field
                                name="email"
                                type="email"
                                id="email"
                                autocomplete="username"
                                label="Zadejte váš mail:"
                                placeholder="mujmail@maj.czc"
                                component={MujInput}/>
                        </fieldset>
                    </div>
                    <div className="mt-2">
                        <fieldset>
                        <Field
                                name="psswd"
                                type="password"
                                autocomplete="current-password"
                                id="psswd"
                                label="Zadejte vaše heslo:"
                                placeholder="Heslo"
                                component={MujInput}/>
                        </fieldset>
                    </div>
                    <div className="mt-2">
                        <fieldset>
                        <Field
                                name="passwordsame"
                                type="password"
                                autocomplete="current-password"
                                id="psswd_again"
                                label="Zadejte vaše heslo:"
                                placeholder="Heslo znovu"
                                component={MujInput}/>
                        </fieldset>
                    </div>
                    <div className="mt-2 d-flex justify-content-center">
                        <button type="submit" className="btn btn-dark">Registrovat</button>
                    </div>
                    <div className="registraceLink">
                        <Nav.Link href="/prihlaseni">prihlaseni</Nav.Link>
                    </div>
                    <div>
                        <p>
                            
                        </p>
                    </div>
                </form>
            </div>
            */
        );
    }
};

