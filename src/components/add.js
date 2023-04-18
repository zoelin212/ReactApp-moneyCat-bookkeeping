import { useState } from "react";
import { useLocation } from "react-router-dom";
import Meow from "../pageComponents/Meow";
import Don from "../pageComponents/Don";
// import { fas } from "@fortawesome/free-solid-svg-icons";


const Add = (props) => {

    const { handleSubmit } = props;

    const [note, setNote] = useState('');
    const [amount, setAmount] = useState('');
    const [dot,setDot] = useState(false);
    const [meowSent, setMeow] = useState(false);
    const [donSent, setDon] = useState(false);

    //set the default date on input format yyyy-mm-dd
    const now = new Date();
    const day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
    const month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : (now.getMonth() + 1);
    const year = now.getFullYear();
    const today = `${year}-${month}-${day}`;
    const [date, setDate] = useState(today);
  

    
    const updateAmount = value => {
        //console.log(typeof value)
        //Prevent repeated dot(.)
        if ((amount === "." || value[value.length - 1].indexOf(".") > -1)) {
            setAmount(amount + value);
            setDot(true);
        }else if (amount=== "0") {
            //console.log("elsif",value);
            setAmount(value);
        }else{
            setAmount(amount + value);
        }
        
         //setAmount(amount + value);
    }

    const createDigits = () => {
        const digits = [];
        for (let i = 1; i < 10; i++) {
            digits.push(
                <button
                    key={i}
                    onClick={() => updateAmount(i.toString())}>{i}
                </button>
            )
        }
        return digits;
    }

    const ac = () => {
        if (amount === "") {
            return;
        }
        setAmount('');
        setDot(false);
    }

    //location
    const location = useLocation();
    const path = location.pathname;
    //console.log(path);

    const anima = () => {
        if (path === '/input_spend'){
            setMeow(true);
            setTimeout(() => {
                setMeow(false);
                ac();
              }, 1500);
        }else{
            setDon(true);
            setTimeout(() => {
                setDon(false);
                ac();
              }, 1500);
        }

    }


    return (
        <div className="addWrap">

            {/* hide and show Meow */}
            
            {meowSent ? <Meow/>:""}
            {donSent ? <Don/>:""}
            

            <div className="row1">
                <input
                    type="date"
                    id="date"
                    className="date"
                    name="date"
                    aria-label="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <input
                    type="text"
                    id="note"
                    className="note"
                    name="note"
                    aria-label="note" placeholder="Click to write a note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
            </div>
            <div className="row2">
                <span className="display">
                    <span>$ </span>
                    <span id="amount" value={amount}>{amount || '0'}</span>
                </span>

                <button onClick={() => updateAmount('0')}>0</button>

                <button onClick={() => ac()}>AC</button>
            </div>

            <div className="row3">

                <div className="digits">
                    {createDigits()}
                </div>

                <div className="rowRight">
                    <button className="dot" onClick={() => updateAmount('.')} disabled={dot}>.</button>
                    <button className="add" type="submit" 
                    onClick={() => {
                        handleSubmit(note, date, amount);
                        anima();
                    }
                    }>
                    ADD</button>
                    
                </div>
            </div> 
        </div>
    );

}
export default Add;
