import React, {Component} from 'reactn';
import axios from 'axios';
import { Nav,Form,Modal,Button,Table } from 'react-bootstrap';


import MujInput from '../mojeComponenty/MujInput';
import MujSkupinovyInput from '../mojeComponenty/MujSkupinovyInput';



export default class Skupiny extends Component{

    
    constructor(props){
        super(props)
        this.handleShowPriUdal = this.handleShowPriUdal.bind(this);
        this.handleShowPriUziv = this.handleShowPriUziv.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShowVyt = this.handleShowVyt.bind(this);
        this.handleSmazSkup = this.handleSmazSkup.bind(this);
        this.handleChat = this.handleChat.bind(this);

        this.state={
            showVySkup: false,
            showPriUdalosti: false,
            showPriUzivatele: false,
            showClenySkup:false,
            nazevSkup: '',
            smazPls:'',
            email: '',
            nazev: '',
            popis: '',
            adresa: '',
            psc: '',
            datum:'',
        }
        
            
    }

    handleClose() {
        this.setState({
            nazevSkup: '',
            smazPls:'',
            email: '',
            nazev: '',
            popis: '',
            adresa: '',
            psc: '',
            datum:'',
            showClenySkup:false,
            showVySkup: false,
            showPriUdalosti: false,
            showPriUzivatele: false,
            });
    }
    
    handleShowVyt() {
        this.setState({ showVySkup:true }); 
    }
    
    handleShowPriUdal= async (event) => {
        this.setState({ showPriUdalosti: true,nazevSkup:event.target.name });
        console.log("handleShow event",this.state)
    }
    handleShowPriUziv= async (event) => {
        this.setState({ showPriUzivatele: true,nazevSkup:event.target.name });
        console.log("handleShow event",this.state)
    }
    handleSmazSkup= async (event) => {
        await this.setState({ smazPls:event.target.name });
        console.log("handleSmazSkup",this.state)
        this.smazaniSkupiny(this.state)

    }

    handleChat= async (event) => {
        const data = {
            name:localStorage.getItem('EmailUzivatele') ,
            room:event.target.name,
            tokem: localStorage.getItem('JWT_TOKEN')
        }
        //Zatim jediny reseni, ktery funguje
        window.open("http://www.localhost:4433?name="+data.name+"&room="+data.room)
        //TODO redirect
        // this.props.history.push({
        //     pathname:"http://www.localhost:4433",
        //     Header:data,
        //    });
        

        console.log('data chat',data)     
        
    }

    async smazaniSkupiny(data){
        try {

        //console.log('email',this.state);
        const datas = {
            
              skupina: data.smazPls,
              
            
          };
        
        console.log('datas smaz',datas);
        await axios.delete('http://localhost:4433/skupina/delete' , datas)
        //console.log('datafromserverskupCreate',res.data)
    } catch(err){
            
        console.log('err', err)
    }
    }

    async getSkupiny(){
        try{

        
            const res = await axios.get('http://localhost:4433/skupina/getsk' ,{headers: {"Authorization": 'Bearer ' + localStorage.getItem('JWT_TOKEN')}})  
            console.log('skupuiny',res.data)
      
            this.setGlobal({
                isAuth:localStorage.getItem('isAuth'),
                token:localStorage.getItem('JWT_TOKEN'),
                skupiny : res.data.skupiny})
        }catch(err){
            console.log('err',err)
        }
    }

    async getUdalosSkup(){
        try{

        
            const res = await axios.get('http://localhost:4433/skupina/getAll' ,{headers: {"Authorization": 'Bearer ' + localStorage.getItem('JWT_TOKEN')}})  
            console.log('skupuiny',res.data)
      
            this.setGlobal({
                isAuth:localStorage.getItem('isAuth'),
                token:localStorage.getItem('JWT_TOKEN'),
                skupiny : res.data.skupiny})
        }catch(err){
            console.log('err',err)
        }
    }

    async componentDidMount(){
        await this.getSkupiny();
        
    }

    async componentDidUpdate(prevProps, prevState){

        if (prevState.showVySkup !==this.state.showVySkup
             || prevState.showPriUdalosti !==this.state.showPriUdalosti
             || prevState.showPriUzivatele !==this.state.showPriUzivatele
             || prevState.showClenySkup !==this.state.showClenySkup){
            
                await this.getSkupiny();
            
        }
       
    }
    

    handleChange = async (event) => {
        const { target } = event;
        const value = target.value;
        const { name } = target;
        await this.setState({
          [ name ]: value,
        });
        console.log('state',this.state)
    }

    async onSubmitVytSkup(data){
        data.preventDefault();
        
        console.log('email',this.state);
        const datas = this.state;

        this.setState({
            showVySkup: false,
            showPriUdalosti: false,
            showPriUzivatele: false,
            nazevSkup: '',
            email: '',
            nazev: '',
            popis: '',
            adresa: '',
            psc: '',
            datum:'',
            });
        this.vytvoreniSkupiny(datas);
        //console.log('statedata',datas);
        //await this.addUdalost(datas);
        //console.log("ahoj")
        //await this.getUdalosti();
        
    }

    

    async vytvoreniSkupiny(data){
        try {

        //console.log('email',this.state);
        const datas = {
            
              nazev: data.nazevSkup,
              
            
          };
        
        console.log('datas',datas);
        await axios.post('http://localhost:4433/skupina/create' , datas,{headers: {"Authorization": 'Bearer ' + localStorage.getItem('JWT_TOKEN')}})
        //console.log('datafromserverskupCreate',res.data)
    } catch(err){
            
        console.log('err', err)
    }
    }

