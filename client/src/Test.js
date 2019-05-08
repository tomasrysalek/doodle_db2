import React, { Component } from 'reactn';

import { BrowserRouter, Route } from 'react-router-dom';


import App from './componenty/App';

import Home from './componenty/home/Home';
import Kalendar from './componenty/doodle/Kalendar';
import Odhlaseni from './componenty/login/Odhlaseni';
import Prihlaseni from './componenty/login/Prihlaseni';
import Registrace from './componenty/login/Registrace';
import Skupiny from './componenty/doodle/Skupiny';




export default class Test extends Component {
render(){
    return(
        
        <div>
            {/*pridani routeru starajiciho se o odkazovani mezi strankama*/ }
            <BrowserRouter>
                {/*pridani paklikace*/ }
                <App>
                    {/*definice indexu a kam budou odkazovat*/ }
                    <Route exact path="/" component ={Home}/>
                    <Route path="/kalendar" component ={Kalendar}/>
                    <Route path="/skupiny" component ={Skupiny}/>
                    <Route path="/prihlaseni" component ={Prihlaseni}/>
                    <Route path="/registrace" component ={Registrace}/>
                    <Route path="/odhlaseni" component ={Odhlaseni}/>
                </App>
            </BrowserRouter>
        </div>

    )
}}