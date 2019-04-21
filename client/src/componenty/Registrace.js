import React, {Component} from 'react';
import { reduxForm, Field} from 'redux-form';
import { Navbar,   Nav } from 'react-bootstrap';
import MujInput from './MujInput'
import TextField from '@material-ui/core/TextField';
import MaterialForm from 'react-material-ui-form';


class Registrace extends Component{

    onSubmit(data){
        console.log('data',data);
    }

    render(){
        const { handleSubmit  } =this.props;
        return(
            <div className="d-flex justify-content-center">
                <MaterialForm className="border border-dark p-5 bg-blue" onSubmit={handleSubmit(this.onSubmit)}  method="post" autoComplete="on" >
                    <div className="mt-2">
                        <fieldset>
                            <TextField id="email" label="Email"  type="email" required="true" />
                        </fieldset>
                    </div>
                    <div className="mt-2">
                        <fieldset>
                            <TextField id="psswd" label="Heslo"  type="password" required="true"/>
                        </fieldset>
                    </div>
                    <div className="mt-2">
                        <fieldset>
                            <TextField id="psswd" label="Heslo znovu" type="password" data-validators="isRequired" required="true"/>
                        </fieldset>
                    </div>
                    <div className="mt-2 d-flex justify-content-center">
                        <button type="submit" className="btn btn-dark">Registrovat</button>
                    </div>
                    <div className="registraceLink">
                        <Nav.Link href="/prihlaseni">prihlaseni</Nav.Link>
                    </div>
                </MaterialForm>
            </div>
        );
    }
};

export default reduxForm( {form: 'registrace'})(Registrace);