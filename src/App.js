
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import NoteState from './context/NoteState';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useState } from 'react';

function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }

  return (
    <NoteState>
    <Router>
    <Navbar/>
    <Alert alert={alert}/>
    
    <div className="container">
  <Routes>
       
  <Route exact path = "/" element ={ <Home showAlert ={showAlert }/>}/> 
      
   </Routes>
   </div>
</Router>
</NoteState>
  );
}

export default App;
