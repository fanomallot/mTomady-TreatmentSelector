import React, { Component } from 'react';
import Getlist from './components/Getlist';
import './patient.scss'

class Patients extends Component{

    constructor(props) {
        super(props)
    }
    render() {
        return <div>
            <div className="Title">Patient list</div>
         <Getlist/>
        </div>
    }

}
export default Patients;