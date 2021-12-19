import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './login.css'


async function loginUser(credentials) {
  return fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then(data => data.json())
 }


export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
    if(token === -1){
        errorMessage();
    }
  }

  return(
    <div className="login-wrapper">
      <h1>Logowanie</h1>
      <form onSubmit={handleSubmit}>
        <label for="username">Login: </label><br />
          <input type="text" id="username" onChange={e => setUserName(e.target.value)}/><br />
          <label for="password">Hasło: </label><br />
          <input type="password" id="password" onChange={e => setPassword(e.target.value)}/>
        <div>
          <button type="submit">Zaloguj</button>
        </div>
      </form>
      <p id="loginError">&nbsp;</p>
    </div>
  )
  function errorMessage() {
      var element = document.getElementById("loginError");
      element.style.color = "red";
      element.innerHTML = "Nieprawidłowe dane";
  }
}
Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }