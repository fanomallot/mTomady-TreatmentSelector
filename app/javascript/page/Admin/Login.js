import React from 'react';
import { Formik, Form, Field } from 'formik'
import axios from 'axios';
import './login.scss'
import history from '../history'
import { useTranslation } from 'react-i18next';

const Login = () => {
    const [t,i18n] = useTranslation()
    return <div className="form-box flex-box">
        <Formik
            initialValues={{
                give_name: "",
                give_pas: ""
            }}
            onSubmit={async (values) => {
                axios.get(`/api/mtomady/admin/log/${values.give_name}/${values.give_pas}`)
                    .then((resp) => {
                        if (resp.data.data !== null) {
                            alert(`${t("login.welcome")} ${resp.data.data.attributes.name}`)
                            history.push('/Admin-dashboard/patient-list')
                            window.location.reload()
                        }
                    })
                    .catch((resp) => { console.log(resp) })   
            }}
                >
            <Form className="flex-box flex-d-c form-log-box">
                <div>{t("login.title")}</div>
                <Field name="give_name" type="name" required placeholder={t("login.plh_name")}/>
                <Field name="give_pas" type="password" required placeholder={t("login.plh_pass")}/>
                <button type="submit">{t("treatment.button")}</button>
            </Form>
        </Formik>
    </div> 
}
export default Login;