import React, {Component} from 'react';
import { reduxForm, Field} from 'redux-form';
import { Nav } from 'react-bootstrap';
import { connect} from 'react-redux';
import { compose} from 'redux';

import MujInput from '../mojeComponenty/MujInput'
import * as actions from '../../actions';

class Prihlaseni extends Component{
    constructor(props){
        super(props)
        this.onSubmit = this.onSubmit.bind(this);
    }

    async onSubmit(data){
        console.log('data',data);
        await this.props.signIn(data);
        await this.props.getUdalosti();
        if(this.props.isAuth){
            this.props.history.push('/kalendar');
        }
    }


    render(){
        console.log('isauth',this.props.isAuth);
        console.log('errmsg',this.props.errMsg);
        console.log('token',this.props.token);
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
                                name="psswd"
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
                    <div>
                        <p>
                            {this.props.errMsg}
                        </p>
                    </div>
                </form>
            </div>
        );
    }
};

function mapStateProps(state){
    return{
        token: state.auth.token,
        errMsg: state.auth.errorMessage,
        isAuth: state.auth.isAuthenticated
    }
}

export default compose(
    connect(mapStateProps,actions),
    reduxForm( {form: 'prihlaseni'})
)(Prihlaseni);