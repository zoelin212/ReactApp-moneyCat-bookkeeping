import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useState, useEffect } from 'react';
import Open from '../components/Open';
import DateRangeForm from "../components/DateRangeForm";
import axios from "axios";
import List from "../components/List";
import Donut from "../components/Donut";
import "./chart.css"


const ChartSpend = (props) => {
    const sessionEmail = localStorage.getItem("email");
    const [cost, setCost] = useState({});
    const [startDate, setStartDate] = useState(localStorage.getItem("startDate"));
    const [endDate, setEndDate] = useState(localStorage.getItem("endDate"));

    const notThisPageStyle = {
        color: 'var(--pink)',
      }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.post('https://www.zoelindev.com/moneyCatBackend/typelist.php', {
              email: sessionEmail,
              startDate: startDate,
              endDate: endDate
            });
            setCost(response.data);
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
      }, [sessionEmail, startDate, endDate]);

 
    const handleDateRangeChange = (selectedOption) => {
        setStartDate(selectedOption.startDate);
        setEndDate(selectedOption.endDate);
      };
      
      
    return (
        <div className="chartWrap">
            <Header />
            <div className="round3"></div>
            <h2>Monthly</h2>

            <div className="op">
                <Link to="/chart_spend" className="chartSpendBtn">
                    Spend /
                </Link>
                <Link to="/chart_income" className="chartIncomeBtn"
                style={notThisPageStyle}>
                    Income
                </Link>
            </div>

            <div className="top" onClick={handleDateRangeChange}>
            {cost && (cost.food || cost.home || cost.fun || cost.travel || cost.health || cost.learn || cost.shop || cost.lend || cost.others) ? <Donut cost={cost} /> : <img src="./image/chartCat.png" alt="Chart" className="chartCat"/>}

            <DateRangeForm email={sessionEmail} onDateRangeChange={handleDateRangeChange} />

            </div>

            <div className="spendDetail">
                <Open title="Food" cost={cost['food']} startDate={startDate} endDate={endDate}>
                    <List email={sessionEmail} startDate={startDate} endDate={endDate} type="food" />
                </Open>
                <Open title="Home" cost={cost['home']} startDate={startDate} endDate={endDate}>
                    <List email={sessionEmail} startDate={startDate} endDate={endDate} type="home" />
                </Open>
                <Open title="Fun" cost={cost['fun']} startDate={startDate} endDate={endDate}>
                    <List email={sessionEmail} startDate={startDate} endDate={endDate} type="fun" />
                </Open>
                <Open title="Travel" cost={cost['travel']} startDate={startDate} endDate={endDate}>
                    <List email={sessionEmail} startDate={startDate} endDate={endDate} type="travel" />
                </Open>
                <Open title="Health" cost={cost['health']} startDate={startDate} endDate={endDate}>
                    <List email={sessionEmail} startDate={startDate} endDate={endDate} type="health" />
                </Open>

                <Open title="Learn" cost={cost['learn']} startDate={startDate} endDate={endDate}>
                    <List email={sessionEmail} startDate={startDate} endDate={endDate} type="learn" />
                </Open>
                <Open title="Shop" cost={cost['shop']} startDate={startDate} endDate={endDate}>
                    <List email={sessionEmail} startDate={startDate} endDate={endDate} type="shop" />
                </Open>
                <Open title="Lend" cost={cost['lend']} startDate={startDate} endDate={endDate}>
                    <List email={sessionEmail} startDate={startDate} endDate={endDate} type="lend" />
                </Open>
                <Open title="Others" cost={cost['others']} startDate={startDate} endDate={endDate}>
                    <List email={sessionEmail} startDate={startDate} endDate={endDate} type="others" />
                </Open>
            </div>
        </div>
    );
}

export default ChartSpend;
