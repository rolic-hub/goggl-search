import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom'
import {Resultprovider} from './context/Resultprovider'


ReactDOM.render(
  <Resultprovider>
      <Router>
      <App />
  </Router>
  </Resultprovider>,

  
  document.getElementById("root")
);