import React, { useState, useEffect } from 'react';
import axios from 'axios';


function DateRangeForm(props) {
  const [billingDate, setBillingDate] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [options, setOptions] = useState([{ startDate: "", label: "Choose date" }]);
  const [startDate, setStartDate] = useState(localStorage.getItem("startDate"));
  const [endDate, setEndDate] = useState(localStorage.getItem("endDate"));

  useEffect(() => {
    const fetchBillingDate = async () => {
      const sessionEmail = localStorage.getItem("email");
      const response = await axios.post('https://www.zoelindev.com/moneyCatBackend/dateRangeForm.php', { email: sessionEmail });
      const data = response.data;
      setBillingDate(data.billing);
    };

    fetchBillingDate();
  }, []);

  useEffect(() => {
    if (billingDate) {
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const options = [];

      for (let i = 0; i < 13; i++) {
        const now = new Date();
        const monthStartDate = new Date(now.getFullYear(), now.getMonth() + i - 1, billingDate);
        const monthEndDate = new Date(now.getFullYear(), now.getMonth() + i + 0, billingDate - 1);
        const optionLabel = `${monthNames[monthStartDate.getMonth()]} ${billingDate} ~ ${monthNames[monthEndDate.getMonth()]} ${monthEndDate.getDate()}`;
        const optionStartDate = monthStartDate.toISOString().slice(0, 10);
        const optionEndDate = monthEndDate.toISOString().slice(0, 10);
        options.push({
          startDate: optionStartDate,
          endDate: optionEndDate,
          label: optionLabel
        });
      }

      setSelectedDateRange(options.find(option => option.startDate === startDate) || options[0]);
      setOptions(options);
    }
  }, [billingDate]);

  const handleDateRangeChange = (event) => {
    const selectedOption = options.find(option => option.startDate === event.target.value);
    setSelectedDateRange(selectedOption);
    setStartDate(selectedOption.startDate);
    setEndDate(selectedOption.endDate);
    localStorage.setItem("startDate", selectedOption.startDate);
    localStorage.setItem("endDate", selectedOption.endDate);
  
    // Call the handleDateRangeChange function passed from the parent component
    props.onDateRangeChange(selectedOption);
  };
  

  const now = new Date();
  const yearNow = now.getFullYear();

  return (
    <form>
      <label className='dateForm'>
        <img src="./image/blue_icon _calendar_.png" alt="Calendar Icon" className="calendar dateIcon" width="72" height="72"/>
        <span>{yearNow} /</span>
        <select value={selectedDateRange ? selectedDateRange.startDate : ''} onChange={handleDateRangeChange} required>
          {options.map(option => (
            <option key={option.startDate} value={option.startDate}>{option.label}</option>
          ))}
        </select>
      </label>
    </form>
  );
}


export default DateRangeForm;
