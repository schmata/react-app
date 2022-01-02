import React from 'react';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';

import './App.css';
import Dashboard from './Dashboard';
import Register from './Register';
import Login from './Login';
import Activate  from './activate';
import useToken from './useToken';

function Logout() {
  sessionStorage.removeItem('token');
  window.location.assign("/");
}
// async function LoggedinTest() {
//   const data = await fetch('http://localhost:2400/auth/loggedin', {
//     method: 'GET',
//   });
//   return await data.json();
// }
// const handleSubmit = async e => {
//   e.preventDefault();
//   const response = await LoggedinTest();
//   console.log(response);
// }
function App() {

  const { token, setToken } = useToken();

  if(!token) {
    return (
    <div style={{margin: "auto"}}>
    <BrowserRouter>
    {/* <button onClick={handleSubmit}>LoggedInTest</button><br /> */}
      <Link to="/register"><button>Rejestracja</button></Link><br />
      <Link to="/login"><button>Logowanie</button></Link><br />
      <Link to="/activate"><button>Aktywacja</button></Link><br />
         <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
           <Login setToken={setToken} />
          </Route>
          <Route path="/activate">
           <Activate />
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
      {/* <button onClick={handleSubmit}>LoggedInTest</button><br /> */}
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