import React, { useState, useEffect, useContext } from 'react';
import './SigninSignup.css';
import Header from '../common/Header';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../User Components/Distribution/UserProvider'; 
// import 'boxicons/css/boxicons.min.css'; // Ensure you have this installed

const SignInSignUp = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const { loginUser } = useContext(UserContext); // Use UserContext
  

  useEffect(() => {
    setTimeout(() => {
      setIsSignIn(true);
    }, 200);
  }, []);

  const toggle = () => {
    setIsSignIn(!isSignIn);
  };

let [email , setEmail] = useState('')
let [password , setPassword] = useState('')

let navigate = useNavigate();

const Signin = async () => {
  try {
      let result = await fetch("http://localhost:4500/signin", {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: {
              'Content-Type': 'application/json'
          }
      });
      if (result.ok) {
          result = await result.json();
          if (result.role === 'admin') {
              loginUser(result);
              localStorage.setItem('admin', JSON.stringify(result));
              clearForm();
              navigate('/adminhome');
          } else if (result.role === 'user') {
              loginUser(result);
              localStorage.setItem('user', JSON.stringify(result));
              clearForm();
              navigate('/userhome');
          } else {
              alert("Enter Correct Details");
          }
      } else {
          console.error("Signin failed:", result.statusText);
      }
  } catch (error) {
      console.error("Failed to sign in:", error);
  }
};



let [username, setUsername] = useState('');
let [confirmPassword, setconfirmPassword] = useState('');

const clearForm = () => {
    setEmail('');
    setPassword('');
    setUsername('');
    setconfirmPassword('');
};

const Signup = async () => {
    if(password === confirmPassword)
        {
    try {
        let result = await fetch("http://localhost:4500/signup", {
            method: 'POST',
            body: JSON.stringify({ username, email, password, confirmPassword }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (result.ok) {
            result = await result.json();
            clearForm();
            alert("Sign UP Successfully")
            console.log(result);
        } else {
            console.error("Signup failed:", result.statusText);
        }
    } catch (error) {
        console.error("Failed to sign up:", error);
    }
}
else {
    alert("Please Match Your Password")
}
};

  return (
    <>
    <Header/>
    <div id="signinsignup-container" className={`signinsignup-container ${isSignIn ? 'signinsignup-sign-in' : 'signinsignup-sign-up'}`}>
      {/* FORM SECTION */}
      <div className="signinsignup-row">
        {/* SIGN UP */}
        <div className="signinsignup-col align-items-center flex-col signinsignup-sign-up">
          <div className="signinsignup-form-wrapper align-items-center">
            <div className="signinsignup-form signinsignup-sign-up">
              <div className="signinsignup-input-group">
              <i class="fa-solid fa-user"></i>
                <input type="text" placeholder="Username" 
                onChange={(e)=>setUsername(e.target.value)} value={username}/>
              </div>
              <div className="signinsignup-input-group">
              <i class="fa-solid fa-envelope"></i>
                <input type="email" placeholder="Email" 
                onChange={(e)=>setEmail(e.target.value)} value={email}/>
              </div>
              <div className="signinsignup-input-group">
              <i class="fa-solid fa-lock"></i>
                <input type="password" placeholder="Password" 
                onChange={(e)=>setPassword(e.target.value)} value={password}/>
              </div>
              <div className="signinsignup-input-group">
              <i class="fa-solid fa-lock"></i>
                <input type="password" placeholder="Confirm password" 
                onChange={(e)=>setconfirmPassword(e.target.value)} value={confirmPassword}/>
              </div>
              <button onClick={Signup}>
                Sign up
              </button>
              <p>
                <span>
                  Already have an account?
                </span>
                <b onClick={toggle} className="pointer">
                  Sign in here
                </b>
              </p>
            </div>
          </div>
        </div>
        {/* END SIGN UP */}
        {/* SIGN IN */}
        <div className="signinsignup-col align-items-center flex-col signinsignup-sign-in">
          <div className="signinsignup-form-wrapper align-items-center">
            <div className="signinsignup-form signinsignup-sign-in">
              <div className="signinsignup-input-group">
              <i class="fa-solid fa-user"></i>
                <input type="text" placeholder="Email" 
                onChange={(e)=>setEmail(e.target.value)} value={email}/>
              </div>
              <div className="signinsignup-input-group">
              <i className=" fa-solid fa-lock fa-lg"></i>
                <input type="password" placeholder="Password" 
                onChange={(e)=>setPassword(e.target.value)} value={password}/>
              </div>
              <button onClick={Signin}>
                Sign in
              </button>
              <p>
                <b>
                  Forgot password?
                </b>
              </p>
              <p>
                <span>
                  Don't have an account?
                </span>
                <b onClick={toggle} className="pointer">
                  Sign up here
                </b>
              </p>
            </div>
          </div>
        </div>
        {/* END SIGN IN */}
      </div>
      {/* END FORM SECTION */}
      {/* CONTENT SECTION */}
      <div className="signinsignup-row signinsignup-content-row">
        {/* SIGN IN CONTENT */}
        <div className="signinsignup-col align-items-center flex-col">
          <div className="signinsignup-text signinsignup-sign-in">
            <h2>
              Welcome
            </h2>
          </div>
          <div className="signinsignup-img signinsignup-sign-in">
          </div>
        </div>
        {/* END SIGN IN CONTENT */}
        {/* SIGN UP CONTENT */}
        <div className="signinsignup-col align-items-center flex-col">
          <div className="signinsignup-img signinsignup-sign-up">
          </div>
          <div className="signinsignup-text signinsignup-sign-up">
            <h2>
              Join with us
            </h2>
          </div>
        </div>
        {/* END SIGN UP CONTENT */}
      </div>
      {/* END CONTENT SECTION */}
    </div>
    </>
  );
};

export default SignInSignUp;
