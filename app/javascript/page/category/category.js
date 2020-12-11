import React, { Component } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import CategoryList from './components/CategoryList';
import Searchbar from '../Treatements/component/Searchbar';
import history from '../history';

class Category extends Component{
    constructor(props){
        super(props)
        this.state = {
            filterTextCategory: "",
            filterTextTreatment: "",
            patient_name: "",
            status: 0
        }
        this.findtextCategory = this.findtextCategory.bind(this)
        this.findtextTreatment = this.findtextTreatment.bind(this)
    }
    findtextCategory(filterTextCategory) {
        this.setState({filterTextCategory: filterTextCategory})
    }

    findtextTreatment(filterTextTreatment) {
        this.setState({filterTextTreatment: filterTextTreatment})
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

    return <div className="home-box">
        <div className="content">
        Bienvenue {this.state.patient_name}
            <Formik
                initialValues={{
                    patient: `${this.state.patient_name}`,
                    treatment_id: ""
                }}
                onSubmit={async (values) => {
                    alert('Donnez sauvegarder')
                    axios.post('/treatment_patient_refs', values)
                    .then(resp =>{})
                    .catch(resp =>{})
                    values.treatment_id = ""
                    values.patient = " "
                    history.push('/')
                    window.location.reload()
                }}
                    >
                <Form>
                    <Field name="patient" type="text" value={this.state.patient_name} required hidden />
                    <label >Find Category</label>
                    <Searchbar
                    filterText={this.state.filterTextCategory}
                    onFindtext={this.findtextCategory}
                    />
                    <label >Find Treatement</label>
                    <Searchbar
                    filterText={this.state.filterTextTreatment}
                    onFindtext={this.findtextTreatment}
                    />
                    
                    <CategoryList
                    filterText={this.state.filterTextTreatment}
                    filterTextC={this.state.filterTextCategory}
                    />
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
            
        </div>
    </div>
   } 
}

export default Category;