import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import DashBoard from './components/pages/Dashboard'
import AutoPage from './components/pages/AutoPage'



function App() {


  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<DashBoard />}>
          <Route index element={<AutoPage />} /> {/* ← viene caricato dentro Outlet */}
          <Route path="auto" element={<AutoPage />} />
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
