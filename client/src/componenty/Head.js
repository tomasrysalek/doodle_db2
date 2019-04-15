import React, { Component } from 'react';
import { Navbar,   Nav } from 'react-bootstrap';



export default class Head extends Component {
    render(){
        return(
                //vytvoreni navigace a odkazu s indexy kam budou odkazovat 
                <Navbar expand="lg">
                    <Navbar.Brand href="/">Doodle</Navbar.Brand>
                    <Navbar.Toggle/>
                    <Navbar.Collapse id="mynavbar-nav">
                    <Nav className='ml-auto' className="mynav">
                    
                    <Nav.Item><Nav.Link href="/kalendar" >Kalendář</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/skupiny" >Přátelé a skupiny</Nav.Link></Nav.Item>
                    
                    </Nav>
                    <Nav className='ml-auto'>
                    
                    <Nav.Item><Nav.Link href="/prihlaseni">Přihlášení</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/registrace">Registrace</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/odhlaseni">Odhlášení</Nav.Link></Nav.Item>

                    </Nav>
                    </Navbar.Collapse>

                    
                </Navbar>
        );
    };
};