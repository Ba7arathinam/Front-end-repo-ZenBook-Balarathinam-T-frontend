import React from 'react'


function NavBar() {
  const user =JSON.parse(localStorage.getItem('CurrentUser'))

  function logout(){
    localStorage.removeItem('CurrentUser')
    window.location.href='/login'
  }
  return (
    <div>
       <nav class="navbar navbar-expand-lg bo">
  <div class="container-fluid">
    <a class="navbar-brand" href='/home'>ZinRooms</a>
    <button class='navbar-toggler'
    type='button'
    data-toggle='collapse'
    aria-controls='#navbarNav'
    aria-expanded='false'
    aria-label='Toggle navigation'
    >
       <span class='navbar-toggler-icon'><i  style={{color:'white'}} class="fa fa-bars"></i></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <div class="navbar-nav mr-5">
       {user && (<>
        <div class="dropdown" >
  <button class="btn btn-secondary dropdown-toggle"style={{backgroundColor:'black',borderColor:'black'}} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
   <i className='fa fa-user'></i> {user.data.name}
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="/profile">profile</a>
    <a class="dropdown-item" href="/login" onClick={logout}>LogOut</a      >
  </div>
</div>

       
       </>)}
    {!user &&  (<> 
      <a class="nav-link active" aria-current="page" href="/Register">Register</a>

<a class="nav-link" href="/Login">Login</a>   
        </> )}
       
      </div>
    </div>
  </div>
</nav>
    </div>
  )
}

export default NavBar