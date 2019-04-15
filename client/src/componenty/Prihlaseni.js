import React, {Component} from 'react';
import { reduxForm, Field} from 'redux-form';
import MujInput from './MujInput'
import { Nav } from 'react-bootstrap';

class Prihlaseni extends Component{
    onSubmit(data){
        console.log('data',data);
    }
    render(){
        const { handleSubmit } =this.props;
        return(
            <div className="d-flex justify-content-center">
                <form className="border border-dark p-5 bg-blue" onSubmit={handleSubmit(this.onSubmit)}>
                    <div className="">
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
                    <div>
                        <fieldset>
                            <Field
                                name="password"
                                type="password"
                                autocomplete="current-password"
                                id="password"
                                label="Zadejte vaše heslo:"
                                placeholder="Mojeheslo1"
                                component={MujInput}/>
                        </fieldset>
                    </div>
                    <div className="mt-2 d-flex justify-content-center">
                        <button type="submit" className="btn btn-dark">Přihlásit se</button>
                    </div>
                    <div className="prihlaseniLink">
                        <Nav.Link href="/registrace">Registrace</Nav.Link>
                    </div>
                </form>
            </div>
        );
    }
};

export default reduxForm( {form: 'prihlaseni'})(Prihlaseni);