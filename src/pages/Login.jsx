import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../data/api'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [tab, setTab] = useState('student') // student | admin
  const [form, setForm] = useState({ email: '', password: '' })
  const [status, setStatus] = useState('idle') // idle | loading | error
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const endpoint = tab === 'student'
        ? '/auth/student/login'
        : '/auth/admin/login'

      const data = await api(endpoint, 'POST', form)

      // Save to context + localStorage
      const userData = tab === 'student' ? data.student : data.admin
      login(userData, data.token, tab)

      // Redirect based on role
      if (tab === 'admin') {
        navigate('/admin/dashboard')
      } else {
        navigate('/student/dashboard')
      }
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
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

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">

          {/* Tab Toggle */}
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6">
            {['student', 'admin'].map(t => (
              <button
                key={t}
                onClick={() => {
                  setTab(t)
                  setErrorMsg('')
                  setStatus('idle')
                }}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all capitalize
                  ${tab === t
                    ? 'bg-white text-green-700 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {t === 'student' ? '🎓 Student' : '⚙️ Admin'}
              </button>
            ))}
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-1">
            {tab === 'student' ? 'Student Login' : 'Admin Login'}
          </h2>
          <p className="text-gray-400 text-xs mb-6">
            {tab === 'student'
              ? 'Access your course materials and application status'
              : 'Manage applications and students'
            }
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                Email Address
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
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>

            {/* Error */}
            {status === 'error' && (
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
              {status === 'loading' ? '⏳ Logging in...' : 'Login →'}
            </button>
          </form>

          {/* Student register link */}
          {tab === 'student' && (
            <div className="mt-5 pt-5 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-400">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-green-600 font-semibold hover:underline"
                >
                  Register here →
                </Link>
              </p>
            </div>
          )}

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

export default Login