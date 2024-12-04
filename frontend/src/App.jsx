import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Signup from './components/Sinup';
import Registration from './Registeration/Registeration';
import Login from './login/Login';
import Navbar from './components/Homepgae/Navbar';
import Home from './components/Home/Home';
import Selectedmovie from './components/selectedmovie/Selectedmovie';
import Userprofile from './user profile/Userprofile';
import Editprofile from './user profile/Editprofile';
import ClippedDrawer from './Offcanva/ClippedDrawer';
import Changepassword from './Accounts/Changepassword';

function App() {
  const [count, setCount] = useState(0);
  
  return (
    <>
      
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Registration />} />
      <Route path="/signup" element={<Signup />} />
      <Route path='/:id' element={<Selectedmovie/>}/>
      <Route path='/user-details' element={<Editprofile/>}/>
      <Route path='/Account&Settings' element={<Changepassword/>}/>
    </Routes>
    {/* <Userprofile/> */}
    {/* <ClippedDrawer/> */}
    {/* <Changepassword/> */}
    </>
  );
}

export default App;
