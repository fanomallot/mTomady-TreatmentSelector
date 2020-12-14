import axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react';
import GetRelation from './GetRelation';


const Getlist = () => {
    const [patients, setPatients] = useState([])
    useEffect(() => {
        axios.get('/api/mtomady/patient')
            .then((resp) => {
                setPatients(resp.data.data)
            })
            .catch((resp) => { console.log(resp) })
    }, [patients.length])
    const list = patients.map((patient, index) => {
        return <tr key={index}>
            <td> {patient.attributes.name}</td>
            <td><GetRelation patient_id={patient.id}/></td> 
        </tr>
    })
    return <table>
        <thead>
            <tr>
                <td>Patient name</td>
                <td>Treatment</td>
            </tr>
        </thead>
        <tbody>
            {list}
        </tbody>
    </table>
}
export default Getlist;