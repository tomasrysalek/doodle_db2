
import React, {Component} from 'react';
import { reduxForm, Field} from 'redux-form';
import { Nav } from 'react-bootstrap';
import { connect} from 'react-redux';
import { compose} from 'redux';
import axios from 'axios';

import * as actions from '../../actions';
import * as reducer from '../../reducers';
class Kalendar extends Component{
    state = {
        udalosti : []
    }
    constructor(props){
        super(props)
        this.onSubmit = this.onSubmit.bind(this);
        this.state.udalosti = this.props.kalUdalosti;
    }

    async onSubmit(data){
        //console.log('data',data);
        //await this.props.addUdalost(data);
        
    }

    render(){
        console.log('udd',this.props.kalUdalosti);
        return(
            <div>
                Zacni neco delat a vytvor si svuj kalendar !!!!
            </div>
        );
    };



};

function mapStateProps(state){
    return{
        //kalUdalosti: state.kal.udalosti
        kalUdalosti: state.kal.udalosti
        //isAuth: state.auth.isAuthenticated
    }
}

export default compose(
    connect(mapStateProps,actions),
    reduxForm( {form: 'kalendar'})
)(Kalendar);