import React, { Component } from 'react';
import axios from 'axios'

export default class UnitButton extends Component {

    componentDidMount(){
        
    }

    render() {
        const { unit, setupUnit } = this.props;
        return (
            <>
                <button onClick={setupUnit}><p dangerouslySetInnerHTML={unit === "C" ? {__html: "&#8457"} : {__html: "&#8451"} }></p></button>  
            </>
        )
    }
}
