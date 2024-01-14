import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/common/Login';
import Home from './pages/common/Home';
import Redirect from './pages/common/Redirect';
import './App.css';
import Registration from './pages/common/Registration';
import OtpValidation from './pages/common/OtpValidation';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Login/>}/>
          {/* <Route path='/userHome' element={<UserHome/>}/>
          <Route path='/adminHome' element={<AdminHome/>}/> */}
          <Route path="/login" element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/redirect' element={<Redirect/>}/>
          <Route path='/registration' element={<Registration/>}/>
          <Route path='/authorized' element={<Redirect/>}/>
          <Route path='/otp/verify' element={<OtpValidation/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
