import { useState } from "react"
import React from 'react'
import axios from "axios"
import Loader from '../component/Loader'
import Error from '../component/Error'

function Login() {
 
    const[email,setemail] = useState('')
    const[password,setpassword]=useState('')
    const [loading,setloading]=useState(false)
    const [error,seterror]=useState()


  async  function login(){
        
            const user=
               {
                email,
                password,
                
                 }
                 try {
                    setloading(true);
                  const result= await axios.post('/api/users/login',user)
                  setloading(false);
                   localStorage.setItem('CurrentUser',JSON.stringify(result))
                  window.location.href='/home'
                 
                  
              
              
                
             
                  
                } catch(error)  {
                    console.log(error)
                    setloading(false);
                    window.location.href='/home'
                    // seterror(true);
                }
     
    }
  return (
    <div>
        
    <div className='row justify-content-center mt-5'>
    {loading && (<Loader/>)}
        <div className='col-md-5 mt-5'>
        {error && (<Error/>)}
            <div  className='bs'>
                <h2>User Login</h2>
                <input type="email" placeholder='Email'  value={email}  onChange={(e)=>{setemail(e.target.value)}} className='form-control'/>
                <input type="password" placeholder='Password' value={password}  onChange={(e)=>{setpassword(e.target.value)}} className='form-control'/>
                <button className='btn btn-secondary mt-3' onClick={login}>Login</button>
            </div>
            
        </div>
        
    </div>
</div>
  )
}

export default Login