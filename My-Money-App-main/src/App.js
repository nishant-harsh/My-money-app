import './App.css'
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Signup from './pages/signup/Signup';
import Navbar from './components/navbar/Navbar';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const {authisready,user}=useAuthContext();
  return (
    <div className="App">
      {authisready && (<BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path="/" 
      
      element=
      {user ? <Home /> : <Navigate to="/Login" />}/>
      <Route path="/login" element={
      !user? <Login />:<Navigate to="/"/>}/>
      <Route path="/signup" element={
     !user? <Signup />:<Navigate to="/"/>}/>



      </Routes>
      
      
      </BrowserRouter>
)}
      
    </div>
  );
}

export default App
