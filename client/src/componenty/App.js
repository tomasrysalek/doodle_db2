import React from 'react';

import Styles from '../styly/Styly';
import Head from './Head';
import Tail from './Tail';



export default (props) =>{
        return(
            //aplikovani stylu na celou stranku
            <Styles>
                <div className="divApp">
                    {/*pridani menu*/ }
                    <Head/>
                    <div className="divContentApp">
                    {/*pridani odkazovane stranky -> zalezi podle /... */ }
                    {props.children}
                    </div>
                    {/*pridani zapati*/ }
                    <Tail/>
                </div>
            </Styles>
        );
};