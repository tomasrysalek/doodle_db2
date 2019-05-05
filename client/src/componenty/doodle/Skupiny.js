import React, {Component} from 'react';
import { reduxForm, Field} from 'redux-form';
import { Nav } from 'react-bootstrap';
import { connect} from 'react-redux';
import { compose} from 'redux';

import MujInput from '../mojeComponenty/MujInput'
import * as actions from '../../actions';
import RenderSkupin from './RenderSkupin';

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
        
        console.log('skupState',this.state.skupinaState);
        
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
        
        await this.props.getSkupina();
        if(this.props.skupiny === undefined){
            this.state.skupinaState = [];
        }else{
            this.state.skupinaState = this.props.skupiny;
        }
        console.log('skupState',this.state.skupinaState);
        console.log('skupData', this.props.skupiny)
    }


    render(){
        const { handleSubmit  } =this.props;
        return(
            <div>
                <div>
                <div className="d-flex justify-content-center">
                    
                    <RenderSkupin item={this.state.skupinaState}/>
                    
                </div>
                <form className="getUdalosti" onSubmit={handleSubmit(this.getSkupiny)}>
                    <button type="submit" className="btn btn-dark">Zobraz skupiny</button>
                </form>
                Najdi si kamarády a udělejte skupinu !!!!
                </div>
                <div className="d-flex justify-content-center">
                    <form className="border border-dark p-5 bg-blue" onSubmit={handleSubmit(this.onSubmitCreate)}>
                        <div className="form">
                            
                            <fieldset>
                                <Field
                                    name="nazev"
                                    type="text"
                                    id="Nazev"
                                    label="Zadejte nazev Skupiny:"
                                    placeholder="Muj Nazev"
                                    component={MujInput}/>
                            </fieldset>
                        </div>
                        <div className="mt-2 d-flex justify-content-center">
                            <button type="submit" className="btn btn-dark">vytvor skupinu</button>
                        </div>
                    </form>
                </div>
                
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