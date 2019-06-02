import React, {Component} from 'reactn';

import { Nav, Form,Button } from 'react-bootstrap';
import axios from 'axios';

import GoogleLogin from 'react-google-login';
export default class Prihlaseni extends Component{
    
    constructor(props){
        super(props)
        this.responseGoogle = this.responseGoogle.bind(this);
        this.state = {
                email: '',
                pass: '',
                }
        

    }
    
    async onSubmit(data){
        data.preventDefault();
        
        
        const datas = this.state;
        this.setState({
            email: '',
            pass: '',
            })
        
        await this.signIn(datas);
        if(this.global.isAuth){
            this.props.history.push(`/kalendar`)
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
            if(this.global.isAuth){
                this.props.history.push(`/kalendar`)
            }    
          } catch(err){  
            console.log('err', err)
          }

    }

    
    async signIn(data) {
            try {
                const res = await axios.post('http://localhost:4433/user/login' , data)
                
                const serverToken = res.data;
                
                if(serverToken.mssg=== "Email or Password"){
                    alert('Spatne heslo nebo mail')
                    
                    
                }else{   
                   this.setGlobal({
                       isAuth: true,
                       token:serverToken.token,
                       emailUzivatele:serverToken.username});
                   localStorage.setItem('isAuth',true);
                   localStorage.setItem('JWT_TOKEN',serverToken.token);
                   localStorage.setItem('EmailUzivatele',serverToken.username);
                }
                
            } catch(err){
                
                console.log('err', err)
            }
        
    }


    render(){
        
       const {email,pass}=this.state;
        return(
            
            
            <div className="d-flex justify-content-center">
                <Form className="border border-dark p-5 bg-blue" onSubmit={(e) => this.onSubmit(e)}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Zadejte váš mail:</Form.Label>
                        <Form.Control required  name="email" type="email" placeholder="Enter email"  value={ email } onChange={ (e) => this.handleChange(e) }/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required name="pass" type="password" placeholder="Password" value={ pass } onChange={ (e) => this.handleChange(e) }/>
                    </Form.Group>
                    <div align="center">
                        <Button variant="primary" type="submit">
                            Přihlásit se
                        </Button >
                        <div className="prihlaseniLink">
                            <Nav.Link href="/registrace">Registrace</Nav.Link>
                        </div>
                        <GoogleLogin
                            clientId="142150448088-l06fe1kenh32iurkqvtk3kthbpnhrhjp.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                </Form>
                <div>

                </div>
            </div>
            
        );
    }
};

