
import React, {Component} from 'reactn';
import { reduxForm, Field} from 'redux-form';
import { Nav, Modal,Button } from 'react-bootstrap';
import { connect} from 'react-redux';
import { compose} from 'redux';
import axios from 'axios';
import Tooltip from 'tooltip.js';

import Popup from "reactjs-popup";
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';



import '../../../node_modules/@fullcalendar/core/main.css';
import '../../../node_modules/@fullcalendar/daygrid/main.css';
import '../../../node_modules/@fullcalendar/timegrid/main.css';
import '../../../node_modules/@fullcalendar/list/main.css';



import RenderUdalost from './RenderUdalost';



export default class Kalendar extends Component{
    calendarComponentRef = React.createRef()
    
    constructor(props){
        super(props)
        this.state={
            show: false
        }
     
    }
    

    async componentDidMount(){
        const res = await axios.get('http://localhost:4433/udalost/all',{headers: {"Authorization": 'Bearer ' + localStorage.getItem('JWT_TOKEN')}})
        console.log('datafromserverKal',res.data.Udalosti)
        const upData = res.data.Udalosti.map((data) => {
            return {
              id: data.UdalostID,
              title: data.Nazev,
              start:data.Datum,
              popis:data.Popis,
              psc:data.PSC,
            };
          });
        this.setGlobal({
            isAuth:localStorage.getItem('isAuth'),
            udalosti : res.data.Udalosti,
            upUdalosti: upData,
            token:localStorage.getItem('JWT_TOKEN')})
        
    }

    
//*
render(){
    
    const udalostMount= this.global.udalosti ;
    console.log('globaludalosti',udalostMount)
    return(
        <div>
            
            <FullCalendar 
                defaultView="dayGridMonth"
                header={{
                left: 'prev ,today',
                center: 'title',
                right: 'next'
                }}
                plugins={[ dayGridPlugin, bootstrapPlugin ]}
                themeSystem='bootstrap'

                events={this.global.upUdalosti}

                ref={ this.calendarComponentRef }
                eventClick={ function(info) {
                    
                    
                    test(info)
                    
                    
                  }
                }
                eventRender={ function(info) {
                    
                  }}
            />

            
            
                
        </div>     
    )
}
    
/*/
    render(){
        
        const { handleSubmit  } =this.props;
        return(
            <div>
            


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
        </div>
        );
    };

//*/

};


function test(info) {
    
    console.log('info',info);
    return(
        
        <Modal show={true} >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer closeButton>
          hoo
        </Modal.Footer>
      </Modal>
        )
}


