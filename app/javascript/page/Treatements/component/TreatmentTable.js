import React, { Component, Fragment,useState,useEffect} from 'react';
import axios from 'axios'
import { Field } from 'formik';

function TreatmentTable({filterText}){
    const [treatments, setTreatments] = useState([])
    let filterthis = filterText
    const row = []
    useEffect(() => {
        axios.get('/api/mtomady/treatments')
            .then(resp => {
                setTreatments(resp.data.data)
            })
            .catch(resp => {
                console.log(resp)
            })
    },[treatments.length])
    treatments.forEach(treatment => { 
        
        if (treatment.attributes.name.toUpperCase().indexOf(filterthis.toUpperCase()) === -1) {
            return
        }
        row.push(<div key={treatment.id} className="form-check">
            <label id="condition-check">
                <Field type="radio" name="treatment_id" value={treatment.id} required />
                {treatment.attributes.name}
                <span className="checkmark"></span>
            </label>
        </div>) 
    }) 
    return <div>{row}</div> 
}
export default TreatmentTable;