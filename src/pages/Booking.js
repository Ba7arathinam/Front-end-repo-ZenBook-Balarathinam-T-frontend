import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Loader from '../component/Loader'
import Error from '../component/Error'
import moment from 'moment'
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2'

const Booking=()=> {

    const [room,setroom]=useState('')
    const [loading,setloading]=useState()
    const [error,seterror]=useState()
    const {roomid,fromdate,todate}=useParams();

    const from=moment(fromdate,'DD-MM-YYYY')
    const to=moment(todate,'DD-MM-YYYY')
    const totaldays=moment.duration(to.diff(from)).asDays()+1
    const [totalamount,settotalamount]=useState()
    


  useEffect(()=>{
if(!localStorage.getItem('CurrentUser')){
  window.location.reload='/login'
}

    const fetchData = async()=>{
    try {
        setloading(true)
        const data=(await axios.post('/api/rooms/getroombyid',{roomid:roomid})).data;
        settotalamount(data.rentperday*totaldays)
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

async function onToken(token){
  console.log(token);
  const bookingDetails={
    room,
    userid:JSON.parse(localStorage.getItem('CurrentUser')).data._id,
    fromdate,
    todate,
    totalamount,
    totaldays,
    token
   }
   try{
    setloading(true)
    Swal.fire("Congratulations","Your Room Booked Successfully",'success').then(result=>{
      window.location.href='/profile'
    })
    const result =await (await axios.post('/api/bookings/bookroom',bookingDetails)).data
    localStorage.setItem('BookedUser',JSON.stringify(result))
    
    setloading(false)
   }catch(error){
                  setloading(false)
                  Swal.fire('Sorry:(','Somthing Went Wrong','error')
   }
 
}
  return (
    <div className='m-5' >

  
        {loading ? (<Loader/>):error ? (<Error/>): (<div>
        
        <div className='row justify-content-center mt-5 os'>
            <div className='col-md-5'>
                <h1>{room.name}</h1>
                {/* <img src={room.imageurls[0]}classNames='bigimg' alt="Room img"/> */}
                
            </div>
            <div className='col-md-5 '>
               <div style={{textAlign:"right"}}>
              <b><h1>Booking Details</h1></b> 
                <hr/>
                 <b>
                 <p>Name:{room.name} </p>
                <p>From Date: {fromdate} </p>
                <p>To Date: {todate} </p>
                <p>Max Count:{room.maxcount} </p>
                 </b>
               </div>

               <div style={{textAlign:"right"}}>
                <b>
                <h1>Amount </h1>
                <hr/>
                <p>Total days:{totaldays}</p>
                <p>Rent per day:{room.rentperday} </p>
                <p>Total Amount:{totalamount} </p>
                </b>
               </div>
                <div style={{float:'right'}}>
                    <StripeCheckout
                    amount={totalamount*100}
                   token={onToken}
                   currency='INR'
                    stripeKey="pk_test_51Mbj8eSAej2N1WqjPizY1MZcgpupuDILJq5j2niVQcDp3yYdGLYpIt0eAYiA2muxK1IJwsdJlppSvoP2cquTiiWg00bAwhRsOi"
                    >
                      
                      <button className='btn btn-secondary'>Pay Now{" "}</button>
                      </StripeCheckout>         
                    
                </div>
                </div>
        </div>

      </div>)}
    
  
     </div>  
  )
}

export default  Booking;


