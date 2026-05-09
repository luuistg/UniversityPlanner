import { Routes, Route } from 'react-router-dom'
import Calendar from './pages/Calendar'
import DashBoard from './pages/DashBoard'
import SubjectInfo from './pages/SubjectInfo'
import Subjects from './pages/Subjects'
import NaNvBar from './components/NavBar'

function App() {

  return (
    <div className="bg-primary text-text min-h-screen">
      <NaNvBar />
      <div className="max-w-6xl mx-auto pt-30" >
        <Routes>
          <Route path="/" element={<DashBoard/>} />
          <Route path="/subjects" element={<Subjects/>} />
          <Route path="/subject-info/:id" element={<SubjectInfo/>} />
          <Route path="/calendar" element={<Calendar/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
