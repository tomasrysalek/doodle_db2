
import React, {Component} from 'reactn';
import ReactDOM from 'react-dom'

import { Form,Modal,Button,Container,Row,Col } from 'react-bootstrap';
import Iframe from 'react-iframe'
import axios from 'axios';


import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import Linkify from 'react-linkify';


import '../../../node_modules/@fullcalendar/core/main.css';
import '../../../node_modules/@fullcalendar/daygrid/main.css';
import '../../../node_modules/@fullcalendar/timegrid/main.css';
import '../../../node_modules/@fullcalendar/list/main.css';




function openMaps(Adresa){
    const add = "https://www.google.com/maps/embed/v1/place?key=AIzaSyA84oBfGeoMJXBDB85tdcNE3XOfpywuc6k&q="+Adresa;
    const element = <Iframe 
    url="https://www.google.com/maps/embed/v1/place?key=AIzaSyA84oBfGeoMJXBDB85tdcNE3XOfpywuc6k
    &q=Space+Needle,Seattle+WA" allowfullscreen
    width="100%"
    height="450px"
    id="myId"
    className="myClassname"
    display="initial"
    position="relative"/>
    ReactDOM.render(element,document.getElementById('map'))
    document.getElementById('myId').setAttribute("src",add)

}

export default class Kalendar extends Component{
    calendarComponentRef = React.createRef()
    
    constructor(props){
        super(props)
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state=defState()
     
    }

    //zavřeni vyskakovaciho okna a nastaveni state do vychozi hodnoty
    handleClose() {
        
        this.setState(defState());
        
    }
    
    //zobrazeni vyskakovaciho okna
    handleShow() {
        this.setState({ show: true });
    }

    //odeslani dat na serveru a vytvoreni udalosti
    async addUdalost(data) {
        
        try {
            let datas = transformDataToAdd(data);
            datas.email = localStorage.getItem('Email')
            const res = await axios.post('http://localhost:4433/udalost/add' , datas,{headers: {"Authorization": 
                    'Bearer ' + localStorage.getItem('JWT_TOKEN')}})            
        } catch(err){
            
            console.log('err', err)
        }
       
    }
    
    //nastaveni statu z formulare
    handleChange = async (event) => {
        const { target } = event;
        const value = target.value;
        const { name } = target;
        await this.setState({
          [ name ]: value,
        });
    }

    //nastaveni a odeslani dat pri potvrzeni formulare
    async onSubmit(data){
        data.preventDefault();
        const datas = this.state;
        this.setState(defState());

        await this.addUdalost(datas);
        
    }

    //ziskani udalosti
    async getUdalosti(){
        try{
        const res = await axios.get('http://localhost:4433/udalost/all',{headers: {"Authorization": 'Bearer ' + localStorage.getItem('JWT_TOKEN')}});
       
        this.setGlobal({
            isAuth:localStorage.getItem('isAuth'),
            udalosti : res.data.Udalosti,
            upUdalosti: transformDataFromGet(res),
            token:localStorage.getItem('JWT_TOKEN')});
        }catch(err){
            console.log('err',err);
        }
    }

    
    async componentDidMount(){
        await this.getUdalosti();
        
    }

