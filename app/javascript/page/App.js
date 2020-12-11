import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Admin/Login';
import Category from './category/category';
import Home from './home/home'  
import "./App.css"
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import Treatments from './Treatements/Treatments';
const App = () => (
  <>
    <Navbar />
    <div className="home-big-box">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/categories" component={Category} />
        <Route exact path="/treatments" component={Treatments} />
        <Route exact path="/secret-page-admin/login" component={Login} />
      </Switch>

    </div>
  <Footer/>
  </>
)
   
export default App;