import React, { Component } from 'react';



// zapati ktere se bude objevovat na kazde strance
export default class Tail extends Component {
    render(){
        return(
                <div className="tail">
                    <p className="text-secondary d-flex justify-content-center ">
                        Tento projekt vznikl v letním semestru v roce 2019 na Univerzitě Hradec Králové za účelem vytřískat co nejvíce kreditů.
                    </p>
                </div>
        );
    };
};