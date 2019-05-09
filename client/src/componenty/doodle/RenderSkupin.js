/*import React, {Component} from 'react';
import { reduxForm, Field} from 'redux-form';

import MujInput from '../mojeComponenty/MujInput';

export default function RenderUdalost(props) {
    const skupConst = props.item; 
    const { handleSubmit  } =this.props;
    console.log('list',skupConst)
    if(skupConst !== []){
        return(
            
            <div className="skupinyBox">
                
            {
                skupConst.map(item => 
                (<div key={item.SkupinaID} className="skupiny">

                <p>Nazev Skupiny: {item.Nazev}</p>


                <div className="d-flex justify-content-center">
                    <form className="border border-dark p-5 bg-blue" onSubmit={handleSubmit(this.onSubmitCreate)}>
                        <div className="form">
                            
                            <fieldset>
                                <Field
                                    name="nazev"
                                    type="text"
                                    id="Nazev"
                                    label="Zadejte nazev Skupiny:"
                                    placeholder="Muj Nazev"
                                    component={MujInput}/>
                            </fieldset>
                        </div>
                        <div className="mt-2 d-flex justify-content-center">
                            <button type="submit" className="btn btn-dark">vytvor skupinu</button>
                        </div>
                    </form>
                </div>
                
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
}*/