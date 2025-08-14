import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Dashboard from './Pages.jsx/Dashboard'
import Logs from './Pages.jsx/Logs'
import About from './Pages.jsx/About'
import AddInterfaceLog from './Pages.jsx/AddInterface'


function App() {
  return (

    <div className="app-container">
     
      <Navbar/>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/logs' element={<Logs/>}/>
        <Route path='/add-log' element={<AddInterfaceLog/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
    </div>
  )
}

export default App
