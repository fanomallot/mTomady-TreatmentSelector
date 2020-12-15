import React, { Component} from 'react';
import Searchbar from './component/Searchbar';
import TreatmentTable from './component/TreatmentTable';
import { Formik, Form, Field } from 'formik';
import Axios from 'axios';
import history from '../history';
import './treatment.scss';
import { withTranslation } from 'react-i18next';


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
        const {t} = this.props
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
                    <Form className="form flex-box flex-d-c">
                        <p>{t("treatment.head")}</p>
                        <Field name="give_name" type="text" required placeholder={t("treatment.plh_name")}/>
                        <button type="submit" className="button">{t("treatment.button")}</button>
                    </Form>
                </Formik>
            </div>
        }
        if (this.state.status == 1) {
            return <div className="next-form p-8">
                <div className="Title">{t("treatment.title")} </div> 
                <Formik
                        initialValues={{
                            patient: `${this.state.patient_name}`,
                            treatment_id: ""
                        }}
                    onSubmit={async (values) => {
                        Axios.post('/treatment_patient_refs', values)
                            .then(resp => {
                                if (resp.status == 200 || resp.status == 204) {
                                    alert(`${t('treatment.save')}`)
                                history.push('/')
                                window.location.reload()
                            } else {
                                alert(`${t('treatment.error')}`)
                            }
                        })
                            .catch(resp => { })
                        values.treatment_id = ""
                        values.patient = " "
                        this.setState({
                            filterText: ''
                        })
                       
                        }}
                            >
                    <Form>
                        <div className="list-box-o b-bottom">
                            <Field name="patient" type="text" required hidden/>
                            <div className="form-field ">
                            <div className="name">{t("treatment.welcome")} <span>{this.state.patient_name}</span></div>
                                <Searchbar
                                placeholder={t("treatment.plh_find")}
                                filterText={this.state.filterText}
                                onFindtext={this.findtext}
                                />
                            </div>
                        </div>
                        <div className="list-box-o make-overflow">
                            <TreatmentTable 
                                filterText={this.state.filterText}
                            />    
                        </div>
                        <div className="button list-box-o b-top">
                            <button type="submit">{t("treatment.button")}</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        }
    }
}
export default withTranslation()(Treatement);