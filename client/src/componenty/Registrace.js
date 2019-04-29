import React, {Component} from 'react';
import { reduxForm, Field} from 'redux-form';
import { Navbar,   Nav } from 'react-bootstrap';
import MujInput from './MujInput'
import TextField from '@material-ui/core/TextField';
import MaterialForm from 'react-material-ui-form';
import { connect} from 'react-redux';
import { compose} from 'redux';
import * as actions from '../actions';

class Registrace extends Component{
    state = {
        psswd: '',
        confirmPassword: ''
    }  
    

    constructor(props){
        super(props)
        this.onSubmit = this.onSubmit.bind(this);
    }

   
    async onSubmit(data){
        console.log('data',data);
        await this.props.signUp(data);
    }

    render(){
        const { handleSubmit  } =this.props;
        return(
            <div className="d-flex justify-content-center">
                <form className="border border-dark p-5 bg-blue" onSubmit={handleSubmit(this.onSubmit)}  >
                    <div className="mt-2">
                        <fieldset>
                        <Field
                                name="email"
                                type="text"
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
                                placeholder="Mojeheslo1"
                                component={MujInput}/>
                        </fieldset>
                    </div>
                    <div className="mt-2">
                        <fieldset>
                        <Field
                                name="passwordsame"
                                type="password"
                                autocomplete="current-password"
                                id="psswd"
                                label="Zadejte vaše heslo:"
                                placeholder="Mojeheslo1"
                                component={MujInput}/>
                        </fieldset>
                    </div>
                    <div className="mt-2 d-flex justify-content-center">
                        <button type="submit" className="btn btn-dark">Registrovat</button>
                    </div>
                    <div className="registraceLink">
                        <Nav.Link href="/prihlaseni">prihlaseni</Nav.Link>
                    </div>
                </form>
            </div>
        );
    }
};

export default compose(
    connect(null,actions),
    reduxForm( {form: 'registrace'})
)(Registrace);

