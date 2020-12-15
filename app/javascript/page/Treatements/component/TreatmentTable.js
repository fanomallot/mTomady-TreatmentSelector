import React, { Component, Fragment,useState,useEffect} from 'react';
import axios from 'axios'
import { Field } from 'formik';
import { useTranslation } from 'react-i18next';
function TreatmentTable({ filterText }) {
    const { t, i18n } = useTranslation();
    function check_language(item) {
        if (i18n.language == "fr") {
            if (item.name_fr == "" || item.name_fr == null || item.name_fr == " ") {
                return item.name
            }
            return item.name_fr
        } else if (i18n.language == "mg") {
            if (item.name_mg == "" || item.name_mg == null || item.name_mg == " ") {
                return item.name
            }
            return item.name_mg
        } else {
            return item.name
        }
        
    }
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
                {check_language(treatment.attributes)}
                <span className="checkmark"></span>
            </label>
        </div>) 
    }) 
    return <div>{row}</div> 
}
export default TreatmentTable;