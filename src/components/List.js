import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";

function List({ email, startDate, endDate, type}) {
    const [spendDetails, setSpendDetails] = useState([]);

    //location
    const location = useLocation();
    const path = location.pathname;
    //console.log(path);
  
    useEffect(() => {
        if(path === '/chart_spend'){
            axios.post('https://www.zoelindev.com/moneyCatBackend/list.php', { email, startDate, endDate, type }).then((response) => {
                setSpendDetails(response.data[type] || []);
              })
              .catch((error) => {
                console.error(error);
              });
        }else {
            axios.post('https://www.zoelindev.com/moneyCatBackend/listIncome.php', { email, startDate, endDate, type }).then((response) => {
                setSpendDetails(response.data[type] || []);
              })
              .catch((error) => {
                console.error(error);
              });
        }
    }, [email, startDate, endDate, type]);
    
    function formatDate(dateString) {
      const utcDate = new Date(dateString);
      const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60 * 1000);
      const month = new Intl.DateTimeFormat('en-CA', { month: 'short' }).format(localDate);
      const day = localDate.getDate();
      return `${month} ${day}`;
    }

  function removeSpendDetail(index) {
    const updatedSpendDetails = [...spendDetails];
    const id = updatedSpendDetails[index].id;
    updatedSpendDetails.splice(index, 1);
    setSpendDetails(updatedSpendDetails);

    if(path === '/chart_spend'){
        axios.post('https://www.zoelindev.com/moneyCatBackend/remove.php', { id })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }else {
        axios.post('https://www.zoelindev.com/moneyCatBackend/removeIncome.php', { id })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }
  }

  return (
    <div>
      {spendDetails.length > 0 ? (
        <div className='listBox'>
          {spendDetails.map(({ id, date, note, cost }, index) => (
            <div>
            <div key={`${id}-${date}-${note}-${cost}`} className="list">
              <span>{formatDate(date)}</span> 
              <span>{note}</span>
              <span>$ {cost}</span>
              <button className='remove' onClick={() => removeSpendDetail(index)}>Remove</button>
            </div>
            <hr/>
            </div>
          ))}
        </div>
      ) : (
        <p>No spend details found for {type}.</p>
      )}
    </div>
  );
}

export default List;
