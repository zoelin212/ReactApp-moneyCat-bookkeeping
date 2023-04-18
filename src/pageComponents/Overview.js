import { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from 'axios';
import { Link } from "react-router-dom";
import "./overview.css"

const Overview = () => {
  const [totalCost, setTotalCost] = useState('');
  const [totalEarn, setTotalEarn] = useState('');
  const [balance, setBalance] = useState('');
  const [billing,setBilling] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        // Retrieve email from local storage
        const sessionEmail = localStorage.getItem("email");
        console.log(sessionEmail);
        const response = await axios.post('https://www.zoelindev.com/moneyCatBackend/print.php', {
          email: sessionEmail,
        });
        console.log(response);

        if (response.status === 200) {
          setTotalCost(response.data.totalCost);
          setTotalEarn(response.data.totalEarn);
          setBalance(response.data.totalEarn - response.data.totalCost);
          setBilling(response.data.billing);
          console.log(response);

          
        } else {
          console.log('Error: Status code ' + response.status);
        }
      } catch (error) {
        console.log('Error: ' + error.message);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (billing) {
      const now = new Date();
      const StartDate = new Date(now.getFullYear(), now.getMonth()- 1, billing);
      const EndDate = new Date(now.getFullYear(), now.getMonth(), billing - 1);
      const formatStartDate = StartDate.toISOString().slice(0, 10);
      const formatEndDate = EndDate.toISOString().slice(0, 10);

      localStorage.setItem("startDate", formatStartDate);
      const sessionStartDate = localStorage.getItem("startDate");

      localStorage.setItem("endDate", formatEndDate);
      const sessionEndDate = localStorage.getItem("endDate");

      console.log(sessionStartDate);
      console.log(sessionEndDate);

    }
  }, [billing]);

  return (
    <div className="overviewPage">
      <Header/>
      <div className="contain">

        <div className="imgBox">
          <img src="./image/sleeping.jpg" alt="A gril is sleeping with a fat cat" className="sleeping" width="1920" height="2559"/>
        </div>

        <div className="flex_direction_grid">
          <p className="redBtn">Balance: <span className="total">${balance}</span></p>
          <div className="flex">
            <p className="greenBtn">Spend: <span className="total">${totalCost}</span></p>
            <p className="greenBtn">Income: <span className="total">${totalEarn}</span></p>
          </div>
        </div>
      </div>
      <footer>
        <Link to="/chart_spend">
        <img src="./image/tray.svg" alt="Icon for monthly chart" className="tray"/></Link>

        <Link to="/overview">
        <img src="./image/overCat.svg" alt="Icon for overview page" className="overCat"/></Link>

        <Link to="/input_spend">
        <img src="./image/calculater.svg" alt="Icon for bookkeeping calculater" className="calculater"/></Link>
      </footer>
    </div>
  );
}

export default Overview;
