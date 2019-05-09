import React, { Component } from 'react';


import ContentBox from './ContentBox';
import Content from '../content/Content'


export default class Home extends Component {
   

    
    render(){
        return(
            <span>
                <div>
                <ContentBox
                 name="content"
                 id="save"
                 img={Content.imgSave}
                 nadpis="Spolehlivý"
                 text={Content.textSave}/>
                 </div><div>
                 <ContentBox
                 name="content"
                 id="fast"
                 img={Content.imgFast}
                 nadpis="Rychlý"
                 text={Content.textFast}/>
                 </div><div>
                 <ContentBox
                 name="content"
                 id="stable"
                 img={Content.imgStable}
                 nadpis="Stabilní"
                 text={Content.textStable}/>
                 </div>
            </span>
            )
        }}