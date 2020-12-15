import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { userLoginAttempt } from '../../page/redux/Auth/auth.action';
import { withTranslation } from 'react-i18next';
import './login.scss';



class Login extends React.Component{
    render() {
      const { error } = this.props
      const { t } = this.props
      const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .required("The field must not be empty"),
        password: Yup.string()
            .required("The field must not be empty")
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
              this.props.userLoginAttempt(values);
            }}
        >
          {({ errors, touched }) => (
            <Form className="flex-box flex-d-c form-log-box">
                <div>{t("login.title")}</div>
                <Field name="email" type="name" required placeholder={t("login.plh_name")} />
                { errors.email && touched.email ? ( <div className="text-red-600 text-sm font-bold">{t("login.message1")}</div>) : null }  
                <Field name="password" type="password" required placeholder={t("login.plh_pass")}/>
                {errors.password && touched.password ? (<div className="text-red-600 text-sm font-bold">{t("login.message1")}</div>) : null}
                <label >
                  {error ? <div className="text-red-600 text-sm font-bold">{t("login.message2")}</div>: null}
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
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Login));
  