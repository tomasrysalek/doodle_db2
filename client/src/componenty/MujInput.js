import React, { Component} from 'react';

export default class MujInput extends Component{
    render(){
        const { input:{ value,onChange}} =this.props;
        return(
            <div className="form-skupina">
                <div>
                    <label htmlFor={this.props.id} > { this.props.label}</label>
                </div>
                <div>
                    <input
                        name={ this.props.name}
                        id={this.props.id}
                        placeholder={this.props.placeholder}
                        autoComplete={this.props.autoComplete}
                        className="form-input"
                        type={this.props.type}
                        value={value}
                        onChange={onChange}
                    />
                </div>
            </div>
        );
    }
};