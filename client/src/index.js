import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import App from './componenty/App';
import * as serviceWorker from './serviceWorker';
import Home from './componenty/home/Home';
import Kalendar from './componenty/doodle/Kalendar';
import Odhlaseni from './componenty/login/Odhlaseni';
import Prihlaseni from './componenty/login/Prihlaseni';
import Registrace from './componenty/login/Registrace';
import Skupiny from './componenty/doodle/Skupiny';
import reducer from './reducers/index';


ReactDOM.render(
    // vytvoreni uschovny dat
    <Provider store={createStore(reducer,{},applyMiddleware(reduxThunk))}>
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
    </Provider>
, document.querySelector('#root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
