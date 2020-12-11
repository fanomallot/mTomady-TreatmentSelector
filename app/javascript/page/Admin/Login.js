import React from 'react';
import { Formik, Form, Field } from 'formik'
import axios from 'axios';

const Login = () => {
    
    return <Formik
    initialValues={{
        give_email: "",
            give_pas: ""
        }}
        onSubmit={async (values) => {
            axios.get(`/api/mtomady/admin/${values.give_email}`)
                .then((resp) => { console.log(resp)  })
                .catch((resp) => { console.log(resp) })   
        }}
            >
        <Form>
            <div>Veuillez saisir votre nom</div>
            <Field name="give_name" type="name" required placeholder="Username"/>
            <Field name="give_pas" type="password" required placeholder="password"/>
            <button type="submit">Submit</button>
        </Form>
    </Formik>
}
export default Login;