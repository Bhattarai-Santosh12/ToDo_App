import React, { useEffect, useState } from "react";
const DateTime = ()=>{
    const [dateTime, setDateTime] = useState("");


    useEffect(() => {
        const interval = setInterval(() => {
          const nowDate = new Date();
          const todayDate = nowDate.toLocaleDateString();
          const todayTime = nowDate.toLocaleTimeString();
          setDateTime(`${todayDate} - ${todayTime}`);
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);
    return(
        <h2 className="flex justify-center text-center text-xl font-bold mb-10">
        {dateTime}
      </h2>
    )
}

export default DateTime;