import React, {useState,useEffect, Fragment} from 'react';
import axios from 'axios'
import { Formik, Form, Field } from 'formik'
import '../category.scss'
import { useTranslation } from 'react-i18next';

const CategoryTreatment = ({ category_id, treatmentValue }) => {
    const [t,i18n] = useTranslation()
    const [treatments, setTreatments] = useState([])
    
    useEffect(() => { 
        axios
            .get(`/api/mtomady/category/${category_id}/treatments`)
            .then((resp) => {
                setTreatments(resp.data.data)
            })
            .catch((resp) => console.log(resp))
    }, [treatments.length])
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
    const List = treatments.map((treatment, key) => {
        if (treatment.attributes.name.toUpperCase().indexOf(treatmentValue.toUpperCase()) === -1) { 
            return
        }
        return <div key={key} className="formcheck2">
            <label id="condition-check">
                <Field name="treatment_id" type="radio" value={treatment.id } required/>
                {check_language(treatment.attributes)}
                <span className="checkmark"></span>
            </label>
        </div>
    })

    return <>
        {List}
    </>
}

export default CategoryTreatment;