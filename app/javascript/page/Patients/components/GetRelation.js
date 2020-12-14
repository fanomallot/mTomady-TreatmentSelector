import axios from 'axios';
import React,{useState,useEffect, Fragment} from 'react';


const GetRelation = ({patient_id}) => {
    const [treatment, setTreatment] = useState([])
    useEffect(() => {
        axios.get(`/api/mtomady/patient/${patient_id}/treatment_patient_refs`)
            .then((resp) => {
                setTreatment(resp.data.data)
            })
            .catch((resp) => { console.log(resp) })
    }, [treatment.length])
    
    const list = treatment.map((treatment,key) => { 
        return <Fragment key={key}>
            {treatment.attributes.name}
        </Fragment>
    } )
    return <>
      {list}
    </>
}
export default GetRelation;