
import './App.css'
import Home from './components/Home';
import Login from './components/Login';
import Post from './components/Post';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register';
import UploadForm from './components/UploadForm'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {

  return (
    <Router>
      <Routes>
        
        <Route exact path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        
        <Route path='/post/:id' element={<ProtectedRoute><Post /></ProtectedRoute>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/upload' element={<ProtectedRoute><UploadForm /></ProtectedRoute>} />
      </Routes>
    </Router>

  )
}

export default App
