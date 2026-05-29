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

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

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

            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                Interested Course
              </label>
              <select
                name="course"
                value={form.course}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-colors bg-white"
              >
                <option value="">Select a course</option>
                {courses.map(c => (
                  <option key={c.id} value={c.title}>{c.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                State
              </label>
              <select
                name="state"
                value={form.state}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-colors bg-white"
              >
                <option value="">Select your state</option>
                {states.map(s => (
                  <option key={s}>{s}</option>
                ))}
              </select>
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
    </div>
  )
}

export default Register