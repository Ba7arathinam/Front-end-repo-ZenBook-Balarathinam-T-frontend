import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Loader from '../component/Loader'
import Error from '../component/Error'



const Booking=()=> {

    const [room,setroom]=useState()
    const [loading,setloading]=useState()
    const [error,seterror]=useState()
    const {id}=useParams();


  useEffect(()=>{
    const fetchData = async()=>{
    try {
        setloading(true)
        const data=(await axios.post('/api/rooms/getroombyid',{roomid:id})).data;
        setroom(data);
        setloading(false)
        console.log(data);
    } catch (error) {
       
        setloading(false)
        seterror(true)
    }
}
fetchData();
  },[]);

  return (
    <div  >
      <h1>Hello</h1>
      <h1> Roomid={id}</h1>
  
       {/* {loading ? (<Loader/>):error ? (<Error/>): (<div>
        
        <div className='row justify-content-center mt-5 bs'>
            <div className='col-md-5'>
                <h1>{room.name}</h1>
                <img src={room.imagurls[0]}className='bigimg' alt="Room img"/>
            </div>
            <div className='col-md-5'>
               <div style={{textAlign:"right"}}>
               <h1>Booking Details</h1>
                <hr/>
                 <b>
                 <p>Name: </p>
                <p>From Date: </p>
                <p>To Date: </p>
                <p>Mac Count: {room.maxcount}</p>
                 </b>
               </div>

               <div style={{textAlign:"right"}}>
                <b>
                <h1>Amount</h1>
                <hr/>
                <p>Total days: </p>
                <p>Rent per day:{room.rentperday} </p>
                <p>Total Amount: </p>
                </b>
               </div>
                <div style={{float:'right'}}>
                    <button className='btn btn-secondary'>Pay Now</button>
                </div>
                </div>
        </div>

      </div>)}*/}
    
  
     </div>  
  )
}

export default  Booking;




// import React from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { useState, useEffect } from "react";

// function Booking () {
//   const [loading, setloading] = useState()
//   const [error, seterror] = useState()
//   const [room, setroom] = useState()

//   let { id } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setloading(true)
//         const data = (await axios.post('/api/rooms/getroombyid',  {roomid : id})).data

//         setroom(data)
//         setloading(false)
//         console.log(data);
//       } catch (error) {
//         seterror(true)
//         console.log(error);
//         setloading(false)
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Booking screen</h1>
//       <h1>Room id = {id}</h1> 
//     </div>
//   );
// }

// export default Booking;