import React, { useState } from "react";
import {
  BrowserRouter as Router,
  // Switch,
  // Route,
  Link,
  // BrowserRouter,
  Redirect
} from "react-router-dom";

const SignUp = (props) => {
  const [localError, setLocalError] = useState([])
  

  const submitHandler = (e) => {
    e.preventDefault();
    
    if (e.target[1].value === e.target[2].value && e.target[0].value !== '' && e.target[3].value !== '') {
      let name = e.target[0].value;
      let password = e.target[1].value;
      let email = e.target[3].value;
      let profilePicture = e.target[4].value

      let newUser = {
        username: name,
        password: password,
        email: email,
        profilePicture: profilePicture
      };
      props.signUpHandler(newUser);
    } 
    // if(e.target[1].value !== e.target[2].value){
    //   setLocalError(localError.push('Pass'))
    // } 
    // if(e.target[0].value === ''){
    //   setLocalError(localError.push('Username'))
    // }
    // if(e.target[3].value === ''){
    //   setLocalError(localError.push('Email'))
    // }
    
  };

  console.log(localError)
  return (
    <div className='login-dark'>
      <h4>Welcome</h4>
      
      <form onSubmit={(e) => submitHandler(e)} id='sign-up'>
        <div className='illustration'>
        <svg className="icon ion-ios-locked-outline" xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" class="bi bi-person-check" viewBox="0 0 16 16">
          <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
          <path fill-rule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
      </svg>
      </div>
      {(props.errors.length !== 0) ? props.errors.map(msg => <p>{msg}</p>): null}
      {(localError.includes('Username')) ? <p>Must inclue a Username</p> : null}
      <div className='mb-3'>
      <input type="text" className="form-control" name="username" placeholder="Username" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"/>
      </div>
      {(localError.includes('Pass')) ? <p>Passwords do not match</p> : null}
      <div className='mb-3'>
        <input type="password" className="form-control" name="password" placeholder="Password" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"/>
      </div>
      <div className='mb-3'>
        <input type="password" className="form-control" name="password-confirm" placeholder="Confirm Password" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"/>
      </div>
      {(localError.includes('Email')) ? <p>Must include an Email</p> : null}
      <div className='mb-3'>
        <input type="text" className="form-control" name="email" placeholder="Email" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"/>
      </div>
      <div className='mb-3'>
        <input type="text" className="form-control" name="profile-picture" placeholder="Profile Picture URL" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"/>
        </div>
        <div className='mb-3'>
        <button type="submit" className='btn btn-primary d-block w-100'>
          Create Account
        </button>
        </div>
      </form>
      { props.redirect === true ? <Redirect to='/Home'/> : null} 
    </div>
  );
};

export default SignUp;
