import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Rooms from '../component/Rooms'
import Loader from '../component/Loader'
import Error from '../component/Error'
import moment from 'moment'
import { DatePicker } from 'antd';
import  { MyBookings } from '../pages/Profilescreen'
const { RangePicker } = DatePicker;

const Home=()=> {
  
    const [room,setrooms]=useState([])
    const [loading,setloading]=useState()
    const [error,seterror]=useState()
    const [fromdate,setfromdate]=useState()
    const [todate,settodate]=useState()
    const [duplicaterooms,setduplicaterooms]=useState([])
    const[searchkey,setsearchkey]=useState('')
    const[type,settype]=useState('all')

  useEffect(()=>{
    const fetchData = async()=>{
    try {
        setloading(true)
        const {data:response}=await axios.get('https://zinrooms-bookings.onrender.com/api/rooms/getallrooms')
        setrooms(response);
        setduplicaterooms(response)
        setloading(false)
    } catch (error) {
        seterror(true)
        console.log(error)
        setloading(false)
    }
}
fetchData();
  },[])

  function filterByDate(dates) {

      const from=moment(dates[0].$d).format('DD-MM-YYYY');
      const to=moment(dates[1].$d).format('DD-MM-YYYY');
      setfromdate(from);
      settodate(to);
      <MyBookings from={fromdate} to={todate}/>
      var temprooms=[]
      var availability=false

      for(const room of duplicaterooms){
        if(room.currentbookings.length >0){
          for(const booking of room.currentbookings){
            if(!moment(moment(dates[0].$d).format('DD-MM-YYYY')).isBetween(booking.fromdate,booking.todate)
            && !moment(moment(dates[1].$d).format('DD-MM-YYYY')).isBetween(booking.fromdate,booking.todate))
            {
              if(
                moment(dates[0].$d).format('DD-MM-YYYY') !==booking.fromdate &&
                moment(dates[0].$d).format('DD-MM-YYYY') !==booking.todate &&
                moment(dates[1].$d).format('DD-MM-YYYY') !==booking.fromdate &&
                moment(dates[1].$d).format('DD-MM-YYYY') !==booking.todate 
                ){
                  availability=true
                }
            }
          }
            }
          if(availability===true || room.currentbookings.length===0){
            temprooms.push(room);
          }
          setrooms(temprooms)
      }
    
  }

  function filterBySearch(){
    const temprooms=duplicaterooms.filter(room=>room.name.toLowerCase().includes(searchkey.toLowerCase()))
    setrooms(temprooms)
  }
 
  function filterByType(e){
    settype(e)
   if(e!=='All'){
    const  temprooms=duplicaterooms.filter(room=>room.type.toLowerCase()===e.toLowerCase());
    setrooms(temprooms);
   }else{
    setrooms(duplicaterooms)
   }
  }

  return (
   
    <div className='container'>
<div className='row mt-5 bs'>
<div className='col-md-3'>
<RangePicker format='DD-MM-YYYY' onChange={filterByDate} />


</div>
<div className='col-md-5'>
<input type="text" className='form-control' placeholder='Search Rooms' value={searchkey} onChange={(e)=>{setsearchkey(e.target.value)}} onKeyUp={filterBySearch}/>  
</div>

<div className='col-md-3'>
<select className='form control' value={type} onChange={(e)=>{filterByType(e.target.value)}}>
  <option value="All">All</option>
  <option value="Delux">Delux</option>
  <option value="Non-Delux">Non-Delux</option>
</select>
</div>
</div>



      <div className='row justify-content-center mt-5'>
      {loading ? (<Loader/>):(room.map(rr=>{
             return (
                <div className='cl-md-9 mt-2'>
                    <Rooms room={rr} fromdate={fromdate} todate={todate} />
                    
                </div>
             )
        }))}
        
      </div>
    </div>
  )
}

export default Home