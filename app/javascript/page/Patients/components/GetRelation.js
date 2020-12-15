import axios from 'axios';
import React,{useState,useEffect, Fragment} from 'react';
import { useTranslation } from 'react-i18next';


const GetRelation = ({patient_id}) => {
    const [treatment, setTreatment] = useState([])
    const [t, i18n] = useTranslation()
    useEffect(() => {
        axios.get(`/api/mtomady/patient/${patient_id}/treatment_patient_refs`)
            .then((resp) => {
                setTreatment(resp.data.data)
            })
            .catch((resp) => { console.log(resp) })
    }, [treatment.length])
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
    const list = treatment.map((treatment,key) => { 
        return <Fragment key={key}>
            {check_language(treatment.attributes)}
        </Fragment>
    } )
    return <>
      {list}
    </>
}
export default GetRelation;