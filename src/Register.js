import React, { useState } from 'react';
import './login.css'

async function registerUser(credentials) {
    if(credentials.username === "k123" && credentials.password === "k123") return "FAILURE";
    else return "SUCCESS";
    // return fetch('http://localhost:8080/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(credentials)
    // })
    //   .then(data => data.json())
   }

export default function Register() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [passwordRepeat, setPasswordRepeat] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    if(password !== passwordRepeat){
        errorMessage("PASSWORDS_NOT_THE_SAME");
        return -1;
    }
    const response = await registerUser({
      username,
      password
    });
    if(response === "SUCCESS"){
        errorMessage("SUCCESS");
        setTimeout(function () {
            window.location.assign("/login")
        }, 5000);
    }
    // setToken(token);
    // if(token === -1){
    //     errorMessage();
    // }
  }

  return(
    <div className="login-wrapper">
      <h1>Rejestracja</h1>
      <form onSubmit={handleSubmit}>
          <label for="username">Login: </label><br />
          <input type="text" id="username" onChange={e => setUserName(e.target.value)}/><br />
          <label for="password">Hasło: </label><br />
          <input type="password" id="password" onChange={e => setPassword(e.target.value)}/><br />
          <label for="password">Powtórz hasło: </label><br />
          <input type="password" id="passwordRepeat" onChange={e => setPasswordRepeat(e.target.value)}/><br />
          <button type="submit">Zarejestruj</button>
      </form>
      <p id="registerMessage">&nbsp;</p>
    </div>
  )
  function errorMessage(code) {
      var element = document.getElementById("registerMessage");
      element.style.color = "red";
      switch(code){
          case "PASSWORDS_NOT_THE_SAME":
          element.innerHTML = "Hasła nie są takie same";
          break;
          case "SUCCESS":
          element.style.color = "green";
          element.innerHTML = "Pomyślnie założono konto\n";
          break;
          default:
          element.innerHTML = "Wystąpił błąd";
      }
  }
}
// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
//   }