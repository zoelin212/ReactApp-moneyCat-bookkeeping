import { useEffect, useState } from "react";

const Loader = () =>{
    const [showElement,setShowElement] = useState(true)
    useEffect(()=>{
      setTimeout(function() {
        setShowElement(false)
           }, 3000);
         },
     [])
        
    return(
      <div>
         {showElement ?
            <div className='loader'>
                <img src="./image/logo.svg" alt="Money Cat logo" className="logo"/>
                <p>Money Cat</p> 
            </div> :
            <></>} 
      </div>
    )
  }

  export default Loader;