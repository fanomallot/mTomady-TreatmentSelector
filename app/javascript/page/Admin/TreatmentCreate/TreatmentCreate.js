import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import i18n from '../../i18n'


class TreatmentCreate extends Component{

    constructor(props) {
        super(props)
        this.state = {
            treatments: [],
            status: 0,
            statusbase: 0
        }
    }
    componentDidMount() {
        Axios.get(`/api/mtomady/category/${this.props.match.params.category_id}/treatments`)
            .then((resp) => {
                this.setState({treatments: resp.data.data})
            })
            .catch((resp) => console.log(resp))
    }
    removetreatment(treatment_id) {
        Axios.delete(`/api/mtomady/category/${this.props.match.params.category_id}/treatments/${treatment_id}`)
            .then((resp) => {
                if (resp.status == 200 || resp.status == 204) {
                    this.setState({
                        treatments: this.state.treatments.filter((i) => i.id !== treatment_id )
                    })
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
        const List = this.state.treatments.map((treatment, key) => {
            return (
                <div key={key} >
                    <hr />
                    <div className="flex-box-2">
                        {this.check_language(treatment.attributes)}
                        <div className="link-right flex-box">
                            {this.state.status === treatment.id ? (<div className="cat-create-form flex-box flex-d-c">
                                <Formik
                                initialValues={{
                                    name: treatment.attributes.name,
                                    name_fr: treatment.attributes.name_fr,
                                    name_mg: treatment.attributes.name_mg
                                }}
                                onSubmit={async (values) => {
                                    Axios.put(`/api/mtomady/category/${this.props.match.params.category_id}/treatments/${treatment.id}`, values)
                                        .then(resp => {
                                            if (resp.status == 200 || resp.status == 204) {
                                                alert(`${t("treatment.save")}`)
                                                this.setState({
                                                    status: 0,
                                                    treatments: [resp.data.data,...this.state.treatments.filter((i) => i.id !== treatment.id )]
                                                })
                                            }else {
                                                alert("Error on save")
                                                this.setState({
                                                    status: 0
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
                                    <div className="Title field-title">{t("treatment.edit_title")}</div>
                                    <label >{t("category.version_en")}</label>
                                    <Field name="name" type="text" required/>
                                    <label >{t("category.version_fr")}</label>
                                    <Field name="name_fr" type="text" />
                                    <label >{t("category.version_mg")}</label>
                                    <Field name="name_mg" type="text" />
                                    <button type="submit">{t("treatment.button")}</button>
                                <p className="annulation" onClick={() => { this.setState({ status: 0 }) }}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </p>
                                </Form>
                                </Formik>
                            </div>): (<button onClick={() => { this.setState({ status: treatment.id }) }} >{t("category.edit")}</button>)    
                            }
                            <p className="delete" onClick={() => { if(window.confirm(`${t("treatment.delete")}`)){this.removetreatment(treatment.id)} }} ><FontAwesomeIcon icon={faTrash} /></p>
                            
                        </div>
                    </div>
                </div>
            )
        })
        return <div className="category-create-box p-8">
            <div className="Title">{t("treatment.title")}</div>
            {this.state.statusbase === 0 ? (<button onClick={() => { this.setState({ statusbase: 1 }) }}>{t("treatment.create")}</button>) : (<div className="cat-create-form flex-box flex-d-c">                
                <Formik
                initialValues={{
                    name: "",
                    name_fr: "",
                    name_mg: ""
                }}
                onSubmit={async (values) => {
                    Axios.post(`/api/mtomady/category/${this.props.match.params.category_id}/treatments`, values)
                        .then(resp => {
                            if (resp.status == 200 || resp.status == 204) {
                            alert(`${t("treatment.save")}`)
                            this.setState({
                                statusbase: 0,
                                treatments: [resp.data.data,...this.state.treatments]
                            })
                        }else {
                            alert("Error on save")
                            this.setState({
                                statusbase: 0
                            })
                        }
                    })
                    .catch(resp =>{})
                    console.log(values)
                    values.name = ""
                    values.name_fr = ""
                    values.name_mg = ""
                }}
                    >
                <Form className="form flex-box flex-d-c">
                <div className="Title field-title">{t("treatment.create_title")}</div>
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
export default withTranslation() (TreatmentCreate);