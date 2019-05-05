
import React, {Component} from 'react';
import { reduxForm, Field} from 'redux-form';
import { Nav } from 'react-bootstrap';
import { connect} from 'react-redux';
import { compose} from 'redux';
import axios from 'axios';

import MujInput from '../mojeComponenty/MujInput'
import * as actions from '../../actions';
import * as reducer from '../../reducers';
import RenderUdalost from './RenderUdalost';
class Kalendar extends Component{
    state = {
        udalostiState : []
    }
    constructor(props){
        super(props)
        this.onSubmitadd = this.onSubmitadd.bind(this);
        this.onSubmitget = this.onSubmitget.bind(this);
        
        if(this.props.kalUdalosti === undefined){
            this.state.udalostiState = [];
        }else{
            this.state.udalostiState = this.props.kalUdalosti;
        }
        
        console.log('udalostiState',this.state.udalostiState);
        
    }

    async onSubmitadd(data){
        console.log('data',data);
        await this.props.addUdalost(data);
        
    }

    async onSubmitget(){
        await this.props.getUdalosti();
        if(this.props.kalUdalosti === undefined){
            this.state.udalostiState = [];
        }else{
            this.state.udalostiState = this.props.kalUdalosti;
        }
        console.log('onSubmitPrirazeni',this.props.kalUdalosti)
    }

    

    render(){
        
        const { handleSubmit  } =this.props;
        return(
            <div className="d-flex justify-content-center">
                <div className="udalostiKal">
                    
                    <RenderUdalost item={this.state.udalostiState}/>
                    {console.log('kalerrMsg',this.props.errMsg)}
                    {console.log('kalisAuth',this.props.isAuth)}
                    {console.log('kalUdalosti',this.props.kalUdalosti)}
                </div>

                <form className="getUdalosti" onSubmit={handleSubmit(this.onSubmitget)}>
                    <button type="submit" className="btn btn-dark">Zobraz udalosti</button>
                </form>
                
                
                
                
                <div className="d-flex formKal">
                <form className="border border-dark p-5 bg-blue" onSubmit={handleSubmit(this.onSubmitadd)}>
                    <div className="form">
                        
                        <fieldset>
                            <Field
                                name="nazev"
                                type="text"
                                id="Nazev"
                                label="Zadejte nazev udalosti:"
                                placeholder="Muj Nazev"
                                component={MujInput}/>
                        </fieldset>
                        <fieldset>
                            <Field
                                name="popis"
                                type="text"
                                id="Popis"
                                label="Zadejte popis udalosti:"
                                placeholder="Muj popis"
                                component={MujInput}/>
                        </fieldset>
                        <fieldset>
                            <Field
                                name="datum"
                                type="datetime-local"
                                id="Datum"
                                label="Zadejte datum:"
                                placeholder="21.2.2511"
                                component={MujInput}/>
                        </fieldset>
                        <fieldset>
                            <Field
                                name="adresa"
                                type="text"
                                id="adresa"
                                label="Zadejte adresa:"
                                placeholder="Mesto Ulice"
                                component={MujInput}/>
                        </fieldset>
                        <fieldset>
                            <Field
                                name="psc"
                                type="number"
                                id="PSC"
                                label="Zadej PSC"
                                placeholder="12345"
                                component={MujInput}/>
                        </fieldset>
                    </div>
                    <div className="mt-2 d-flex justify-content-center">
                        <button type="submit" className="btn btn-dark">pridej udalost</button>
                    </div>
                </form>
            </div>
        </div>
           
        );
    };



};



function mapStateProps(state){
    return{
        errMsg: state.auth.errorMessage,
        isAuth: state.auth.isAuthenticated,
        kalUdalosti: state.kal.udalosti
    }
}

export default compose(
    connect(mapStateProps,actions),
    reduxForm( {form: 'kalendar'})
)(Kalendar);