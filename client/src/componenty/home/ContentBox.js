import React, { Component} from 'react';

export default class MujInput extends Component{
    render(){
        return(
            <span className={this.props.name} id={this.props.id}>
                
                        <img src={ this.props.img} alt="" />              
                        <h3>{ this.props.nadpis}</h3>
                        <p>{this.props.text}</p>                    
                
            </span>
        );
    }
};