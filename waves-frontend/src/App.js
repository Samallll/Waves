import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/common/Login';
import Home from './pages/common/Login';
import Redirect from './pages/common/Redirect';
import SignUp from './pages/common/SignUp';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/redirect' element={<Redirect/>}/>
          <Route path='/registration' element={<SignUp/>}/>
          <Route path='/authorized' element={<Redirect/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
