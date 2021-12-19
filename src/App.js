import React from 'react';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';

import './App.css';
import Dashboard from './Dashboard';
import Register from './Register';
import Login from './Login';
import useToken from './useToken';

function Logout() {
  sessionStorage.removeItem('token');
  window.location.assign("/");
}
function Fetch() {

    // fetch("http://localhost:2400/allow-cors", {
    //   mode: 'cors',
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json'
    // },

    // }).then(data => console.log(data))
    fetch("http://localhost:2400/api/auth/signup", {
      mode: 'cors',
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "login": "admin",
        "email": "admin@admin",
        "password": "1233321"
       })
  }).then(response => response.json())
  .then(data => console.log(data));
 }
function App() {

  const { token, setToken } = useToken();

  if(!token) {
    return (
    <div style={{margin: "auto"}}>
    <BrowserRouter>
    <button onClick={Fetch}>Fetch</button>
    <div id="fetchtest"></div>
      <Link to="/register"><button>Rejestracja</button></Link><br />
      <Link to="/login"><button>Logowanie</button></Link>
         <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
           <Login setToken={setToken} />
          </Route>
        </Switch> 
      </BrowserRouter>
    </div>
    );
  }

  return (
    <div className="wrapper">
      <h1>Zalogowano</h1>
      <BrowserRouter>
      <button onClick={Logout}>Wyloguj</button>
      <Link to="/dashboard"><button>Dashboard</button></Link>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/register">
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;