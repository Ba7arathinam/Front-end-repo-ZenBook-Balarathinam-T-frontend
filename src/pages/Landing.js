import React from 'react'
import Link from 'antd/es/typography/Link'


function Landing() {
    

    function Home(){
      
        return   window.location.href="/home"
        
    }
  return (
    <div className='row landing justify-content-center'>

        <div className='col-md-9 my-auto text-center' style={{borderRight:'8px solid white'}}>
            <h2 style={{color:'white', fontSize:'130px'}}>
                ZinRooms
            </h2>
            <h1 style={{color:'aliceblue'}}>"Welcome to ZinRooms.Enjoy Your Weekend With Us"</h1>
            <button className='btn btn-secondary' style={{backgroundColor:'white',color:'black'}} onClick={Home}> Get Started</button>
            

        </div>
    </div>
  )
}

export default Landing