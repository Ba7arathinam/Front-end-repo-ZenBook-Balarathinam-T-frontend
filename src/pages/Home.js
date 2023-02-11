import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Rooms from '../component/Rooms'
import Loader from '../component/Loader'
import 'antd/dist/antd.css'
import Error from '../component/Error'
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;

const Home=()=> {
  
    const [room,setrooms]=useState([])
    const [loading,setloading]=useState()
    const [error,seterror]=useState()

  useEffect(()=>{
    const fetchData = async()=>{
    try {
        setloading(true)
        const {data:response}=await axios.get('/api/rooms/getallrooms')
        setrooms(response);
        setloading(false)
    } catch (error) {
        seterror(true)
        console.log(error)
        setloading(false)
    }
}
fetchData();
  },[])

  return (
    <div className='container'>

<div className='col-md-3'>
<RangePicker />


</div>


      <div className='row justify-content-center mt-5'>
      {loading ? (<Loader/>):room ? (room.map(rr=>{
             return (
                <div className='cl-md-9 mt-2'>
                    <Rooms room={rr}/>
                    
                </div>
             )
        })):(<h1><Error/></h1>)}
        
      </div>
    </div>
  )
}

export default Home