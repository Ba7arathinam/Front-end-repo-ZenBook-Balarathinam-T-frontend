import './App.css';
import NavBar from './component/NavBar';
import {BrowserRouter as  Router, Routes,Route,} from"react-router-dom";
import Home from './pages/Home';
import Booking from './pages/Booking';
import Register from './pages/Register';
import Login from './pages/Login';
import Profilescreen from './pages/Profilescreen';
import Admin from './pages/Admin';
import Landing from './pages/Landing';




function App() {
  return (
    <div className="App">
         <NavBar/> 
          <Router>
          <Routes>
          <Route path='https://zinrooms.onrender.com//home' element={<Home/>}/>
          <Route path='https://zinrooms.onrender.com//book/:roomid/:fromdate/:todate' element={<Booking/>}/>
           <Route path='https://zinrooms.onrender.com//Register' element={<Register/>}/>
           <Route path='https://zinrooms.onrender.com//Login' element={<Login/>}/>
           <Route path='https://zinrooms.onrender.com//admin' element={<Admin/>}/>
           <Route path='/Profile' element={<Profilescreen/>}/>
           <Route path='/' element={<Landing/>}/>
         </Routes>
    </Router>
    </div>
  );
}

export default App;
