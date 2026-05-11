import { Routes, Route } from 'react-router-dom'
import Calendar from './pages/Calendar'
import DashBoard from './pages/DashBoard'
import SubjectInfo from './pages/SubjectInfo'
import Subjects from './pages/Subjects'
import NaNvBar from './components/NavBar'
import Footer from './components/Footer'

function App() {

  return (
    <div className="bg-primary text-text flex flex-col min-h-screen">
      <NaNvBar />
      <div className="max-w-6xl mx-auto pt-30 flex-1" >
        <Routes>
          <Route path="/" element={<DashBoard/>} />
          <Route path="/subjects" element={<Subjects/>} />
          <Route path="/subject-info/:id" element={<SubjectInfo/>} />
          <Route path="/calendar" element={<Calendar/>} />
        </Routes>
      </div>
      <div className="mt-auto w-full max-w-6xl mx-auto">
        <Footer />
      </div>
    </div>
  )
}

export default App
