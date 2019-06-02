import React, {Component} from 'reactn';
import axios from 'axios';
import { Form,Modal,Button,Table } from 'react-bootstrap';






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
    
    //otevreni oken
    handleShowVyt() {
        this.setState({ showVySkup:true }); 
    }
    
    handleShowPriUdal= async (event) => {
        this.setState({ showPriUdalosti: true,nazevSkup:event.target.name });
        
    }
    handleShowPriUziv= async (event) => {
        this.setState({ showPriUzivatele: true,nazevSkup:event.target.name });
        
    }
    handleSmazSkup= async (event) => {
        await this.setState({ smazPls:event.target.name });
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
        
        

        
        
    }

    // smazani skupin
    async smazaniSkupiny(data){
        try {

        
        const datas = {
            
              skupina: data.smazPls,
              
            
          };
        
        
        await axios.delete('http://localhost:4433/skupina/delete' , datas)
        
    } catch(err){
            
        console.log('err', err)
    }
    }

    // ziskani skupin
    async getSkupiny(){
        try{
             const res = await axios.get('http://localhost:4433/skupina/getsk' ,{headers: {"Authorization": 'Bearer ' + localStorage.getItem('JWT_TOKEN')}})  
                this.setGlobal({
                isAuth:localStorage.getItem('isAuth'),
                token:localStorage.getItem('JWT_TOKEN'),
                skupiny : res.data.skupiny})
            }catch(err){
            console.log('err',err)
        }
    }

    // ziskani udalosti skupin
    async getUdalosSkup(){
        try{
            const res = await axios.get('http://localhost:4433/skupina/getAll' ,{headers: {"Authorization": 'Bearer ' + localStorage.getItem('JWT_TOKEN')}})  
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
    
    //nastaveni statu z formulare
    handleChange = async (event) => {
        const { target } = event;
        const value = target.value;
        const { name } = target;
        await this.setState({
          [ name ]: value,
        });
        
    }

    // submit vytvoreni skupiny
    async onSubmitVytSkup(data){
        data.preventDefault();
        
        
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
    }

    
    //vytvoreni skupiny
    async vytvoreniSkupiny(data){
        try {

        const datas = {
              nazev: data.nazevSkup,
          };
        
        
        await axios.post('http://localhost:4433/skupina/create' , datas,{headers: {"Authorization": 'Bearer ' + localStorage.getItem('JWT_TOKEN')}})
        
    } catch(err){
            
        console.log('err', err)
    }
    }

    //submit pridani uzivatele do skupiny
    async onSubmitPridejUzivatele(data){
        data.preventDefault();
        
        
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
    }

    
    //pridani uzivatele do skupiny
    async pridaniUzivatele(data){
        try {

        
        const datas = {
            
              email: data.email,
              skupina :data.nazevSkup,
            
          };
        
        
        const res = await axios.post('http://localhost:4433/skupina/adduser' , datas)
        
    } catch(err){
            
        console.log('err', err)
    }
    }

    //submit pridani udalosti
    async onSubmitVytvorUdalost(data){
        data.preventDefault();
        
        const datas = this.state;
        this.setState({
            nazev: '',
            popis: '',
            adresa: '',
            psc: '',
            datum:'',
            show:false
            });
        await this.addUdalost(datas);
    }

    //pridani udalosti
    async addUdalost(data) {
        
        try {
            const datas = {
                nazev: data.nazev,
                popis: data.popis,
                datum: data.datum,
                adresa: data.adresa,
                psc: data.psc,
                skupina : data.nazevSkup,
            }
            
            const res = await axios.post('http://localhost:4433/udalost/add' , datas,{headers: {"Authorization": 'Bearer ' + localStorage.getItem('JWT_TOKEN')}})
            
            
            
        } catch(err){
            
            console.log('err', err)
        }
    }
    

    render(){
        
        const {nazevSkup,email,psc,nazev,adresa,datum,popis}=this.state;
        
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

            {/*form pro pridani skupiny*/}
            <Modal show={this.state.showVySkup} onHide={this.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Vytvoř skupinu</Modal.Title>
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
                Vytvoř skupinu
                </Button>
            </Modal.Footer>
            </Form>
            </Modal>

            {/*form pro pridani uzivatele do skupiny*/}            
            <Modal show={this.state.showPriUzivatele} onHide={this.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Přidej uživatele do skupiny</Modal.Title>
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
                Přidej uživatele
                </Button>
            </Modal.Footer>
            </Form>
            </Modal>
            
            {/*form pro pridani udalosti*/} 
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
        
        );
    }
};



