import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Admin/Login';
import Category from './category/category';
import Home from './home/home'  
import "./App.scss"
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import Treatments from './Treatements/Treatments';
import Patients from './Patients/Patients';
import Categorycreate from './Admin/Categorycreate/Categorycreate';
import TreatmentCreate from './Admin/TreatmentCreate/TreatmentCreate';
import LeftMenu from './Admin/LeftMenu';
const App = (props) => {
  
  return <>
    <Navbar />
    <div className="home-big-box">
      {props.location.pathname.indexOf("/Admin-dashboard") !== -1 ? (<div className="left-menu">
        <LeftMenu /> 
      </div>): null}
      <div className="home-page">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/categories" component={Category} />
          <Route exact path="/treatments" component={Treatments} />
          <Route exact path="/secret-page-admin/login" component={Login} />
          <Route exact path="/Admin-dashboard/patient-list" component={Patients} />
          <Route exact path="/Admin-dashboard/category" component={Categorycreate} />
          <Route exact path="/Admin-dashboard/:category_name/:category_id/treatments" component={TreatmentCreate} />
        </Switch>

      </div>
    </div>
  <Footer/>
  </>
}
   
export default App;