import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import DashBoard from './components/pages/Dashboard'
import AutoPage from './components/pages/AutoPage'
import ParcheggiPage from './components/pages/ParcheggiPage';
import AutoDetail from './components/pages/AutoDetail';
import ParcheggioDetail from './components/pages/ParcheggiDetail';
import PrenotazioniPage from './components/pages/PrenotazioniPage';
import PrenotazioniTable from './components/pages/PrenotazioniTable';
import PrenotazioneDetail from './components/pages/PrenotazioneDetail';



function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<DashBoard />}>
          <Route index element={<AutoPage />} />
          <Route path="auto" element={<AutoPage />} />
          <Route path="parcheggi" element={<ParcheggiPage />} />
          <Route path="prenotazioni" element={<PrenotazioniPage />} />
          <Route path="AutoDetail/:id" element={<AutoDetail />} />
          <Route path="ParcheggiDetail/:id" element={<ParcheggioDetail />} />
          <Route path="PrenotazioniTable" element={<PrenotazioniTable />} />
          <Route path="PrenotazioneDetail/:id" element={<PrenotazioneDetail />} />
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
