import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import DashBoard from './components/pages/Dashboard'
import AutoPage from './components/pages/AutoPage'
import PrenotazioniPage from './components/pages/PrenotazioniPage';
import ParcheggiPage from './components/pages/ParcheggiPage';



function App() {


  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<DashBoard />}>
          <Route index element={<AutoPage />} /> 
          <Route path="auto" element={<AutoPage />} />
          <Route path="parcheggi" element={<ParcheggiPage />} />
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
