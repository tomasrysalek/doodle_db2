import React, {Component} from 'react';

export default function RenderUdalost(props) {
    const udalostiConst = props.item; 
    
    console.log('list',udalostiConst)
    if(udalostiConst !== []){
        return(
            <div className="udalosti">
            {
                udalostiConst.map(item => 
                (<div key={item.UdalostID} className="udalosti">

                <p>Nazev udalosti: {item.Nazev}</p>
                <p>Popis udalosti: {item.Popis}</p>
                <p>Datum události: {item.Datum}</p>
                <p>PSC: {item.PSC}</p>
                </div>))
            }
            </div>
        );
        
    }else{
        return(
            <div>
                <p>zadna udalost</p>
            </div>
        );
    }
    
    

    /*if(this.props.data){
        const listUdalosti = udalostiConst.map({UzivatelID,Nazev,Popis,Datum,PSC}=> (<div key={UzivatelID}>
            <p>{Nazev}</p>
            <p>{Popis}</p>
            <p>{Datum}</p>
            <p>{PSC}</p>
            </div>));
    }*/
    

    
}