import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Nav';
//import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import {Provider} from 'react-redux';
import {createStore, applymiddleware} from 'redux';

const store = createStore(()=>{}, {}, applyMiddleware)

class App extends Component {
  render() {
    return (
    <Provider store = {store}>
        <Router>
            <div className="App">
                <Navbar/>
                <Route exact path={'/'} component={Landing}/>
                <div className="container">
                    <Route exact path={'/login'} component={Login}/>
                    <Route exact path={'/register'} component={Register}/>
                </div>
            </div>
        </Router>
    </Provider>
    );
  }
}

export default App;
