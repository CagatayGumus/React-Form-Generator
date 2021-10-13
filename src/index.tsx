import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route } from 'react-router-dom'

const router = 
<Router>
  <Route path="/" exact component={App}></Route>
</Router>


ReactDOM.render(router,document.getElementById('root'));
reportWebVitals();
