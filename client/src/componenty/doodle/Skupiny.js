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
        this.handleUzivatele = this.handleUzivatele.bind(this);
        this.handleSmazUzivatele = this.handleSmazUzivatele.bind(this);
        this.handleSmazPotvrzUzivatele = this.handleSmazPotvrzUzivatele.bind(this);
        this.state=defState()
        
    }

    handleClose() {
        this.setState(defState());
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

    //delano na slepo!!!!
    handleUzivatele= async (event) => {
        console.log(event.target.name)
        const datas = {
            skupina: event.target.name,
        }; 
        const res = await axios.post('http://localhost:4433/skupina/allUser' , datas)
        console.log('uziv',res.data)
        await this.setState({
             nazevSkup:datas.skupina,
             uzivatele:res.data.uzivatele,
             showUzivatele:true,
            });
            
    }

    handleSmazUzivatele= async (event) => {
        
        this.setState({showSmazUzivatele:true,showUzivatele:false,uzivatel:event.target.name,});
        
        
    }

    handleSmazPotvrzUzivatele= async (event) => {
        const data = {
            user:this.state.uzivatel,
            skupina:this.state.nazevSkup,
        }
        this.setState(defState());
        console.log('ssssda',data)
        this.smazaniUzivatele(data)
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
        
        
        await axios.post('http://localhost:4433/skupina/delete' , datas)
        
    } catch(err){
            
        console.log('err', err)
    }
    }

    // smazani uzivatele ve skupinach
    async smazaniUzivatele(data){
        try {
        await axios.post('http://localhost:4433/skupina/deleteUser' , data)
        
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

        this.setState(defState());
        await this.vytvoreniSkupiny(datas);
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

        this.setState(defState());
        await this.pridaniUzivatele(datas);
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
        this.setState(defState());
        await this.addUdalost(datas);
    }

    //pridani udalosti
    async addUdalost(data) {
        
        try {
            const datas = transformDataToAddUalost(data)     
            const res = await axios.post('http://localhost:4433/udalost/add' , datas,{headers: {"Authorization": 'Bearer ' + localStorage.getItem('JWT_TOKEN')}})

        } catch(err){
            
            console.log('err', err)
        }
    }
    

    render(){
        
        const {nazevSkup,email,psc,nazev,adresa,datum,popis,file,uzivatele,uzivatel}=this.state;
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
                        <th>Uživatelé skupiny</th>
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
                        </td>
                        {item.prava===1  
                            ?[<td key="1">
                                <Button variant="primary" onClick={this.handleShowPriUziv} name={item.Nazev} >
                                    Přidej Uživatele
                                </Button>
                            </td>]
                            :[<td key="2">
                                <Button variant="secondary" disabled>
                                    Přidej Uživatele
                                </Button>
                            </td>]}
                        {item.prava===1  
                            ?[<td key="1">
                                <Button variant="primary" onClick={this.handleSmazSkup} name={item.Nazev} >
                                    Smaž Skupinu
                                </Button>
                            </td>]
                            :[<td key="2">
                                <Button variant="secondary" disabled>
                                    Smaž Skupinu
                                </Button>
                            </td>]}
                        {item.prava ===1
                            ?[<td key="1">
                                <Button variant="primary" onClick={this.handleUzivatele} name={item.Nazev}>
                                    Seznam Uživatelnů
                                </Button>
                            </td>]:
                            [<td key="2">
                                    <Button variant="secondary" disabled>
                                    Seznam Uživatelů
                                </Button>
                            </td>]
                        }
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
                    <Form.Group controlId="formFile">
                        <Form.Label>Vlož soubor (Ve formátu PDF, Doc, Img): </Form.Label>
                        <Form.Control 
                                name="file"
                                type="file"
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

            {/*vyskakovaci okno pro seznam clenu skupiny*/} 
            <Modal show={this.state.showUzivatele} onHide={this.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Seznam členů skupiny</Modal.Title>
            </Modal.Header>
            <Form className="border border-dark p-5 bg-blue">
                <Modal.Body>
                <Table striped bordered hover variant="light">
                <thead>
                        <tr>
                        <th>Jmeno uzivatele</th>
                        <th>Smaz uzivatele</th>
                        </tr>
                    </thead>
                    <tbody>
                {uzivatele.map((item,index)=>
                ( 
                    <tr key={index}>{console.log('item',item)}
                        <th key='21'>{item}</th>
                        <th key='52'>
                            <Button variant="primary" onClick={this.handleSmazUzivatele} name={item}>
                                X
                            </Button>
                        </th>
                    </tr>))}
                    </tbody>
                </Table>
                </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary"  onClick={this.handleClose}>
                Close
                </Button>
            </Modal.Footer>
            </Form>
            </Modal>

            {/*vyskakovaci okno pro potvrzeni smazani uzivatele*/} 
            <Modal show={this.state.showSmazUzivatele} onHide={this.handleClose} onSubmit={this.handleSmazPotvrzUzivatele}>
            <Modal.Header closeButton>
                <Modal.Title>Zmazani uzivatele ze skupiny </Modal.Title>
            </Modal.Header>
            <Form className="border border-dark p-5 bg-blue">
                <Modal.Body>
                Přejete si odstranit uzivatele {uzivatel} ze skupiny {nazevSkup}
                </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary"  onClick={this.handleClose}>
                Close
                </Button>
                <Button variant="primary" type="submit">
                Vymaž uživatele
                </Button>
            </Modal.Footer>
            </Form>
            </Modal>


            </div>
        
        );
    }
};


function defState() {
    return {
        showVySkup: false,
        showPriUdalosti: false,
        showPriUzivatele: false,
        showClenySkup:false,
        showUzivatele:false,
        showSmazUzivatele:false,
        nazevSkup: '',
        smazPls:'',
        email: '',
        nazev: '',
        popis: '',
        adresa: '',
        psc: '',
        datum:'',
        file:[],
        uzivatele:[],
        uzivatel:'',
    };
}

function transformDataToAddUalost(data) {
    return {
        nazev: data.nazev,
        popis: data.popis,
        datum: data.datum,
        adresa: data.adresa,
        psc: data.psc,
        skupina : data.nazevSkup,
        file:data.file
    };
}
