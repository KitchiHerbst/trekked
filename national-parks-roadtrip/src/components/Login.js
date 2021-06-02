import React, {useState} from "react";
// import SignUp from "./SignUp.js";

import {
  BrowserRouter as 
  Router,
  // Switch,
  // Route,
  Link,
  // BrowserRouter,
  Redirect,
} from "react-router-dom";

const Login = (props) => {

  

    const submitHandler = (e) => {
        e.preventDefault()
        let userPKG = {
          username: e.target[0].value,
          password: e.target[1].value
        }
        props.loginHandler(userPKG)
        
    }

    console.log(props)
  return (
    <section className="login-dark">
      <form id="login" onSubmit={(e) => submitHandler(e)}>
        <div className="illustration">
          <svg className="icon ion-ios-locked-outline" xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" class="bi bi-person-check" viewBox="0 0 16 16">
            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
            <path fill-rule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
          </svg>
        </div>
        {(props.errors.length !== 0) ? props.errors.map(msg => <p>{msg}</p>): null}
        <div className="mb-3">
            {/* <span className="input-group-text" id="inputGroup-sizing-lg">Username</span> */}
            <input type="text" className="form-control" name="username" placeholder="Username" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"/>
        </div>
        <div className="mb-3">
            {/* <span className="input-group-text" id="inputGroup-sizing-lg">Password</span> */}
            <input type="password" className="form-control" name="password" placeholder="Password" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"/>
        </div>
        <p>Don't have an account? <Link to='/Signup'>Sign-up</Link></p>
        <button className='btn btn-primary d-block w-100' type='submit'>Login</button>
      </form>
      {props.redirect === true ? <Redirect to='/Home'/> : null} 
    </section>
  );
};

export default Login;
