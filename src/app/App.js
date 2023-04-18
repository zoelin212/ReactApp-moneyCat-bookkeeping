import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Login from '../pageComponents/Login';
import Start from '../pageComponents/Start';
import Setting from '../pageComponents/Setting';
import Overview from '../pageComponents/Overview';
import InputSpend from '../pageComponents/Input_spend';
import InputIncome from '../pageComponents/Input_income';
import ChartSpend from '../pageComponents/Chart_spend';
import ChartIncome from '../pageComponents/Chart_income';

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/start" element={<Start />}/>
            <Route path="/setting" element={<Setting />}/>
            <Route path="/overview" element={<Overview />}/>
            <Route path="/input_spend" element={<InputSpend />}/>
            <Route path="/input_income" element={<InputIncome />}/>
            <Route path="/chart_spend" element={<ChartSpend />}/>
            <Route path="/chart_income" element={<ChartIncome />}/>
        </Routes>
    </div>
  );
}

export default App;
