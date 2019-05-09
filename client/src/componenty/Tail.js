import React, { Component } from 'react';



// zapati ktere se bude objevovat na kazde strance
export default class Tail extends Component {
    render(){
        return(
                <div className="tail">
                    <p className="text-secondary d-flex justify-content-center ">
                        Tento projekt vzniká v letním semestru v roce 2019 na Univerzitě Hradec Králové jako projekt na Databáze 2 a Tnpw 2.
                    </p>
                </div>
        );
    };
};