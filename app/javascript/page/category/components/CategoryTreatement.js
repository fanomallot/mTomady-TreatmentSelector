import React, {useState,useEffect, Fragment} from 'react';
import axios from 'axios'
import { Formik, Form, Field } from 'formik'
import '../category.scss'

const CategoryTreatment = ({category_id,treatmentValue}) => {
    const [treatments, setTreatments] = useState([])
    
    useEffect(() => { 
        axios
            .get(`/api/mtomady/category/${category_id}/treatments`)
            .then((resp) => {
                setTreatments(resp.data.data)
            })
            .catch((resp) => console.log(resp))
    }, [treatments.length])
    const List = treatments.map((treatment, key) => {
        if (treatment.attributes.name.toUpperCase().indexOf(treatmentValue.toUpperCase()) === -1) { 
            return
        }
        return <div key={key} className="formcheck2">
            <label id="condition-check">
                <Field name="treatment_id" type="radio" value={treatment.id } required hidden/>
                {treatment.attributes.name}
                <span className="checkmark"></span>
            </label>
        </div>
    })

    return <>
        {List}
    </>
}

export default CategoryTreatment;