    componentDidUpdate(prevProps, prevState){
        

        if (prevState.show !==this.state.show ){
            this.getUdalosti();
            
        }
       
    }
    
    

render(){
    
    const udalostMount= this.global.upUdalosti ;
    const {popis,psc,nazev,adresa,datum,infoCas,infoPopis,infoPsc,infoTitle,file}=this.state;
    return(
        <div>

            <Container>
            
            <Row className='m-1'>
                <Col></Col>
                <Col md="auto">
                <Button variant="dark" onClick={this.handleShow}>
                        Pridej udalost
                    </Button>
                </Col>
                <Col></Col>
            </Row>
            </Container>

            
            
            <FullCalendar 
                defaultView="dayGridMonth"
                header={{
                left: 'prev ,today',
                center: 'title',
                right: 'next'
                }}
                //plugins={[ dayGridPlugin, bootstrapPlugin ]}
                //themeSystem='bootstrap'
                plugins={[ dayGridPlugin]}
                events={udalostMount}

                

                ref={ this.calendarComponentRef }
                eventClick={ (info) =>{
                    const eventtst = new Date(info.event._def.extendedProps.datum);

                    var datetst = JSON.stringify(eventtst)
                    datetst = datetst.slice(1,11)
                    this.setState({
                        showUdalost: true,
                        infoTitle: info.event._def.title,
                        infoPopis: info.event._def.extendedProps.popis,
                        infoPsc: info.event._def.extendedProps.psc,
                        infoCas: datetst,
                    })
                  }
                }
                eventRender={ function(info) {
                    
                  }}
            />
            {/*pridani udalosti */}
            <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Přidej událost</Modal.Title>
            </Modal.Header>

            <Form className="border border-dark p-5 bg-blue" onSubmit={(e) => this.onSubmit(e)} >
            <Modal.Body>
                    <Form.Group controlId="formBasicEmail" >
                        <Form.Label>Zadejte nazev udalosti:</Form.Label>
                        <Form.Control required
                                name="nazev"
                                type="text"
                                placeholder="Muj Nazev"  value={ nazev } onChange={ (e) => this.handleChange(e) }/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Zadejte popis udalosti:</Form.Label>
                        <Form.Control  
                                name="popis"
                                type="text"
                                placeholder="Muj popis" value={ popis } onChange={ (e) => this.handleChange(e) }/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Zadejte datum:</Form.Label>
                        <Form.Control required
                                name="datum"
                                type="datetime-local"
                                placeholder="21.2.2511" value={ datum } onChange={ (e) => this.handleChange(e) }/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Zadejte adresa:</Form.Label>
                        <Form.Control 
                                name="adresa"
                                type="text"
                                placeholder="Mesto Ulice" value={ adresa } onChange={ (e) => this.handleChange(e) }/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Zadej PSC:</Form.Label>
                        <Form.Control 
                                name="psc"
                                type="number"
                                placeholder="12345" value={ psc } onChange={ (e) => this.handleChange(e) }/>
                    </Form.Group>
                    <Form.Group controlId="formFile" >
                        <Form.Label>Vlož soubor (Ve formátu PDF, Doc, Img): </Form.Label>
                        <Form.Control 
                                name="file"
                                type="file"
                                id="fileInput"
                                accept="image/*,.pdf,.doc" value={ file } onChange={ (e) => this.handleChange(e) }/>
                    </Form.Group>
                    
                </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary"  onClick={this.handleClose}>
                Close
                </Button>
                <Button variant="primary" type="submit">
                Přidej událost
                </Button>
            </Modal.Footer>
            </Form>
            </Modal>

            {/*zobrazeni podrobnosti o udalosti */}
            <Modal show={this.state.showUdalost} onHide={this.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Udalost</Modal.Title>
            </Modal.Header>
            <Form className="border border-dark p-5 bg-blue">
                <Modal.Body>
                  <p>Název události: {infoTitle}</p>
                  <p><Linkify>Popis události: {infoPopis}</Linkify></p>
                  <p>Cas události: {infoCas}</p>
                  <p>Místo události:<a href="#" onClick={()=>{
                     openMaps(infoPsc)
                  }}>{infoPsc}</a></p>
                  <div id="map" width="100%"></div>
                </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary"  onClick={this.handleClose}>
                Close
                </Button>
                
            </Modal.Footer>
            </Form>
            </Modal>

            
                
        </div>     
    )
}
    



};


function defState() {
    return {
        showUdalost:false,
        show: false,
        infoTitle: '',
        infoPopis:'',
        infoPsc:'',
        infoCas:'',
        nazev: '',
        popis: '',
        adresa: '',
        psc: '',
        datum:'',
        file:[],
    };
}

function transformDataToAdd(data) {
    return {
        nazev: data.nazev,
        popis: data.popis,
        datum: data.datum,
        adresa: data.adresa,
        psc: data.psc,
        skupina :null,
        file:data.file,
    };
}

function transformDataFromGet(res) {
    const sss = res.data.Udalosti.map((data) => {
        return {
          id: data.UdalostID,
          title: data.Nazev,
          start:data.Datum,
          datum:data.Datum,
          popis:data.Popis,
          psc:(data.Adresa) ? data.Adresa + " " + data.PSC : "",
          color:(data.SkupinaID) ? "blue" : "green"
        };
      });
    return sss;
}





