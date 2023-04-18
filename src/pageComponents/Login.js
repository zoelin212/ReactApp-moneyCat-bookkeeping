import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loading";
import axios from "axios";
import "./login.css";

const Login =()=>{
    // const [email, setEmail]= useState('');
    // const [password, setPassword]= useState('');
    
    let history = useNavigate();

    const [logInUser, setLogInUser] = useState ({
      email:'',
      password:''
    })

    const handleChange = (e) => {
      setLogInUser({...logInUser, [e.target.name]: e.target.value});
      //console.log(logInUser);
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("submit works");

      const sendLogInUser = {
          email:logInUser.email,
          password:logInUser.password
      }
      console.log(sendLogInUser);

      axios.post("https://www.zoelindev.com/moneyCatBackend/login.php" , JSON.stringify({ 
            "email": document.querySelector("#email").value,  
            "password": document.querySelector("#password").value,  
        })).then( (response) => { 
            if(response.data === 1) {
              // Store email in local storage
              localStorage.setItem("email", logInUser.email);
              const sessionEmail = localStorage.getItem("email");
              console.log(sessionEmail); 
              alert('Welcome back!');
              history(`/overview`);
            }else {
              console.log(response.data); 
              alert('Invalid email or password.');
            }
        }).catch( error => { 
            console.log(error); 
        })
    }


    return (
        <div className="loginPage">
            <Loader />

            <div className="loginTop">
            <div className="round"></div>
            <img src="./image/loginCat.png" alt="Japanese torii cat" className="loginCat" width="1200"
            height="1200"/>
            </div>

        <div className="loginMid">
          <h1 className="loginH1">Login</h1>
          <p className="tagline">Welcome Back!</p>

          <form className="emailForm" onSubmit={handleSubmit}>
            <div className="twoInput">
              <input 
              type="email" 
              id="email" 
              className="email" 
              name="email"
              aria-label="Email" placeholder="Email" 
              required 
              value={logInUser.email}
              onChange={handleChange}
              />

              <input 
              type="text" 
              id="password" 
              className="password" 
              name="password"
              aria-label="Password" placeholder="Password" 
              required 
              value={logInUser.password}
              onChange={handleChange}
              />
            </div>
              <input type="submit" value="Login"/>
          </form>

          <p className="last">Don’t have an account? 
              <Link to="/start">Sign up</Link>
          </p>
        </div>
      </div>
    );
  }

  export default Login;