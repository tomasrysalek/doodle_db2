import React, {Component} from 'react';
import { reduxForm, Field} from 'redux-form';
import { Navbar,   Nav } from 'react-bootstrap';

import MujInput from './MujInput'
class Registrace extends Component{
    onSubmit(data){
        console.log('data',data);
    }
    render(){
        const { handleSubmit } =this.props;
        return(
            <div className="d-flex justify-content-center">
                <form className="border border-dark p-5 bg-blue" onSubmit={handleSubmit(this.onSubmit)}>
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
                                name="newpassword"
                                type="newpassword"
                                autocomplete="new-password"
                                id="newpassword"
                                label="Zadejte vaše heslo:"
                                placeholder="Mojeheslo1"
                                component={MujInput}/>
                        </fieldset>
                    </div>
                    <div className="mt-2">
                        <fieldset>
                            <Field
                                name="newpasswordag"
                                type="newpasswordag"
                                autocomplete="new-password"
                                id="newpasswordag"
                                label="Zadejte znovu vaše heslo:"
                                placeholder="Mojeheslo1"
                                component={MujInput}/>
                        </fieldset>
                    </div>
                    <div className="mt-2 d-flex justify-content-center">
                        <button type="submit" className="btn btn-dark">Přihlásit se</button>
                    </div>
                    <div className="registraceLink">
                        <Nav.Link href="/prihlaseni">prihlaseni</Nav.Link>
                    </div>
                </form>
            </div>
        );
    }
};

export default reduxForm( {form: 'registrace'})(Registrace);