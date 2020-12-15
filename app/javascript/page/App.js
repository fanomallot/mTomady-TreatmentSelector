import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Admin/Login';
import Category from './category/category';
import Home from './home/home';  
import "./App.scss";
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import Treatments from './Treatements/Treatments';
import Patients from './Patients/Patients';
import Categorycreate from './Admin/Categorycreate/Categorycreate';
import TreatmentCreate from './Admin/TreatmentCreate/TreatmentCreate';
import LeftMenu from './Admin/LeftMenu';
import { Trans, useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import LogOut from './Admin/logout';
import history from '../page/history';


const App = (props) => {
  const { isAuthenticated} = props;
  const { t, i18n } = useTranslation();
  const changeLanguage = (language) => {
      i18n.changeLanguage(language);
  };
  function goHome() {
    if (props.location.pathname.indexOf("/Admin-dashboard") !== -1) {
      history.push('/');
      window.location.reload();
    }
  }
  return <>
    <Navbar />
    <div className="language-box">
      <div onClick={() => changeLanguage("en")}>EN</div>
      <div onClick={() => changeLanguage("mg")}>mg</div>
      <div onClick={() => changeLanguage("fr")}>fr</div>
    </div>
    <div className="home-big-box">
      {props.location.pathname.indexOf("/Admin-dashboard") !== -1 ? (<div className="left-menu">
        {isAuthenticated ? (<LeftMenu />) : null}
      </div>) : null}
      {isAuthenticated ? null :  goHome()}
      
      <div className="home-page">
        <Switch>
          {isAuthenticated ? (
            <>
              <LogOut/>
              <Route exact path="/" component={Home} />
              <Route exact path="/Admin-dashboard/patient-list" component={Patients} />
              <Route exact path="/Admin-dashboard/category" component={Categorycreate} />
              <Route exact path="/Admin-dashboard/:category_name/:category_id/treatments" component={TreatmentCreate} />
            </>) : 
            <>
              <Route exact path="/" component={Home} />
              <Route exact path="/categories" component={Category} />
              <Route exact path="/treatments" component={Treatments} />
              <Route exact path="/secret-page-admin/login" component={Login} />
            </>
            }
        </Switch>

      </div>
    </div>
  <Footer/>
  </>
}
   
const mapStateToprops =(state) => {
  return {
    ...state.auth
  }
}

export default connect(mapStateToprops)(App);