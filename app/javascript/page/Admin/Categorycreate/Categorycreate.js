import Axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';



class Categorycreate extends Component{

    constructor(props) {
        super(props)
        this.state = {
            category: [],
            status: 0,
            statusbase: 0
        }
    }
    componentDidMount() {
        Axios.get('/api/mtomady/category')
            .then((resp) => {
                this.setState({category: resp.data.data})
            })
            .catch((resp) => console.log(resp))
    }
    render() {
        const List = this.state.category.map((category, key) => {
            return (
                <div key={key} >
                    <Link to={`/Admin-dashboard/${category.attributes.name}/${category.id}/treatments`}>
                        {category.attributes.name}
                    </Link>
                    {this.state.status === category.id ? (<Formik
                        initialValues={{
                            name: category.attributes.name,
                            name_fr: category.attributes.name_fr,
                            name_mg: category.attributes.name_mg
                        }}
                        onSubmit={async (values) => {
                            Axios.put(`/api/mtomady/category/${category.id}`, values)
                                .then(resp => {
                                    if (resp.status == 204) {
                                    alert('Donnez sauvegarder')
                                    }
                                })
                            .catch(resp =>{})
                            values.name = ""
                            values.name_fr = ""
                            values.name_mg = ""
                        }}
                            >
                        <Form>
                            <div>Veuillez saisir le nom </div>
                            <label >Name</label>
                            <Field name="name" type="text" required/>
                            <label >Nom</label>
                            <Field name="name_fr" type="text" required/>
                            <label >Anarana</label>
                            <Field name="name_mg" type="text" required/>
                            <button type="submit">Submit</button>
                        </Form>
                    </Formik>): (<button onClick={() => { this.setState({ status: category.id }) }} >Modifier</button>)    
                    }
                </div>
            )
        })
        return <div>
            {List}
            {this.state.statusbase === 0 ? (<>Créer<button onClick={() => { this.setState({ statusbase: 1 }) }}>Créer</button></>) : (<><Formik
                initialValues={{
                    name: "",
                    name_fr: "",
                    name_mg: ""
                }}
                onSubmit={async (values) => {
                    Axios.post('/api/mtomady/category', values)
                        .then(resp => {
                        if (resp.status == 204) {
                        alert('Donnez sauvegarder')
                        }
                    })
                    .catch(resp =>{})
                    values.name = ""
                    values.name_fr = ""
                    values.name_mg = ""
                }}
                    >
                <Form>
                    <div>Veuillez saisir le nom </div>
                    <label >Name</label>
                    <Field name="name" type="text" required/>
                    <label >Nom</label>
                    <Field name="name_fr" type="text" required/>
                    <label >Anarana</label>
                    <Field name="name_mg" type="text" required/>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
            <button onClick={() => { this.setState({ statusbase: 0 }) }}>annuler</button></>
            )}
        </div>
    }

}
export default Categorycreate;