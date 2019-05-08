import React, {Component} from 'reactn';


import { Nav, Form,Button } from 'react-bootstrap';
import axios from 'axios';


import MujInput from '../mojeComponenty/MujInput'
import * as actions from '../../actions';


export default class Registrace extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            pass: '',
            passScnd: '',
            }
    }

    async onSubmit(data){
        data.preventDefault();
        
        console.log('email',this.state)
        if(this.state.pass===this.state.passScnd){
            const datas = this.state;
            this.setState({
                email: '',
                pass: '',
                passScnd: '',
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
                this.setGlobal({isAuth: true,token:serverToken.token});
                localStorage.setItem('isAuth',true);
                localStorage.setItem('JWT_TOKEN',serverToken.token);
               
                
            }
          
          
          
      } catch(err){
          
          console.log('err', err)
      }

}
  


    render(){
       
        const {email,pass,passScnd}=this.state;
        return(
            <div>
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
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required name="passScnd" type="password" placeholder="Password" value={ passScnd } onChange={ (e) => this.handleChange(e) }/>
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">
                        Přihlásit se
                    </Button >
                    <div className="prihlaseniLink">
                        <Nav.Link href="/registrace">Registrace</Nav.Link>
                    </div>
                    
                </Form>
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

