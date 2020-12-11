import React, { Component} from 'react';
import Searchbar from './component/Searchbar';
import TreatmentTable from './component/TreatmentTable';
import { Formik, Form, Field } from 'formik'
import axios from 'axios'
import history from '../history'


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
            return <Formik
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
                <Form>
                    <div>Veuillez saisir votre nom</div>
                    <Field name="give_name" type="text" required/>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        }
        if (this.state.status == 1) {
            return <div>
                Bienvenue {this.state.patient_name}
                
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
                        <Searchbar
                            filterText={this.state.filterText}
                            onFindtext={this.findtext}
                        />
                        <TreatmentTable 
                            filterText={this.state.filterText}
                        />    
                        <button type="submit">Submit</button>
                    </Form>
                </Formik>
            </div>
        }
    }
}
export default Treatement;