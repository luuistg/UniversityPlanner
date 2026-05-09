import { Routes, Route } from 'react-router-dom'
import Calendar from './pages/Calendar'
import DashBoard from './pages/DashBoard'
import SubjectInfo from './pages/SubjectInfo'
import Subjects from './pages/Subjects'

function App() {

  return (
    <Routes>
      <Route path="/" element={<DashBoard/>} />
      <Route path="/subjects" element={<Subjects/>} />
      <Route path="/subject-info/:id" element={<SubjectInfo/>} />
      <Route path="/calendar" element={<Calendar/>} />
    </Routes>
  )
}

export default App
