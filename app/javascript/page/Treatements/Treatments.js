import React, { Component} from 'react';
import Searchbar from './component/Searchbar';
import TreatmentTable from './component/TreatmentTable';
import { Formik, Form, Field } from 'formik'
import axios from 'axios'
import history from '../history'
import './treatment.scss'


class Treatement extends Component{
    constructor(props){
        super(props)
        this.state = {
            filterText: "",
            patient_name: "",
            status: 0
        }
        this.findtext = this.findtext.bind(this)
    }

    findtext(filterText){ 
        this.setState({filterText})
    }
    render() {
        if (this.state.status == 0) {
            return <div className="form-box flex-box flex-d-c">
                <Formik
                    initialValues={{
                        give_name: ""
                    }}
                    onSubmit={async (values) => {
                        this.setState({
                            patient_name: values.give_name,
                            status: 1
                        })
                        values.give_name = ""
                    }}
                        >
                    <Form className="form ">
                        <p>Type your name.</p>
                        <Field name="give_name" type="text" required placeholder="Name"/>
                        <button type="submit">Submit</button>
                    </Form>
                </Formik>
            </div>
        }
        if (this.state.status == 1) {
            return <div className="next-form">
                <div className="name">Welcome <span>{this.state.patient_name}</span> </div> 
                
                <Formik
                        initialValues={{
                            patient: `${this.state.patient_name}`,
                            treatment_id: ""
                        }}
                    onSubmit={async (values) => {  
                        axios.post('/treatment_patient_refs', values)
                            .then(resp => {
                                if (resp.status == 204) {
                                    alert('Donnez sauvegarder')
                            }
                        })
                            .catch(resp => { })
                        values.treatment_id = ""
                        values.patient = " "
                        this.setState({
                            filterText: ''
                        })
                        history.push('/')
                        window.location.reload()
                        }}
                            >
                    <Form>
                        <Field name="patient" type="text" required hidden/>
                        <div className="form-field">
                            <label >Find Treatement</label>
                            <Searchbar
                            filterText={this.state.filterText}
                            onFindtext={this.findtext}
                            />
                        </div>
                        <TreatmentTable 
                            filterText={this.state.filterText}
                        />    
                        <div className="button">
                            <button type="submit">Submit</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        }
    }
}
export default Treatement;