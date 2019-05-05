import React, {Component} from 'react';
import { reduxForm, Field} from 'redux-form';
import { Nav } from 'react-bootstrap';
import { connect} from 'react-redux';
import { compose} from 'redux';

import * as actions from '../../actions';

class Skupiny extends Component{

    state = {
        skupinaState : []
    }
    constructor(props){
        super(props)
        this.onSubmitAddUser = this.onSubmitAddUser.bind(this);
        this.onSubmitCreate = this.onSubmitCreate.bind(this);

        this.getSkupiny = this.getSkupiny.bind(this);
        
        if(this.props.skupiny === undefined){
            this.state.skupinaState = [];
        }else{
            this.state.skupinaState = this.props.skupiny;
        }
        
        console.log('udalostiState',this.state.skupinaState);
        
    }

    async onSubmitAddUser(data){
        console.log('dataadd',data);
        await this.props.addUserSkupina(data);
        
    }

    async onSubmitCreate(dataa){
        console.log('datacreate',dataa);
        await this.props.createSkupinu(dataa);
        
    }
    async getSkupiny(){
        
        await this.props.getUdalosti();
        
    }


    render(){
        return(
            <div>
                Najdi si kamarády a udělejte skupinu !!!!
            </div>
        );
    }
};

function mapStateProps(state){
    return{
        isAuth: state.auth.isAuthenticated,
        skupiny: state.skup.skupina,
        errskupiny: state.skup.errSkupMsg
    }
}

export default compose(
    connect(mapStateProps,actions),
    reduxForm( {form: 'skupiny'})
)(Skupiny);