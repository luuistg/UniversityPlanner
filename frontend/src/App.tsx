import { Routes, Route } from 'react-router-dom'
import Calendar from './pages/Calendar'
import DashBoard from './pages/DashBoard'
import SubjectInfo from './pages/SubjectInfo'
import Subjects from './pages/Subjects'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Login from './pages/LogIn'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
      <div className="bg-primary text-text flex flex-col min-h-screen">
          <Routes>
              {/* Ruta pública — sin navbar ni footer */}
              <Route path="/login" element={<Login />} />

              {/* Rutas privadas — con navbar y footer */}
              <Route path="/*" element={
                <ProtectedRoute>
                  <>
                      <NavBar />
                      <div className="max-w-6xl w-full mx-auto pt-20 flex-1 px-6 mt-4">
                          <Routes>
                              <Route path="/" element={<DashBoard />} />
                              <Route path="/subjects" element={<Subjects />} />
                              <Route path="/subject-info/:id" element={<SubjectInfo />} />
                              <Route path="/calendar" element={<Calendar />} />
                          </Routes>
                      </div>
                      <Footer />
                  </>
                </ProtectedRoute>
              } />
          </Routes>
      </div>
  )
}

export default App
