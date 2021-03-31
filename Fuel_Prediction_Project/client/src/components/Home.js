import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../components/Login';
import Profile from '../components/Profile';
import Register from '../components/Register';
import Dashboard from '../components/Dashboard';
import FuelQuote from '../components/FuelQuote';
import FuelHistory from '../components/FuelHistory';

const Main = () => {
  return (
    <Switch> 
      <Route exact path='/' component={Login}></Route>
      <Route exact path='/Dashboard' component={Dashboard}></Route>
      <Route exact path='/Profile' component={Profile}></Route>
      <Route exact path='/Register' component={Register}></Route>      
      <Route exact path='/FuelQuote' component={FuelQuote}></Route>
      <Route exact path='/FuelHistory' component={FuelHistory}></Route>
    </Switch>
  );
}

export default Main;
