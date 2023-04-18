import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./start.css";
import { Link } from "react-router-dom";

const Start = () => {
    // const [email, setEmail]= useState('');
    // const [password, setPassword]= useState('');
    // const [name, setName] = useState('');

    let history = useNavigate();

    const [newUser, setNewUser] = useState ({
        name:"",
        email:'',
        password:''
    })

    const handleChange = (e) => {
        setNewUser({...newUser, [e.target.name]: e.target.value});
        //console.log(newUser);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submit works");

        const sendNewUser = {
            name:newUser.name,
            email:newUser.email,
            password:newUser.password
        }
        console.log(sendNewUser);

        
        axios.post("https://www.zoelindev.com/moneyCatBackend/insert.php" , JSON.stringify({ 
            "name": document.querySelector("#name").value,  
            "email": document.querySelector("#email").value,  
            "password": document.querySelector("#password").value,  
        })).then( (response) => { 
            if(response.data === 1) {
                alert('The Email has been registered!')
            }else { 
                const name = newUser.name;
                alert('Welcome '+ name + '!' )
                history(`/setting`);
                localStorage.setItem("email", newUser.email);
              const sessionEmail = localStorage.getItem("email");
              console.log(sessionEmail); 
                
            }
        }).catch( error => { 
            console.log(error); 
        })     
    
    }

    return(
        <div className="startPage">

            <div className="loginMid startMid">

            <h1 className="loginH1">Get Start</h1>
            <p className="tagline">Create your account now!</p>

            <form className="startForm" onSubmit={handleSubmit}>
            <div className="twoInput threeInput">
                <input
                type="text"
                id="name"
                className="name"
                name="name"
                aria-label="User" placeholder="Name" 
                required 
                value={newUser.name}
                onChange={handleChange}
                />

                <input 
                type="email" 
                id="email" 
                className="email" 
                name="email"
                aria-label="Email" placeholder="Email" 
                required 
                value={newUser.email}
                onChange={handleChange}
                />

                <input 
                type="text" 
                id="password" 
                className="password" 
                name="password"
                aria-label="Password" placeholder="Password" 
                required 
                value={newUser.password}
                onChange={handleChange}
                />
                </div>
                <input type="submit" value="Sign up"/>
            </form>

            <p className="last">Have an account? 
            <Link to="/">Login</Link>
            </p>

            </div>

            <div className="startB">
                <div className="round2"></div>
                    <img src="./image/lazyCat.png" alt="Lazy Cat" className="lazyCat" width="2000"
                height="2000"/>
            </div>

        </div>
    );
}

export default Start;