import React ,{useState,useEffect}from 'react'
import axios from 'axios';
import { Tabs } from 'antd';
import Loader from '../component/Loader';
import Error from '../component/Error';
import Swal from 'sweetalert2';
const {TabPane}=Tabs;

function Admin() {
  return (
   <div className='mt-3 ml-3 os mr-3'>
  <h2 className='text-center' style={{fontSize:'30px'}}>
    <b>Admin Panel</b></h2>
  <Tabs defaultActiveKey='1'>
        <TabPane tab='bookings' key='1'>
            <Bookings/>
        </TabPane>
        <TabPane tab='Rooms' key='2'>
            whoooooo!
        </TabPane>
        <TabPane tab='Add Room' key='3'>
            <Addroom/>
        </TabPane>
        <TabPane tab='Users List' key='4'>
            whoooooooooooooooooooooooooooooooooooooooooooooooooo!
        </TabPane>
    </Tabs>
   </div>
  )
}

export default Admin


export function Bookings(){
const [booking,setbooking]=useState([])
const[loading,setloading]=useState(true)
const[error,seterror]=useState()

    // useEffect(async()=>{
    //     try {
    //         // const data=await (await axios.get("/api/bookings/getallbookings")).data
    //         setbooking(data)
    //         setloading(false)
    //     } catch (error) {
    //         console.log(error)
    //         seterror(error)
    //     }
    // })
return(
    <div className='row'>
        <div className='col-md-10'>
   
            <h1>Bookings</h1>
            {!loading && (<Loader/>)}
            {Bookings.length && (<h1>there are total  bookings</h1>)}
        </div>
    </div>
)

}

//add room component


export function Addroom() {

    const[name,setname]=useState('')
    const[rentperday,setrentperday]=useState()
    const[maxcount,setmaxcount]=useState()
    const[description,setdescription]=useState()
    const[phonenumber,setphonenumber]=useState()
    const [type,settype]=useState()
    const[imageurls1,setimageurls1]=useState()
    const[imageurls2,setimageurls2]=useState()
    const[imageurls3,setimageurls3]=useState()
    const[loading,setloading]=useState(false)
   const[error,seterror]=useState()

    async function addRoom(){

        const newroom={
            name,
            rentperday,
            description,
            maxcount,
            phonenumber,
            type,
           imageurls:[ imageurls1,
            imageurls2,
            imageurls3]
        }
        try {
            setloading(true)
            const result=(await axios.post('/api/rooms/addroom',newroom)).data
            console.log(result)
            setloading(false)
            Swal.fire('Congrats',"Your new room has been added",'success').then(result=>{
              window.location.href="/home"
            })
        } catch (error) {
            console.log(error)
            setloading(false)
            Swal.fire('Oops!','Something went wrong','error')
            
        }

    }
  return (
    <div className='row'>
       {loading && <Loader/>}
        <div className='col-md-5'>
            <input type="text" className='form-control'
            value={name} onChange={(e)=>{setname(e.target.value)}} placeholder='Room name'/>
            <input type="text" className='form-control'
            value={rentperday} onChange={(e)=>{setrentperday(e.target.value)}} placeholder='Rent per day'/>
            <input type="text" className='form-control' 
            value={maxcount} onChange={(e)=>{setmaxcount(e.target.value)}}placeholder='Max count'/>
            <input type="text" className='form-control'
            value={description} onChange={(e)=>{setdescription(e.target.value)}} placeholder='Description'/>
            <input type="text" className='form-control'
            value={phonenumber} onChange={(e)=>{setphonenumber(e.target.value)}} placeholder='Phone Number'/>
        </div>
        <div className='col-md-5'>
            <input type="text" className='form-control' 
            value={type} onChange={(e)=>{settype(e.target.value)}} placeholder='Type'/>
            <input type="text" className='form-control'
            value={imageurls1} onChange={(e)=>{setimageurls1(e.target.value)}} placeholder='img URL 1'/>
            <input type="text" className='form-control'
            value={imageurls2} onChange={(e)=>{setimageurls2(e.target.value)}} placeholder='img URL 2'/>
            <input type="text" className='form-control'
            value={imageurls3} onChange={(e)=>{setimageurls3(e.target.value)}} placeholder='img URL 3'/>
       <div className='text-right mt-3'>
            <button className='btn btn-secondary' onClick={addRoom}>Add Room</button>
       </div>
            
        </div>
        </div>
  )
}
