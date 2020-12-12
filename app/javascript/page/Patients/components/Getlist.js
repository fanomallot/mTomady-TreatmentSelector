import axios from 'axios';
import React, { useState, useEffect } from 'react';
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
        return <div key={index}>
            {patient.attributes.name}
            {/* <GetRelation patient_id={patient.id}/> */}

        </div>
    })


    return <div>
       {list}
    </div>
}
export default Getlist;