import Axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './categoryadmin.scss'


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
    removeCategory(category_id) {
        Axios.delete(`/api/mtomady/category/${category_id}`)
            .then((resp) => {
                if (resp.status === 204) {
                    alert('Data remove')
                }
            })
            .catch((resp) => console.log(resp))
    }
    render() {
        const List = this.state.category.map((category, key) => {
            return (
                <div key={key} >
                    <hr />
                    <div className="flex-box-2">
                        <Link to={`/Admin-dashboard/${category.attributes.name}/${category.id}/treatments`}>
                            {category.attributes.name}
                        </Link>
                        <div className="link-right flex-box">
                            {this.state.status === category.id ? (
                                <div className="cat-create-form flex-box flex-d-c">
                                    <Formik
                                    initialValues={{
                                        name: category.attributes.name,
                                        name_fr: category.attributes.name_fr,
                                        name_mg: category.attributes.name_mg
                                    }}
                                    onSubmit={async (values) => {
                                        Axios.put(`/api/mtomady/category/${category.id}`, values)
                                            .then(resp => {
                                                if (resp.status == 200) {
                                                    alert('Data save')
                                                    this.setState({status: 0})
                                                }
                                            })
                                        .catch(resp =>{})
                                        values.name = ""
                                        values.name_fr = ""
                                        values.name_mg = ""
                                    }}
                                        >
                                    <Form className="form flex-box flex-d-c">
                                        <div className="Title field-title">Edit category</div>
                                        <label >English category's name</label>
                                        <Field name="name" type="text" required/>
                                        <label >French category's name</label>
                                        <Field name="name_fr" type="text" required/>
                                        <label >Malagasy category's name</label>
                                        <Field name="name_mg" type="text" required/>
                                        <button type="submit">Submit</button>
                                    </Form>
                                    </Formik>
                                    <p className="annulation" onClick={() => { this.setState({ status: 0 }) }}>
                                        <img src="/med.jpg" alt="icon close"/>
                                    </p>
                                </div>
                            ) : (<button onClick={() => { this.setState({ status: category.id }) }} >Edit</button>)    
                            }
                            <p className="delete" onClick={() => { this.removeCategory(category.id)}} ><img src="/med.jpg" alt="icon trash"/></p>
                        </div>
                    </div>
                </div>
            )
        })
        return <div className="category-create-box">
            <div className="Title">Category list</div>
            {this.state.statusbase === 0 ? (<button onClick={() => { this.setState({ statusbase: 1 }) }}>Create a new category</button>) : (<div className="cat-create-form flex-box flex-d-c"><Formik
                initialValues={{
                    name: "",
                    name_fr: "",
                    name_mg: ""
                }}
                onSubmit={async (values) => {
                    Axios.post('/api/mtomady/category', values)
                        .then(resp => {
                        console.log(resp.data.data)
                        if (resp.status == 200) {
                            alert('Data save')
                            this.setState({
                                statusbase: 0
                            })
                        }
                    })
                    .catch(resp =>{})
                    values.name = ""
                    values.name_fr = ""
                    values.name_mg = ""
                }}
                    >
                <Form className="form flex-box flex-d-c">
                    <div className="Title field-title">Type new category's name </div>
                    <label >English category's name</label>
                    <Field name="name" type="text" required placeholder="Example Name"/>
                    <label >French category's name</label>
                    <Field name="name_fr" type="text" placeholder="Example Name"/>
                    <label >Malagasy category's name</label>
                    <Field name="name_mg" type="text" placeholder="Example Name"/>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
                <p className="annulation" onClick={() => { this.setState({ statusbase: 0 }) }}>
                    <img src="/med.jpg" alt="icon close"/>
                </p>
            </div>
            )}
            {List}
            <hr/>
        </div>
    }

}
export default Categorycreate;