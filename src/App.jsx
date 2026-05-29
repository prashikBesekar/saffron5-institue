import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import WhatsAppButton from './components/ui/WhatsAppButton'
import ProtectedRoute from './components/ui/ProtectedRoute'

import Home from './pages/Home'
import About from './pages/About'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import Gallery from './pages/Gallery'
import Students from './pages/Students'
import Affiliation from './pages/Affiliation'
import StudyCenters from './pages/StudyCenters'
import Contact from './pages/Contact'
import Rules from './pages/Rules'
import Apply from './pages/Apply'
import Login from './pages/Login'
import Register from './pages/Register'
import StudentDashboard from './pages/StudentDashboard'
import AdminDashboard from './pages/AdminDashboard'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import Documentation from './pages/Documentation'

// Layout with Navbar + Footer
function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public pages — with Navbar & Footer */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/courses" element={<PublicLayout><Courses /></PublicLayout>} />
        <Route path="/courses/:slug" element={<PublicLayout><CourseDetail /></PublicLayout>} />
        <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
        <Route path="/students" element={<PublicLayout><Students /></PublicLayout>} />
        <Route path="/affiliation" element={<PublicLayout><Affiliation /></PublicLayout>} />
        <Route path="/study-centers" element={<PublicLayout><StudyCenters /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/rules" element={<PublicLayout><Rules /></PublicLayout>} />
        <Route path="/apply" element={<PublicLayout><Apply /></PublicLayout>} />
        <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
        <Route path="/blog/:slug" element={<PublicLayout><BlogDetail /></PublicLayout>} />  
        <Route path="/documentation" element={<PublicLayout><Documentation /></PublicLayout>} />
  

        {/* Auth pages — NO Navbar/Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected — Student Dashboard */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute requiredRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected — Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App