import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../data/api'
import courses from '../data/courses'

const states = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
  'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
  'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
  'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Outside India',
]

function Register() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    course: '',
    state: '',
  })
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [courseModalOpen, setCourseModalOpen] = useState(false)
  const [stateModalOpen, setStateModalOpen] = useState(false)
  const [searchCourse, setSearchCourse] = useState('')
  const [searchState, setSearchState] = useState('')

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSelectCourse = (courseTitle) => {
    setForm({ ...form, course: courseTitle })
    setCourseModalOpen(false)
    setSearchCourse('')
  }

  const handleSelectState = (stateName) => {
    setForm({ ...form, state: stateName })
    setStateModalOpen(false)
    setSearchState('')
  }

  const filteredCourses = courses.filter(c =>
    c.title.toLowerCase().includes(searchCourse.toLowerCase())
  )

  const filteredStates = states.filter(s =>
    s.toLowerCase().includes(searchState.toLowerCase())
  )

  const handleSubmit = async e => {
    e.preventDefault()
    setErrorMsg('')

    if (form.password !== form.confirmPassword) {
      setErrorMsg('Passwords do not match.')
      return
    }
    if (form.password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.')
      return
    }

    setStatus('loading')

    try {
      const data = await api('/auth/student/register', 'POST', {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        course: form.course,
        state: form.state,
      })

      login(data.student, data.token, 'student')
      navigate('/student/dashboard')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">S5</span>
            </div>
            <div className="text-left">
              <p className="text-green-800 font-bold text-sm">Saffron5 Institute</p>
              <p className="text-gray-400 text-xs">Be Your Own Doctor</p>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Create Student Account
          </h2>
          <p className="text-gray-400 text-xs mb-6">
            Register to track your application and access study materials
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 00000 00000"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>
            </div>

            {/* Course - Desktop Select / Mobile Bottom Sheet */}
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                Interested Course
              </label>
              {/* Desktop */}
              <select
                name="course"
                value={form.course}
                onChange={handleChange}
                className="hidden sm:block w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-colors bg-white"
              >
                <option value="">Select a course</option>
                {courses.map(c => (
                  <option key={c.id} value={c.title}>{c.title}</option>
                ))}
              </select>
              {/* Mobile - Button to trigger modal */}
              <button
                type="button"
                onClick={() => setCourseModalOpen(true)}
                className="sm:hidden w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-left focus:outline-none focus:border-green-500 transition-colors bg-white hover:border-green-300 flex items-center justify-between"
              >
                <span className={form.course ? 'text-gray-900' : 'text-gray-400'}>
                  {form.course || 'Select a course'}
                </span>
              </button>
            </div>

            {/* State - Desktop Select / Mobile Bottom Sheet */}
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                State
              </label>
              {/* Desktop */}
              <select
                name="state"
                value={form.state}
                onChange={handleChange}
                className="hidden sm:block w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-colors bg-white "
              >
                <option value="">Select your state</option>
                {states.map(s => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              {/* Mobile - Button to trigger modal */}
              <button
                type="button"
                onClick={() => setStateModalOpen(true)}
                className="sm:hidden w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-left focus:outline-none focus:border-green-500 transition-colors bg-white hover:border-green-300 flex items-center justify-between"
              >
                <span className={form.state ? 'text-gray-900' : 'text-gray-400'}>
                  {form.state || 'Select your state'}
                </span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min 6 characters"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat password"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>
            </div>

            {/* Error */}
            {errorMsg && (
              <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-red-600 text-xs">
                ⚠️ {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className={`w-full font-bold text-sm py-3.5 rounded-xl transition-all text-white mt-2
                ${status === 'loading'
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-700 hover:bg-green-800'
                }`}
            >
              {status === 'loading' ? '⏳ Creating Account...' : 'Create Account →'}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-green-600 font-semibold hover:underline">
                Login here →
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          <Link to="/" className="hover:text-green-600 transition-colors">
            ← Back to Website
          </Link>
        </p>
      </div>

      {/* Course Bottom Sheet Modal */}
      {courseModalOpen && (
        <div className="sm:hidden fixed inset-0 z-50 flex items-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 transition-opacity"
            onClick={() => {
              setCourseModalOpen(false)
              setSearchCourse('')
            }}
          />
          
          {/* Bottom Sheet */}
          <div className="relative w-full bg-white rounded-t-3xl shadow-2xl max-h-[80vh] flex flex-col animate-in slide-in-from-bottom-5">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
              <h3 className="text-base font-bold text-gray-900">Select Course</h3>
              <button
                onClick={() => {
                  setCourseModalOpen(false)
                  setSearchCourse('')
                }}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>

            {/* Search */}
            <div className="px-6 py-3 border-b border-gray-100 flex-shrink-0">
              <input
                type="text"
                placeholder="🔍 Search course..."
                value={searchCourse}
                onChange={(e) => setSearchCourse(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>

            {/* Course List */}
            <div className="overflow-y-auto flex-1">
              {filteredCourses.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                  <p className="text-gray-400 text-sm">No courses found</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredCourses.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleSelectCourse(c.title)}
                      className={`w-full px-6 py-4 text-left flex items-center justify-between hover:bg-green-50 transition-colors ${
                        form.course === c.title ? 'bg-green-50 border-l-4 border-green-600' : ''
                      }`}
                    >
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{c.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{c.duration}</p>
                      </div>
                      {form.course === c.title && (
                        <span className="text-green-600 text-lg">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* State Bottom Sheet Modal */}
      {stateModalOpen && (
        <div className="sm:hidden fixed inset-0 z-50 flex items-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 transition-opacity"
            onClick={() => {
              setStateModalOpen(false)
              setSearchState('')
            }}
          />
          
          {/* Bottom Sheet */}
          <div className="relative w-full bg-white rounded-t-3xl shadow-2xl max-h-[80vh] flex flex-col animate-in slide-in-from-bottom-5">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
              <h3 className="text-base font-bold text-gray-900">Select State</h3>
              <button
                onClick={() => {
                  setStateModalOpen(false)
                  setSearchState('')
                }}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>

            {/* Search */}
            <div className="px-6 py-3 border-b border-gray-100 flex-shrink-0">
              <input
                type="text"
                placeholder="🔍 Search state..."
                value={searchState}
                onChange={(e) => setSearchState(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>

            {/* State List */}
            <div className="overflow-y-auto flex-1">
              {filteredStates.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                  <p className="text-gray-400 text-sm">No states found</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredStates.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSelectState(s)}
                      className={`w-full px-6 py-3.5 text-left flex items-center justify-between hover:bg-green-50 transition-colors ${
                        form.state === s ? 'bg-green-50 border-l-4 border-green-600' : ''
                      }`}
                    >
                      <p className="text-sm font-medium text-gray-900">{s}</p>
                      {form.state === s && (
                        <span className="text-green-600 text-lg">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Register