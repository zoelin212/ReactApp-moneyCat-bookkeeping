import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCalendarDays, faXmark} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./setting.css";


//print optinon
const Option =(val)=>{
    return (<option value={val} key={val.toString()}>{val}</option>)
}
//add 0 before numbers before 10
const OptionZero =(val)=>{
    return (<option value={val} key={val.toString()}>0{val}</option>)
}
//select 01-31 roop
const select=[];
for (let i = 1; i <=31; i++){
    if(i<10){
        select.push(OptionZero(i));
    }else {
        select.push(Option(i));
    }
}

const Setting = (props) => {

    let history = useNavigate();
    const [selectedDate, setSelectedDate] = useState('01');

    const handleDateChange = (event) => {
        const newDate = event.target.value;
        setSelectedDate(newDate);
        //props.onDateChange(newDate);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        //props.onSave(selectedDate);
        console.log("submit works");
        console.log(selectedDate);

        const sessionEmail = localStorage.getItem("email");
        console.log(sessionEmail);

        axios.post("https://www.zoelindev.com/moneyCatBackend/billing.php" , JSON.stringify({ 
            "billing": document.querySelector("select").value,
            email: sessionEmail,  
        })).then( (response) => { 
                console.log(response); 
                history(`/overview`);
        }).catch( error => { 
            console.log(error); 
        }) 
    };

    return(
        <div className="settingPage">
        <Link to="/overview"><FontAwesomeIcon icon={faXmark} /></Link>
        
        <div className="loginMid settingMid">
            <h1 className="loginH1">Your Billing Cycle</h1>
            <p className="tagline">Customized start date</p>

            {/* <FontAwesomeIcon icon={faCalendarDays} /> */}
            <img src="./image/icon _calendar_.png" alt="Calendar Icon" className="calendar" width="72" height="72"/>
            
            {/* <i class="fa-solid fa-calendar-days"></i> */}
            <form className="settingForm" onSubmit={handleFormSubmit}>
                <label>Monthly Billing Date
                    <select className="billingSelect" value={selectedDate} onChange={handleDateChange}>
                    {select}
                </select>
                </label>
                
                <input type="submit" value="Save"/>
            </form>
        </div>
        <img src="./image/billingCat.png" alt="Get Money Cat" className="billingCat" width="2000" height="2000"/>
        </div>
    );
}

export default Setting;