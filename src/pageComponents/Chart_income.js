import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useState, useEffect } from 'react';
import Open from '../components/Open';
import DateRangeForm from "../components/DateRangeForm";
import axios from "axios";
import List from "../components/List";
import Donut from "../components/Donut";



const ChartSpend = (props) => {
    const sessionEmail = localStorage.getItem("email");
    const [cost, setCost] = useState({});
    const [startDate, setStartDate] = useState(localStorage.getItem("startDate"));
    const [endDate, setEndDate] = useState(localStorage.getItem("endDate"));

    console.log(localStorage.getItem("startDate"));

    const notThisPageStyle = {
        color: 'var(--pink)',
      }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.post('https://www.zoelindev.com/moneyCatBackend/typelistIncome.php', {
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
                <Link to="/chart_spend" className="chartSpendBtn"
                style={notThisPageStyle}>
                    Spend /
                </Link>
                <Link to="/chart_income" className="chartIncomeBtn">
                    Income
                </Link>
            </div>

            <div className="top" onClick={handleDateRangeChange}>
            {cost && (cost.salay || cost.bonus || cost.sideline || cost.investment || cost.allowance || cost.stock || cost.tips || cost.othersIn) ? <Donut cost={cost} /> : <img src="./image/chartCat.png" alt="Chart" className="chartCat"/>}
            
            <DateRangeForm email={sessionEmail} onDateRangeChange={handleDateRangeChange} />
            </div>

            <div className="spendDetail">
                <Open title="Salay" cost={cost['salay']} startDate={startDate} endDate={endDate}>
                    <List email={sessionEmail} startDate={startDate} endDate={endDate} type="salay" />
                </Open>
                <Open title="Bonus" cost={cost['bonus']} startDate={startDate} endDate={endDate}>
                    <List email={sessionEmail} startDate={startDate} endDate={endDate} type="bonus" />
                </Open>
                <Open title="Sideline" cost={cost['sideline']} startDate={startDate} endDate={endDate}>
                    <List email={sessionEmail} startDate={startDate} endDate={endDate} type="sideline" />
                </Open>
                <Open title="Investment" cost={cost['investment']} startDate={startDate} endDate={endDate}>
                    <List email={sessionEmail} startDate={startDate} endDate={endDate} type="investment" />
                </Open>
                <Open title="Allowance" cost={cost['allowance']} startDate={startDate} endDate={endDate}>
                    <List email={sessionEmail} startDate={startDate} endDate={endDate} type="allowance" />
                </Open>

                <Open title="Stock" cost={cost['stock']} startDate={startDate} endDate={endDate}>
                    <List email={sessionEmail} startDate={startDate} endDate={endDate} type="stock" />
                </Open>
                <Open title="Tips" cost={cost['tips']} startDate={startDate} endDate={endDate}>
                    <List email={sessionEmail} startDate={startDate} endDate={endDate} type="tips" />
                </Open>
                
                <Open title="Others" cost={cost['othersIn']} startDate={startDate} endDate={endDate}>
                    <List email={sessionEmail} startDate={startDate} endDate={endDate} type="othersIn" />
                </Open>
            </div>
        </div>
    );
}

export default ChartSpend;
