import React, {Component} from 'reactn';
import axios from 'axios';
import { Nav } from 'react-bootstrap';


import MujInput from '../mojeComponenty/MujInput';
import MujSkupinovyInput from '../mojeComponenty/MujSkupinovyInput';



export default class Skupiny extends Component{

    
    constructor(props){
        super(props)
        
        console.log("skupiny",this.global)    
    }

    async componentDidMount(){
        const res = await axios.get('http://localhost:4433/skupina/getsk' ,{headers: {"Authorization": 'Bearer ' + localStorage.getItem('JWT_TOKEN')}})  
        console.log('datafromserverskup',res.data)
        const serverSkup = res.data;
        console.log('serverSkup',serverSkup.skupiny)

        
        this.setGlobal({
            isAuth:localStorage.getItem('isAuth'),
            token:localStorage.getItem('JWT_TOKEN'),
            skupiny : res.data.skupiny})
        
    }
    

    render(){
        
        
        console.log('nazevSkupi',this.global)
        return(

            <div>
            skupiny
            </div>
            /*
            <div>

                <div>
                    <div className="d-flex justify-content-center">
                        
                        <div>

                            <form>
                            {
                                this.state.skupinaState.map(item => 
                                (<div key={item.SkupinaID} className="skupiny">

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
                            <div className="btnSkupiny">
                                <form className="getSkupiny" onSubmit={this.getSkupiny}>
                                    <button type="submit" className="btn btn-dark">Zobraz skupiny</button>
                                </form>
                                <form className="getVytvoreniSkupiny" onSubmit={this.ukazVytvoreniSkupiny}>
                                    <button type="submit" className="btn btn-dark">Zobraz formulař pro vytvoření skupiny</button>
                                </form>
                                <form className="getVytvoreniUdalost" onSubmit={this.ukazVytvoreniUdalost}>
                                    <button type="submit" className="btn btn-dark">Zobraz formulař pro vytvoření udalosti skupiny</button>
                                </form>
                                <form className="getPridaniUvivatele" onSubmit={this.ukazPridaniUvivatele}>
                                    <button type="submit" className="btn btn-dark">Zobraz formulař pro přidání člena do skupiny</button>
                                </form>
                            </div>
                            <div className="formSkup">
                                {this.state.pridaniUzivatele ?
                                <div className="d-flex justify-content-center">
                                    <form className="border border-dark p-5 bg-blue" onSubmit={this.onSubmitAddUser}>
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
                                    <form className="border border-dark p-5 bg-blue" onSubmit={this.onSubmitUdalost}>
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
                                    <form className="border border-dark p-5 bg-blue" onSubmit={this.onSubmitCreate}>
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
                
                
            </div>
            */
        );
    }
};



