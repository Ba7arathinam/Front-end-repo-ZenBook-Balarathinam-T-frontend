import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Success from '../component/Success'
import Loader from '../component/Loader'
import Error from '../component/Error'


function Register() {
    const [name,setname]=useState('')
    const[email,setemail] = useState('')
    const[password,setpassword]=useState('')
    const[cpassword,setcpassword]=useState('')
    const [loading,setloading]=useState(false)
    const [error,seterror]=useState()
    const [success,setsuccess]=useState()



    async function  register(){
        if(password===cpassword){
            const user=
               {name,
                email,
                password,
                cpassword
               }
            try {
                setloading(true);
                const result= await axios.post('https://zinrooms-bookings.onrender.com/api/users/register',user).data
                setloading(false);
                setsuccess(true);
                setname('')
                setemail('')
                setpassword('')
                setcpassword('')
            } catch (error) {
                console.log(error)
                setloading(false);
                seterror(true);
            }
        }
        else{
            alert('password is not match')
        }
    }
    
  return (
    <div>
        {loading && (<Loader/>)}
        {error && (<Error/>)}
        
        
        <div className='row justify-content-center mt-5'>
            <div className='col-md-5 mt-5'>
            {success && (<Success message='Registration success'/>)}
                <div  className='bs'>
                    <h2>User Register</h2>
                    <input type="text" placeholder='Name'  value={name} onChange={(e)=>{setname(e.target.value)}} className='form-control'/>
                    <input type="email" placeholder='Email'  value={email}  onChange={(e)=>{setemail(e.target.value)}} className='form-control'/>
                    <input type="password" placeholder='Password' value={password}  onChange={(e)=>{setpassword(e.target.value)}} className='form-control'/>
                    <input type="password" placeholder='Confirm Password' value={cpassword}  onChange={(e)=>{setcpassword(e.target.value)}}  className='form-control'/>
                    <button className='btn btn-secondary mt-3' onClick={register}>Register</button>
                </div>
                
            </div>
            
        </div>
    </div>
  )
}

export default Register