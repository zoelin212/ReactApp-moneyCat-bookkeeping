import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useLocation } from "react-router-dom";

function Open(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [cost, setCost] = useState({});
  const sessionEmail = localStorage.getItem("email");

  //location
  const location = useLocation();
  const path = location.pathname;
  //console.log(path);

  function handleClick() {
    setIsOpen(!isOpen);
  }

    useEffect(() => {
        if (props.startDate && props.endDate) {
        const fetchData = async () => {
            try {
                if(path === '/chart_spend'){
                    const response = await axios.post('https://www.zoelindev.com/moneyCatBackend/typelist.php', {
                        email: sessionEmail,
                        startDate: props.startDate,
                        endDate: props.endDate
                    });
                    setCost(response.data);
                }else {
                    const response = await axios.post('https://www.zoelindev.com/moneyCatBackend/typelistIncome.php', {
                        email: sessionEmail,
                        startDate: props.startDate,
                        endDate: props.endDate
                    });
                    setCost(response.data);
                }
            
            } catch (error) {
            console.error(error);
            }
        };
        fetchData();
        }
    }, [sessionEmail, props.startDate, props.endDate]);

  const icon = isOpen ? faCaretUp : faCaretDown;
  const circle =  faCircle;
  const circleId = 'circle_'+ props.title;

  return (
    <div>
      <div onClick={handleClick}>
        <FontAwesomeIcon icon={icon} />
        <FontAwesomeIcon icon={circle} id={circleId}/>
        <span className='subtitle'>{props.title} ${props.cost}</span>
      </div>
      {isOpen && props.children}
    </div>
  );
}

export default Open;
