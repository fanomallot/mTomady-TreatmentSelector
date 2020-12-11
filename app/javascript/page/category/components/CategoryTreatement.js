import React, {useState,useEffect, Fragment} from 'react';
import axios from 'axios'
import {Formik,Form,Field} from 'formik'

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
        return <div key={key} >
            <Field name="treatment_id" type="radio" value={treatment.id }/>
            <label htmlFor="treatment_id">{treatment.attributes.name}</label>
        </div>
    })

    return <>
        {List}
    </>
}

export default CategoryTreatment;