import React, {Component} from 'react';

export default function RenderUdalost(props) {
    const skupConst = props.item; 
    
    console.log('list',skupConst)
    if(skupConst !== []){
        return(
            <div>
            {
                skupConst.map(item => 
                (<div key={item.SkupinaID} className="udalosti">

                <p>Nazev Skupiny: {item.Nazev}</p>
                
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
}