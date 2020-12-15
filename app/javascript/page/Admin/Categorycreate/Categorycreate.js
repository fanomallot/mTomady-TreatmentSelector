import { faEye, faTimes, faTrash} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './categoryadmin.scss';
import i18n from '../../i18n'


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
        this.setState({
            category: this.state.category.filter((i) => i.id !== category_id )
        })
        Axios.delete(`/api/mtomady/category/${category_id}`)
            .then((resp) => {
                if (resp.status == 200 || resp.status == 204) {
                    console.log('Data remove')
                }else {
                    alert("error on remove")
                }
            })
            .catch((resp) => console.log(resp))
    }
    check_language(item) {
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
    render() {
        const {t} = this.props
        const List = this.state.category.map((category, key) => {
            return (
                <div key={key} >
                    <hr />
                    <div className="flex-box-2">
                        {this.check_language(category.attributes)}
                        
                        <div className="link-right flex-box">
                        <Link className="link-see" to={`/Admin-dashboard/${category.attributes.name}/${category.id}/treatments`} title="see">
                            <FontAwesomeIcon icon={faEye} />
                        </Link>
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
                                                
                                                if (resp.status == 200 || resp.status == 204) {
                                                    alert(`${t("treatment.save")}`)
                                                    this.setState({
                                                        status: 0,
                                                        category: [resp.data.data,...this.state.category.filter((i) => i.id !== category.id )]
                                                    })
                                                } else {
                                                    alert(`${t("treatment.error")}`)
                                                }
                                            })
                                        .catch(resp =>{})
                                        values.name = ""
                                        values.name_fr = ""
                                        values.name_mg = ""
                                    }}
                                        >
                                    <Form className="form flex-box flex-d-c">
                                        <div className="Title field-title">{t("category.edit_title")}</div>
                                        <label >{t("category.version_en")}</label>
                                        <Field name="name" type="text" required/>
                                        <label >{t("category.version_fr")}</label>
                                        <Field name="name_fr" type="text" required/>
                                        <label >{t("category.version_mg")}</label>
                                        <Field name="name_mg" type="text" required/>
                                        <button type="submit">{t("treatment.button")}</button>
                                    <p className="annulation" onClick={() => { this.setState({ status: 0 }) }}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </p>
                                    </Form>
                                    </Formik>
                                </div>
                            ) : (<button onClick={() => { this.setState({ status: category.id }) }} >{t("category.edit")}</button>)    
                            }
                            <p className="delete" onClick={() => { if(window.confirm(`${t("treatment.delete")}`)){this.removeCategory(category.id)} }} title="delete"><FontAwesomeIcon icon={faTrash} /> </p>
                            
                        </div>
                    </div>
                </div>
            )
        })
        return <div className="category-create-box p-8">
            <div className="Title">{t("category.title")}</div>
            {this.state.statusbase === 0 ? (<button onClick={() => { this.setState({ statusbase: 1 }) }}>{t("category.create")}</button>) : (<div className="cat-create-form flex-box flex-d-c"><Formik
                initialValues={{
                    name: "",
                    name_fr: "",
                    name_mg: ""
                }}
                onSubmit={async (values) => {
                    Axios.post('/api/mtomady/category', values)
                        .then(resp => {
                            if (resp.status == 200 || resp.status == 204) {
                            alert(`${t("treatment.save")}`)
                            this.setState({
                                statusbase: 0,
                                category: [resp.data.data,...this.state.category]
                            })
                        }else {
                            alert(`${t("treatment.error")}`)
                        }
                    })
                    .catch(resp =>{})
                    values.name = ""
                    values.name_fr = ""
                    values.name_mg = ""
                }}
                    >
                <Form className="form flex-box flex-d-c">
                    <div className="Title field-title">{t("category.create_title")} </div>
                    <label >{t("category.version_en")}</label>
                    <Field name="name" type="text" required placeholder={t("treatment.plh_namex")}/>
                    <label >{t("category.version_fr")}</label>
                    <Field name="name_fr" type="text" placeholder={t("treatment.plh_namex")}/>
                    <label >{t("category.version_mg")}</label>
                    <Field name="name_mg" type="text" placeholder={t("treatment.plh_namex")}/>
                    <button type="submit">{t("treatment.button")}</button>
                <p className="annulation" onClick={() => { this.setState({ statusbase: 0 }) }}>
                    <FontAwesomeIcon icon={faTimes} />
                </p>
                </Form>
            </Formik>
            </div>
            )}
            {List}
            <hr/>
        </div>
    }

}
export default withTranslation()(Categorycreate);