import { Link } from "react-router-dom";
import Header from "../components/Header";
import Add from "../components/add";
import React from 'react';
import { useState } from "react";
import axios from "axios";
import "./input_spend.css"

const incomeType = [
"salay",
"bonus",
"sideline",
"investment",
"allowance",
"stock",
"tips",
"othersIn"]

const InputIncome = () => {
    const [type, setType]= useState('');
    const sessionEmail = localStorage.getItem("email");

    const spendBtnStyle = {
      background: '#ffffff',
      border: '4px solid #8A8B73',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      borderRadius: '8px',
      width: '20vw',
      color: 'var(--green)',
      textAlign: 'center',
      display: 'block',
      paddingLeft: 'unset'
    }
  
    const incomeBtnStyle = {
      background: 'var(--green)',
      border: '4px solid #ffffff',
      boxShadow: '0px 4px 4px rgb(0 0 0 / 25%)',
      borderRadius: '8px',
      width:' 20vw',
      color: '#ffffff',
      textAlign: 'center',
      display: 'block',
      paddingLeft: 'unset'
    }

    const beforeStyle =  {
       
        
      };

    const selectStyle = {
      borderRadius: "50px",
      border: "5px solid rgb(204,123,105)",

    }

    const handleClick = (type) => {
        setType(type);
    }

    const handleSubmit = (note, date, amount) => {
        console.log("income", type, date, note, "$" + amount);
    
        axios
          .post("https://www.zoelindev.com/moneyCatBackend/income.php", {
            email: sessionEmail,
            type,
            date,
            note,
            amount,
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      };
    

    return(
        <div className="inputSpendPage">
             <Header/>
             <div className="choice">
             <Link to="/input_spend" className="spend" style={spendBtnStyle}>
                Spend
              </Link>
              <Link to="/input_income" className="income" style={incomeBtnStyle}>
                Income
              </Link>
            </div>
            <div className="inputBox_grid">
                {incomeType.map((value, index) => (
                <button 
                style={type === value ? selectStyle : beforeStyle} 
                id={value} 
                onClick={()=>handleClick(value)} 
                key={index}>
                    <img 
                    src={'./image/Icons/'+ value +'.svg'}
                    alt={'This is '+ value +' option.'} 
                    />
                </button>
                ))}     
            </div>
            <Add handleSubmit={handleSubmit}/>
        </div>
    );
}

export default InputIncome;