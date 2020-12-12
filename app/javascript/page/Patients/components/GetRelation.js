import axios from 'axios';
import React,{useState,useEffect} from 'react';


const GetRelation = ({patient_id}) => {
    const [treatment, setTreatment] = useState([])
    const [traitement, setTraitement] = useState()
    useEffect(() => {
        axios.get(`/api/mtomady/patient/${patient_id}/treatment_patient_refs`)
            .then((resp) => {
                setTraitement(resp.data.data)
            })
            .catch((resp) => { console.log(resp) })
    }, [])
    const check = traitement.attributes.treatment_id
    
    // useEffect(() => {
    //     axios.get(`/api/mtomady/treatments/${tpr.attributes.treatment_id}`)
    //         .then((resp) => {
    //             console.log(resp.data.data)
    //         })
    //         .catch((resp) => { console.log(resp) })

    // }, [])
    
    return <div>
      {patient_id}
      {check}
    </div>
}
export default GetRelation;