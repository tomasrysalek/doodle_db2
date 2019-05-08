import React, { Component } from 'reactn';
import { Navbar,   Nav } from 'react-bootstrap';





export default class Head extends Component {
    state={
        isAuthState:false
    }
    constructor(props){
        super(props)
        this.signOut = this.signOut.bind(this);
        
    }
   componentDidMount(){
    this.trueFalse();
   }

    signOut(){
        console.log("byl jsi odhlasen");
        
        localStorage.clear();
        this.props.signOut();
    }
    
    trueFalse(){
        if(this.global.isAuth|| localStorage.getItem('isAuth')){
            this.setState({isAuthState:true});
        }else{
            this.setState({isAuthState:false});
        }
    }

    render(){
        
        const globalIsAuth = this.state.isAuthState;
        
        console.log('headGlobalAuth',globalIsAuth)
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
                    {globalIsAuth ?
                    <Nav.Item key="odhlaseni"><Nav.Link href="/odhlaseni" onClick={this.signOut}>Odhlášení</Nav.Link></Nav.Item>
                        : null    }
                    </Nav>
                    </Navbar.Collapse>

                    
                </Navbar>
        );
    };
};



