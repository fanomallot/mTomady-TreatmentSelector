import React from 'react';
import { Formik, Form, Field } from 'formik'
import axios from 'axios';
import './login.scss'
import history from '../history'

const Login = () => {
    
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
                            alert(`Welcome doctor ${resp.data.data.attributes.name}`)
                            history.push('/Admin-dashboard/patient-list')
                            window.location.reload()
                        }
                    })
                    .catch((resp) => { console.log(resp) })   
            }}
                >
            <Form className="flex-box flex-d-c form-log-box">
                <div>Type username/password</div>
                <Field name="give_name" type="name" required placeholder="Username"/>
                <Field name="give_pas" type="password" required placeholder="password"/>
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    </div> 
}
export default Login;