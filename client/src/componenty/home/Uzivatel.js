import React, {Component} from 'reactn';
import { Form,Modal,Button,Table,Container ,Row,Col} from 'react-bootstrap';
import axios from 'axios'
import ReactDOM from 'react-dom'
import { Alert } from "react-bs-notifier";

export default class Uzivatel extends Component{
    constructor(props){
        super(props)
        this.onSubmitZmenHeslo = this.onSubmitZmenHeslo.bind(this);
        this.onSubmitZmenEmail = this.onSubmitZmenEmail.bind(this);
        this.onSubmitExport = this.onSubmitExport.bind(this);
        this.state=defState()
        
            
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

    //zmena hesla
    async onSubmitZmenHeslo(data){
        data.preventDefault();
        const datas = transformDataToChangePsswd(this.state);
        if(data.newPass===data.scndNewPass){
            this.setState(defState());
            await this.zmenaHesla(datas);
        }else{
            alert('nova hesla se neschoduji')
        }

    }

    async onSubmitExport(data){
        data.preventDefault()
        const datas = transfromDataToExport();
        await this.exporToGoogle(datas)
    }

    async exporToGoogle(data){
        const element = <Alert type="success" headline="Úspěch">
            Export úspéšně dokončen
        </Alert>
        const elementBad = <Alert type="danger" headline="Ooops">
            Něco se pokazilo
        </Alert>
        try{
            const res = axios.post('http://localhost:4433/udalost/export',data)
            console.log(res)
            ReactDOM.render(element,document.getElementById('response'))
        }
        catch(err){
            ReactDOM.render(elementBad,document.getElementById('response'))
        }
    }

    async zmenaHesla(data) {
        try {
            const res = await axios.post('http://localhost:4433/user/changePsswd' , data,{headers: {"Authorization": 'Bearer ' + localStorage.getItem('JWT_TOKEN')}})
            const serverToken = res.data;
               this.setGlobal({
                   isAuth: true,
                   token:serverToken.token,});
               localStorage.setItem('isAuth',true);
               localStorage.setItem('JWT_TOKEN',serverToken.token);

        } catch(err){
            console.log('err', err)
        }

    }

    //zmena hesla
    async onSubmitZmenEmail(data){
        data.preventDefault();
        const datas = transformDataToChangeEmail(this.state) ;
        this.setState(defState());
        
        await this.zmenaEmailu(datas);
    }

    async zmenaEmailu(data) {
        try {
            const res = await axios.post('http://localhost:4433/user/changeEmail' , data,{headers: {"Authorization": 'Bearer ' + localStorage.getItem('JWT_TOKEN')}})
            
            const serverToken = res.data;
            
             
               this.setGlobal({
                   isAuth: true,
                   token:serverToken.token,});
               localStorage.setItem('isAuth',true);
               localStorage.setItem('JWT_TOKEN',serverToken.token);
               localStorage.setItem('Email',serverToken.email)
               this.forceUpdate()
               alert('Email úspéšně změněn')
        } catch(err){
            
            console.log('err', err)
        }

    }

    render(){
        const {oldPass,newPass,scndNewPass,newEmail}=this.state;
        return(
            <div>
              <Container className="mx-auto" >

                    <h2> Stavající email je: {localStorage.getItem('Email')}</h2>
                <Form className="border border-dark p-5 m-2 bg-blue" onSubmit={(e) => this.onSubmitZmenHeslo(e)}>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Zadejte staré heslo:</Form.Label>

                        <Form.Control required
                                name="oldPass"
                                type="password"
                                placeholder="Staré heslo"  value={ oldPass } onChange={ (e) => this.handleChange(e) }/>
                        </Form.Group>

                        <Form.Group controlId="formNewPassword">
                            <Form.Label>Zadejte nové heslo:</Form.Label>
                            <Form.Control  
                                name="newPass"
                                type="password"
                                placeholder="Nové heslo" value={ newPass } onChange={ (e) => this.handleChange(e) }/>
                        </Form.Group>

                        <Form.Group controlId="formNewScndPassword">
                            <Form.Label>Zadejte znovu nové heslo:</Form.Label>
                            <Form.Control required
                                name="scndNewPass"
                                type="password"
                                placeholder="Nové heslo" value={ scndNewPass } onChange={ (e) => this.handleChange(e) }/>
                        </Form.Group>
                
                    <Button variant="primary" type="submit">
                        Změň heslo
                    </Button>

                </Form>
                       
                <Form className="border border-dark p-5 m-2 bg-blue" onSubmit={(e) => this.onSubmitZmenEmail(e)}>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Zadejte nový email:</Form.Label>
                            <Form.Control required
                                name="newEmail"
                                type="email"
                                placeholder="Nový email"  value={ newEmail } onChange={ (e) => this.handleChange(e) }/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Změň email
                    </Button>

                </Form>    
                
                <Form className="border border-dark p-5 m-2 bg-blue" onSubmit={(e) => this.onSubmitExport(e)}>
                <div id="response" margin="auto"></div>
                    <ol>
                        <li>Nastavení</li>
                        <li>Hlavní kalendář</li>
                        <li>Sdílet s určitými lidmi</li>
                        <li>Přidat "doodleauth-242318@appspot.gserviceaccount.com", povolit změny událostí</li>
                    </ol>
                    <Button variant="primary" type="submit">
                    Exportovat Google kalendář
                    </Button>
                </Form>

              </Container>
            </div>
        )}
}

function defState() {
    return {
        oldPass: '',
        newPass:'',
        scndNewPass: '',
        newEmail: '',
        
    };
}

function transformDataToChangePsswd(data) {
    return {
        oldPass: data.oldPass,
        newPass: data.newPass,
        scndNewPass: data.scndNewPass,
    };
}

function transformDataToChangeEmail(data) {
    if(!data.newEmail){
        alert("Nový email nesmý být prázdný")
    }
    else{
        return {
            newEmail: data.newEmail,
            };
}

}

function transfromDataToExport(){
    return{
        Email: localStorage.getItem('Email')
    }
}