import React, { Component } from 'react';
import { Navbar,   Nav } from 'react-bootstrap';
import { connect} from 'react-redux';

import * as actions from '../actions';

class Head extends Component {

    constructor(props){
        super(props)
        this.signOut = this.signOut.bind(this);
    }

    signOut(){
        console.log("byl jsi odhlasen");
        this.props.signOut();
    }

    render(){
        return(
                //vytvoreni navigace a odkazu s indexy kam budou odkazovat 
                <Navbar expand="lg">
                    <Navbar.Brand href="/">Doodle</Navbar.Brand>
                    <Navbar.Toggle/>
                    <Navbar.Collapse id="mynavbar-nav">
                    <Nav className='ml-auto' className="mynav">
                    {this.props.isAuth ?
                        [<Nav.Item key="kalendar"><Nav.Link href="/kalendar" >Kalendář</Nav.Link></Nav.Item>,
                        <Nav.Item key="skupiny"><Nav.Link href="/skupiny" >Přátelé a skupiny</Nav.Link></Nav.Item>
                        ]: null    }
                    
                    
                    </Nav>
                    <Nav className='ml-auto'>
                    {!this.props.isAuth ?
                    [<Nav.Item key="prihlaseni"><Nav.Link href="/prihlaseni">Přihlášení</Nav.Link></Nav.Item>,
                    <Nav.Item key="registrace"><Nav.Link href="/registrace">Registrace</Nav.Link></Nav.Item>
                        ]: null    }
                    {this.props.isAuth ?
                    <Nav.Item key="odhlaseni"><Nav.Link href="/odhlaseni" onClick={this.signOut}>Odhlášení</Nav.Link></Nav.Item>
                        : null    }
                    </Nav>
                    </Navbar.Collapse>

                    
                </Navbar>
        );
    };
};

function mapStateProps(state){
    return{
        isAuth: state.auth.isAuthenticated
    }
}

export default connect(mapStateProps,actions)(Head)