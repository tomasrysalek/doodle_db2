import React, { Component } from 'reactn';
import { Navbar,   Nav } from 'react-bootstrap';





export default class Head extends Component {
    state={
        isAuthState:false,
        uzivatel:''
    }
    constructor(props){
        super(props)
        this.signOut = this.signOut.bind(this);
        
    }
   componentDidMount(){
    this.trueFalse(this.global.isAuth,localStorage.getItem('isAuth'));
   }

   componentDidUpdate(){
    this.trueFalse(this.global.isAuth, localStorage.getItem('isAuth'));
   }

    signOut(){
        console.log("byl jsi odhlasen");
        
        localStorage.clear();
        this.props.signOut();
    }
    
    trueFalse(globAuth,locAuth){
        if(globAuth|| locAuth){
            if(this.state.isAuthState){
                return null;
            }else{
                this.setState({isAuthState:true});
                if(localStorage.getItem('EmailUzivatele')!==null){
                    this.setState({uzivatel:localStorage.getItem('EmailUzivatele')});
                }else{
                    this.setState({uzivatel:this.global.emailUzivatele})
                }
            }
            
        }else{
            if(this.state.isAuthState){
                this.setState({isAuthState:false,uzivatel:''});
            }else{
                return null;
            }
            
        }
    }

    render(){
        
        const globalIsAuth = this.state.isAuthState;
        const uzivatel = this.state.uzivatel;
        //console.log('headGlobalAuth',globalIsAuth)
        return(
                //vytvoreni navigace a odkazu s indexy kam budou odkazovat 
                <Navbar expand="lg">
                    <Navbar.Brand href="/">Doodle</Navbar.Brand>
                    <Navbar.Toggle/>
                    <Navbar.Collapse id="mynavbar-nav">
                    <Nav className='ml-auto' className="mynav">
                    {globalIsAuth  ?
                        [<Nav.Item key="kalendar"><Nav.Link href="/kalendar" >Kalendář</Nav.Link></Nav.Item>,
                        <Nav.Item key="skupiny"><Nav.Link href="/skupiny" >Přátelé a skupiny</Nav.Link></Nav.Item>
                        ]: null    }
                    
                    
                    </Nav>
                    <Nav className='ml-auto'>
                    {!globalIsAuth ?
                    [<Nav.Item key="prihlaseni"><Nav.Link href="/prihlaseni">Přihlášení</Nav.Link></Nav.Item>,
                    <Nav.Item key="registrace"><Nav.Link href="/registrace">Registrace</Nav.Link></Nav.Item>
                        ]: null    }
                    {globalIsAuth ?[
                    <Nav.Item key="uzivatel"><Nav.Link >{uzivatel}</Nav.Link></Nav.Item>,
                    <Nav.Item key="odhlaseni"><Nav.Link href="/odhlaseni" onClick={this.signOut}>Odhlášení</Nav.Link></Nav.Item>
                        ]: null    }
                    </Nav>
                    </Navbar.Collapse>

                    
                </Navbar>
        );
    };
};
