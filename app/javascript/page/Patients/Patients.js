import React, { Component } from 'react';
import Getlist from './components/Getlist';


class Patients extends Component{

    constructor(props) {
        super(props)
    }
    render() {
        console.log(this.props);
        return <div>vide
         <Getlist/>
        </div>
    }

}
export default Patients;