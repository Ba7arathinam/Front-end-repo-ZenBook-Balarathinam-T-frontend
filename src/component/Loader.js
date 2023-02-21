import {React } from 'react'
import HashLoader from "react-spinners/HashLoader";
import { useState } from 'react';



function Loader() {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
    const override=`
        display: "block",
        margin: "0 auto",
        borderColor: "red",
      `
  return (
    <div style={{marginTop:'160px',marginLeft:'150px'}}>
         <div className="sweet-loading text-center ">
      

      <HashLoader
        color='#000'
        loading={loading}
        justifyContent='center'
        text-align='center'
        css=''
        size={90}
      />
    </div>
    </div>
   
  )
}

export default Loader