import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { userLoginAttempt } from '../../page/redux/Auth/auth.action';
import { withTranslation } from 'react-i18next';
import './login.scss';



class Login extends React.Component{
    render() {
      const { error, t } = this.props
      const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .required(`${t("login.message1")}`),
        password: Yup.string()
            .required(`${t("login.message1")}`)
      });
      return(
        <div className="form-box flex-box">
        <Formik
           initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={LoginSchema}
              onSubmit={(values) => {
                console.log(values)
              this.props.userLoginAttempt(values);
            }}
        >
          {({ errors, touched }) => (
            <Form className="flex-box flex-d-c form-log-box">
                <div>{t("login.title")}</div>
                <Field name="email" type="name" required placeholder={t("login.plh_name")} />
                { errors.email && touched.email ? ( <div className="text-red-600 text-sm font-bold">{errors.email}</div>) : null }  
                <Field name="password" type="password" required placeholder={t("login.plh_pass")}/>
                {errors.password && touched.password ? (<div className="text-red-600 text-sm font-bold">{errors.password}</div>) : null}
                <label >
                    { error}
                </label>
                <button type="submit">{t("treatment.button")}</button>
            </Form>
        )}
        </Formik>
        </div>                          
      )
    }
  }
const mapStateToProps = (state) => {
    return {
        ...state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userLoginAttempt: (values) => {dispatch(userLoginAttempt(values))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)  (withTranslation()(Login));
  