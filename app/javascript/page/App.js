import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Admin/Login';
import Category from './category/category';
import Home from './home/home'  
import Navbar from './Navbar/Navbar';
import Treatments from './Treatements/Treatments';

const App = () => (
  <>
  <Navbar/>
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/categories" component={Category} />
    <Route exact path="/treatments" component={Treatments} />
    <Route exact path="/secret-page-admin/login" component={Login} />
  </Switch>
  </>
)
   
export default App;