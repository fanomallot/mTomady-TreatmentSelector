import React from 'react';
import { Formik, Form, Field } from 'formik'

const Login = () => {
    return <Formik
        initialValues={{
            give_name: ""
        }}
        onSubmit={async (values) => {
           console.log(values)
        }}
            >
        <Form>
            <div>Veuillez saisir votre nom</div>
            <Field name="give_name" type="email" required/>
            <Field name="give_name" type="text" required/>
            <button type="submit">Submit</button>
        </Form>
    </Formik>
}
export default Login;