    async onSubmitPridejUzivatele(data){
        data.preventDefault();
        
        console.log('PridejUzivatele',this.state);
        const datas = this.state;

        this.setState({
            showVySkup: false,
            showPriUdalosti: false,
            showPriUzivatele: false,
            nazevSkup: '',
            nazev: '',
            popis: '',
            adresa: '',
            psc: '',
            datum:'',
            });
        this.pridaniUzivatele(datas);
        //console.log('statedata',datas);
        //await this.addUdalost(datas);
        //console.log("ahoj")
        //await this.getUdalosti();
        
    }

    

    async pridaniUzivatele(data){
        try {

        //console.log('email',this.state);
        const datas = {
            
              email: data.email,
              skupina :data.nazevSkup,
            
          };
        
        console.log('datasPRiUziv',datas);
        const res = await axios.post('http://localhost:4433/skupina/adduser' , datas)
        //console.log('datafromserverskupCreate',res.data)
    } catch(err){
            
        console.log('err', err)
    }
    }

    async onSubmitVytvorUdalost(data){
        data.preventDefault();
        
        //console.log('email',this.state);
        const datas = this.state;
        this.setState({
            nazev: '',
            popis: '',
            adresa: '',
            psc: '',
            datum:'',
            show:false
            });
        //console.log('statedata',datas);
        await this.addUdalost(datas);
        //console.log("ahoj")
        
        
    }

    async addUdalost(data) {
        console.log('testadd data',data)
        try {
            const datas = {
                nazev: data.nazev,
                popis: data.popis,
                datum: data.datum,
                adresa: data.adresa,
                psc: data.psc,
                skupina : data.nazevSkup,
            }
            console.log('testadd datass',datas)
            const res = await axios.post('http://localhost:4433/udalost/add' , datas,{headers: {"Authorization": 'Bearer ' + localStorage.getItem('JWT_TOKEN')}})
            //console.log("addUdalsot res data",res.data)
            
            
        } catch(err){
            
            console.log('err', err)
        }
    }
    

    render(){
        
        const {nazevSkup,email,psc,nazev,adresa,datum,popis}=this.state;
        //console.log('nazevSkupi',this.global)
        return(
            <div>
            <Button variant="primary" onClick={this.handleShowVyt} >
                     Vytvoř Skupinu
            </Button>

            <div>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th>Nazev Skupiny</th>
                        <th>Pridej Udalost</th>
                        <th>Pridej Uzivatele</th>
                        <th>Smaž Skupinu</th>
                        <th>Chat skupiny</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.global.skupiny.map(item => 
                        (<tr key={item.SkupinaID} className="skupiny">
                        <td>
                        <p>{item.Nazev}</p>
                        </td><td>
                        <Button variant="primary" onClick={this.handleShowPriUdal} name={item.Nazev}>
                        Pridej udalost
                        </Button>
                        </td><td>
                        <Button variant="primary" onClick={this.handleShowPriUziv} name={item.Nazev}>
                        Přidej Uživatele
                        </Button>
                        </td>
                        <td>
                        <Button variant="primary" onClick={this.handleSmazSkup} name={item.Nazev}>
                        Smaž Skupinu
                        </Button>
                        </td>
                        <td>
                        <Button variant="primary" onClick={this.handleChat} name={item.Nazev}>
                        Skupinový chat
                        </Button>
                        </td>
                        </tr>))}
                    </tbody>
                </Table>   
            </div>

            <Modal show={this.state.showVySkup} onHide={this.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Přidej událost</Modal.Title>
            </Modal.Header>
            <Form className="border border-dark p-5 bg-blue" onSubmit={(e) => this.onSubmitVytSkup(e)}>
            <Modal.Body>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Zadejte nazev udalosti:</Form.Label>
                        <Form.Control required
                                name="nazevSkup"
                                type="text"
                                placeholder="Muj Nazev"  value={ nazevSkup } onChange={ (e) => this.handleChange(e) }/>
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

            <Modal show={this.state.showPriUzivatele} onHide={this.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Přidej událost</Modal.Title>
            </Modal.Header>
            <Form className="border border-dark p-5 bg-blue" onSubmit={(e) => this.onSubmitPridejUzivatele(e)}>
            <Modal.Body>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Zadejte uživatele, kterého chcete přidat do skupiny:</Form.Label>
                        <Form.Control required
                                name="email"
                                type="email"
                                placeholder="Muj Nazev"  value={ email } onChange={ (e) => this.handleChange(e) }/>
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

            <Modal show={this.state.showPriUdalosti} onHide={this.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Přidej událost</Modal.Title>
            </Modal.Header>
            <Form className="border border-dark p-5 bg-blue" onSubmit={(e) => this.onSubmitVytvorUdalost(e)}>
            <Modal.Body>
            
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Zadejte nazev udalosti:</Form.Label>
                        <Form.Control required
                                name="nazev"
                                type="text"
                                placeholder="Muj Nazev"  value={ nazev } onChange={ (e) => this.handleChange(e) }/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Zadejte popis udalosti:</Form.Label>
                        <Form.Control required 
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
                        <Form.Control required
                                name="adresa"
                                type="text"
                                placeholder="Mesto Ulice" value={ adresa } onChange={ (e) => this.handleChange(e) }/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Zadej PSC:</Form.Label>
                        <Form.Control required
                                name="psc"
                                type="number"
                                placeholder="12345" value={ psc } onChange={ (e) => this.handleChange(e) }/>
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



