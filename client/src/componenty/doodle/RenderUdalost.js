import React, {Component} from 'react';

export default function RenderUdalost(props) {
    const udalostiConst = props.item; 
    
    console.log('list',udalostiConst)
    if(udalostiConst !== []){
        return(
            <div>
            {
                udalostiConst.map(item => (<div key={item.UzivatelID}>
                <p>{item.Nazev}</p>
                <p>{item.Popis}</p>
                <p>{item.Datum}</p>
                <p>{item.PSC}</p>
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