import React from 'reactn';
import ReactDOM from 'react-dom';


import * as serviceWorker from './serviceWorker';
import Test from './Test';


import { setGlobal } from 'reactn';




setGlobal({
    isAuth: false,
    token: '',
    udalosti: [],
    skupiny: [],
    upUdalosti:[]
  });

ReactDOM.render(
    
    <Test/>
, document.querySelector('#root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
