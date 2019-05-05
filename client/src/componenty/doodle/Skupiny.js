import React, {Component} from 'react';
import { reduxForm, Field} from 'redux-form';
import { Nav } from 'react-bootstrap';
import { connect} from 'react-redux';
import { compose} from 'redux';

import MujInput from '../mojeComponenty/MujInput';
import MujSkupinovyInput from '../mojeComponenty/MujSkupinovyInput';
import * as actions from '../../actions';
import RenderSkupin from './RenderSkupin';

class Skupiny extends Component{

    state = {
        skupinaState : [],
        skupinaJmeno: "",
        vytvoreniSkupiny:false,
        vytvoreniUdalosti:false,
        pridaniUzivatele:false
    }
    constructor(props){
        super(props)
        this.onSubmitAddUser = this.onSubmitAddUser.bind(this);
        this.onSubmitCreate = this.onSubmitCreate.bind(this);
        this.onSubmitUdalost = this.onSubmitUdalost.bind(this);

        this.ukazPridaniUvivatele = this.ukazPridaniUvivatele.bind(this);
        this.ukazVytvoreniUdalost = this.ukazVytvoreniUdalost.bind(this);
        this.ukazVytvoreniSkupiny = this.ukazVytvoreniSkupiny.bind(this);

        this.getSkupiny = this.getSkupiny.bind(this);
        
        if(this.props.skupiny === undefined){
            this.state.skupinaState = [];
        }else{
            this.state.skupinaState = this.props.skupiny;
        }
        
        console.log('skupState',this.state.skupinaState);
        
    }

    async onSubmitAddUser(data){
        //console.log('dataadd',data);
        //console.log('dataaddstate',this.state);
        await this.props.addUserSkupina(data,this.state.skupinaJmeno);

        
    }

    async onSubmitUdalost(data){
       // console.log('dataadd',data);
       // console.log('dataaddstate',this.state);
        await this.props.addUdalost(data,this.state.skupinaJmeno);

        
    }

    async onSubmitCreate(dataa){
        //console.log('datacreate',dataa);
        await this.props.createSkupinu(dataa);
        
    }
    async getSkupiny(){
        
        await this.props.getSkupina();
        if(this.props.skupiny === undefined){
            this.state.skupinaState = [];
        }else{
            this.state.skupinaState = this.props.skupiny;
        }
      //  console.log('skupState',this.state.skupinaState);
      //  console.log('skupData', this.props.skupiny)
    }

    handleOptionChange = changeEvent => {
        
        this.setState({
            skupinaJmeno: changeEvent.target.value
        });
        
      };

    ukazPridaniUvivatele= () => {
        
        this.setState({
        vytvoreniSkupiny:false,
        vytvoreniUdalosti:false,
        pridaniUzivatele:true
        });
        
      };

    ukazVytvoreniUdalost= () => {
        
        this.setState({
        vytvoreniSkupiny:false,
        vytvoreniUdalosti:true,
        pridaniUzivatele:false
        });
        
      };

    ukazVytvoreniSkupiny= () => {
        
        this.setState({
        vytvoreniSkupiny:true,
        vytvoreniUdalosti:false,
        pridaniUzivatele:false
        });
        
      };
      
    


    render(){
        const { handleSubmit  } =this.props;
        
        //console.log('nazevSkupi',this.props)
        return(
            <div>

                <div>
                    <div className="d-flex justify-content-center">
                        
                        <div>

                            <form>
                            {
                                this.state.skupinaState.map(item => 
                                (<div key={item.SkupinaID} className="udalosti">

                                <p>Nazev Skupiny: {item.Nazev}</p>


                                    
                                        <input
                                        type="radio"
                                        name="check"
                                        key={item.SkupinaID}
                                        checked={this.state.skupinaJmeno === item.Nazev}
                                        onChange={this.handleOptionChange}
                                        onClick={this.handleClick}
                                        value={item.Nazev}
                                        />
                                    
                                
                                
                                
                                </div>))
                            }
                            </form>

                            <form className="getUdalosti" onSubmit={handleSubmit(this.getSkupiny)}>
                                <button type="submit" className="btn btn-dark">Zobraz skupiny</button>
                            </form>
                            <form className="getUdalosti" onSubmit={handleSubmit(this.ukazVytvoreniSkupiny)}>
                                <button type="submit" className="btn btn-dark">Zobraz formulař pro vytvoření skupiny</button>
                            </form>
                            <form className="getUdalosti" onSubmit={handleSubmit(this.ukazVytvoreniUdalost)}>
                                <button type="submit" className="btn btn-dark">Zobraz formulař pro vytvoření udalosti skupiny</button>
                            </form>
                            <form className="getUdalosti" onSubmit={handleSubmit(this.ukazPridaniUvivatele)}>
                                <button type="submit" className="btn btn-dark">Zobraz formulař pro přidání člena do skupiny</button>
                            </form>

                            {this.state.pridaniUzivatele ?
                            <div className="d-flex justify-content-center">
                                <form className="border border-dark p-5 bg-blue" onSubmit={handleSubmit(this.onSubmitAddUser)}>
                                    <div className="form">
                                        
                                        <fieldset>
                                            <Field
                                                name="email"
                                                type="email"
                                                id="emailADD"
                                                label="Zadejte email Uzivatele:"
                                                placeholder="jkjkj@sssds.vvs"
                                                
                                                component={MujSkupinovyInput}/>
                                        </fieldset>
                                    </div>
                                    <div className="mt-2 d-flex justify-content-center">
                                        <button type="submit" className="btn btn-dark">pridej uzivatele</button>
                                    </div>
                                </form>
                            </div>
                            :null}
                            {this.state.vytvoreniUdalosti ?
                            <div className="d-flex justify-content-center">
                                <form className="border border-dark p-5 bg-blue" onSubmit={handleSubmit(this.onSubmitUdalost)}>
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
                                        <button type="submit" className="btn btn-dark">pridej udalost skupiny</button>
                                    </div>
                                </form>
                            </div>
                            :null}

                            {this.state.vytvoreniSkupiny ?
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
                            :null}
                        </div>
                    </div>

                    
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