import React, { useState ,useEffect } from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../component/Loader'
import Error from '../component/Error'
import { Divider, Space, Tag } from 'antd';
const {TabPane}=Tabs;
function Profilescreen() {
    
  
    const user =JSON.parse(localStorage.getItem('CurrentUser'))

    useEffect(()=>{
        if(!user){
            window.location.href='/login'
        }
    },[])
     
  return (
    <div className='ml-3 mt-3 os'>
        <Tabs defaultActiveKey='1'>
        <TabPane className='os' tab='Profile' key='1'>
        <h1>My Profile</h1>
         <br/>
         <h1>Name : {user.data.name}</h1>
         <h1>Email : {user.data.email}</h1>
         <h1>isAdmin : {user.isAdmin ?'Yes':'No'}</h1>
        </TabPane>
        <TabPane tab='Bookings' key='2'>
         <MyBookings/>
        </TabPane>
        </Tabs>
    </div>
  )
}

export default Profilescreen



export  function MyBookings({from,to}) {
    const user =JSON.parse(localStorage.getItem('CurrentUser'))
    const [loading,setloading]=useState(false)
  // const [error,seterror]=useState()
  //   const [bookings,setbookings]=useState([])
   
    // useEffect(async ()=>{
    //     try {
    //       setloading(true)
    //         const data =await  (axios.post('/api/bookings/getbookingsbyuserid',{userid: user._id})).data;
    //             console.log(data)
    //             setbookings(data)
    //             setloading(false)
    //     } catch (error) {
    //         console.log(error);
    //         setloading(false)
    //         seterror(error)
    //     }
    
    // },[])

    async function cancelBooking(bookingid,roomid){
      try {
        setloading(true)
        const result=(await axios.post('/api/bookings/cancelbooking',{bookingid,roomid})).data
        console.log(result)
        setloading(false)
        
      } catch (error) {
        console.log(error)
        setloading(false)
        
      }
    }
  return (
    <div>
        <div className='row'>
          <div className='col-md-6 os'>
            {loading && (<Loader/>)}
            {/* {bookings && (bookings.map(booking=>{
             return  <div className='bs'>
                <h1>{booking.room}</h1>
                <h1>BookingId : {booking._id}</h1>
                <h1>CheckIn : {booking.fromdate}</h1>
                <h1>Check Out :{booking.todate}</h1>
                <h1>Amount : {booking.totalamount}</h1>
                <h1>Status : {booking.status === 'booked'?'CONFIRMED' :'CANCELED'}</h1>
              </div>
            }))} */}

                  <div>
                <p>{user.data.name}</p>
                <p><b>BookingId :</b> {user.data._id}</p>
                <p><b>CheckIn : </b>{from}</p>
                <p><b>Check Out :</b>{to}</p>
                <p><b>Amount :</b>  {user.data.totalamount}</p>
                <p><b>Status :</b> {user.status === 200 ?( <Tag color="green">CONFIRMED</Tag>) :(<Tag color="volcano">CANCELLED</Tag>)}</p>
                <div className='text-right'>
                   <button className='btn btn-secondary' onClick={''}>Cancel Booking</button>
                </div>
              </div>
            
          </div>
          
        </div>
        
    </div>
  )
}
