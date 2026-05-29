import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import api from '../data/api'

const statusColors = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-amber-100 text-amber-700',
  enrolled: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
}

function AdminDashboard() {
  const { user, token, logout } = useAuth()
  const navigate = useNavigate()

  const [tab, setTab] = useState('applications')
  const [applications, setApplications] = useState([])
  const [students, setStudents] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [enrollingId, setEnrollingId] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [appsData, studentsData, statsData] = await Promise.all([
        api('/admin/applications', 'GET', null, token),
        api('/admin/students', 'GET', null, token),
        api('/admin/stats', 'GET', null, token),
      ])
      setApplications(appsData.applications)
      setStudents(studentsData.students)
      setStats(statsData)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await api(`/admin/applications/${id}`, 'PATCH', { status }, token)
      setApplications(prev =>
        prev.map(app => app._id === id ? { ...app, status } : app)
      )
    } catch (err) {
      alert('Failed to update status')
    }
  }

  const enrollStudent = async (app) => {
    const confirmed = window.confirm(
      `Enroll ${app.name} for:\n"${app.course}"\n\nThis will unlock their course immediately. Continue?`
    )
    if (!confirmed) return

    setEnrollingId(app._id)
    try {
      const data = await api('/admin/enroll-student', 'POST', {
        applicationId: app._id,
        studentEmail: app.email,
        studentPhone: app.phone,
        courseName: app.course,
      }, token)

      // Update applications list immediately in UI
      setApplications(prev =>
        prev.map(a => a._id === app._id ? { ...a, status: 'enrolled' } : a)
      )

      // Reload students list to reflect new status
      const studentsData = await api('/admin/students', 'GET', null, token)
      setStudents(studentsData.students)

      alert(data.message)
    } catch (err) {
      alert('Failed to enroll student: ' + err.message)
    } finally {
      setEnrollingId(null)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // Search across all fields
  const filteredApps = applications.filter(app =>
    app.name?.toLowerCase().includes(search.toLowerCase()) ||
    app.phone?.includes(search) ||
    app.email?.toLowerCase().includes(search.toLowerCase()) ||
    app.course?.toLowerCase().includes(search.toLowerCase()) ||
    app.state?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Top Bar */}
      <div className="bg-green-800 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">S5</span>
            </Link>
            <div>
              <p className="text-white font-bold text-sm">Admin Dashboard</p>
              <p className="text-green-300 text-xs">{user?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-2 rounded-full transition-colors border border-white/20"
            >
              🔄 Refresh
            </button>
            <button
              onClick={handleLogout}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors border border-white/20"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              {
                label: 'New Applications',
                value: stats.newApplications,
                icon: '🆕',
                color: 'border-blue-100',
                desc: 'Need to contact',
              },
              {
                label: 'Awaiting Payment',
                value: applications.filter(a => a.status === 'contacted').length,
                icon: '📞',
                color: 'border-amber-100',
                desc: 'Contacted students',
              },
              {
                label: 'Enrolled',
                value: stats.enrolled,
                icon: '🎓',
                color: 'border-green-100',
                desc: 'Course unlocked',
              },
              {
                label: 'Registered Users',
                value: stats.totalStudents,
                icon: '👥',
                color: 'border-purple-100',
                desc: 'Have accounts',
              },
            ].map(stat => (
              <div key={stat.label} className={`bg-white rounded-2xl p-5 border ${stat.color}`}>
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-extrabold text-gray-900">{stat.value}</div>
                <div className="text-xs font-semibold text-gray-700 mt-1">{stat.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{stat.desc}</div>
              </div>
            ))}
          </div>
        )}

        {/* How It Works Banner */}
        <div className="bg-green-50 border border-green-100 rounded-2xl p-4 mb-6">
          <p className="text-green-800 text-xs font-bold mb-2">
            💡 How to enroll a student after payment:
          </p>
          <div className="flex flex-wrap gap-2 text-xs text-green-700">
            {[
              '1. Student fills apply form',
              '2. Call student & share payment details',
              '3. Change status to "Contacted"',
              '4. Student pays via PhonePe/Bank',
              '5. Student sends WhatsApp screenshot',
              '6. Verify payment in your bank/PhonePe',
              '7. Click "✅ Enroll & Unlock" button',
              '8. Student logs in → course unlocked!',
            ].map((step, i) => (
              <span key={i} className="bg-green-100 px-3 py-1 rounded-full">
                {step}
              </span>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { key: 'applications', label: '📋 Applications' },
            { key: 'students', label: '👥 Students' },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all
                ${tab === t.key
                  ? 'bg-green-700 text-white shadow'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-green-300'
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">⏳</p>
            <p className="text-gray-500 text-sm">Loading data...</p>
          </div>
        ) : (
          <>

            {/* Applications Tab */}
            {tab === 'applications' && (
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">

                {/* Search */}
                <div className="p-4 border-b border-gray-100 flex gap-3">
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="🔍 Search by name, phone, email, course or state..."
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch('')}
                      className="text-xs text-gray-400 hover:text-gray-600 px-3 border border-gray-200 rounded-xl"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        {['Name & Contact', 'Phone', 'Course', 'Fee', 'State', 'Status', 'Actions'].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredApps.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-16">
                            <p className="text-4xl mb-2">📭</p>
                            <p className="text-gray-400 text-sm">No applications found</p>
                            {search && (
                              <button
                                onClick={() => setSearch('')}
                                className="mt-2 text-green-600 text-xs hover:underline"
                              >
                                Clear search
                              </button>
                            )}
                          </td>
                        </tr>
                      ) : (
                        filteredApps.map(app => (
                          <tr
                            key={app._id}
                            className={`border-b border-gray-50 transition-colors
                              ${app.status === 'enrolled'
                                ? 'bg-green-50/50'
                                : 'hover:bg-gray-50'
                              }`}
                          >
                            {/* Name */}
                            <td className="px-4 py-4">
                              <p className="font-semibold text-gray-900 text-sm">
                                {app.name}
                              </p>
                              <p className="text-gray-400 text-xs mt-0.5">
                                {app.email || 'No email'}
                              </p>
                              <p className="text-gray-300 text-xs">
                                {new Date(app.createdAt).toLocaleDateString('en-IN')}
                              </p>
                            </td>

                            {/* Phone */}
                            <td className="px-4 py-4">
                              <a
                                href={`tel:${app.phone}`}
                                className="text-sm text-green-600 font-semibold hover:underline block"
                              >
                                📞 {app.phone}
                              </a>
                              <a
                                href={`https://wa.me/91${app.phone}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-green-500 hover:underline mt-0.5 block"
                              >
                                💬 WhatsApp
                              </a>
                            </td>

                            {/* Course */}
                            <td className="px-4 py-4">
                              <p className="text-xs text-gray-700 max-w-36 leading-relaxed">
                                {app.course}
                              </p>
                              {app.qualification && (
                                <p className="text-xs text-gray-400 mt-0.5">
                                  {app.qualification}
                                </p>
                              )}
                            </td>

                            {/* Fee */}
                            <td className="px-4 py-4">
                              <p className="text-sm font-bold text-green-700 whitespace-nowrap">
                                {app.fee || '—'}
                              </p>
                            </td>

                            {/* State */}
                            <td className="px-4 py-4">
                              <p className="text-xs text-gray-600">{app.state || '—'}</p>
                              <p className="text-xs text-gray-400">{app.city || ''}</p>
                            </td>

                            {/* Status Badge */}
                            <td className="px-4 py-4">
                              <span className={`text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap ${statusColors[app.status]}`}>
                                {app.status === 'new' && '🆕 '}
                                {app.status === 'contacted' && '📞 '}
                                {app.status === 'enrolled' && '🎓 '}
                                {app.status === 'rejected' && '❌ '}
                                {app.status.toUpperCase()}
                              </span>
                            </td>

                            {/* Actions */}
                            <td className="px-4 py-4">
                              <div className="flex flex-col gap-2 min-w-32">

                                {/* Status Dropdown */}
                                <select
                                  value={app.status}
                                  onChange={e => updateStatus(app._id, e.target.value)}
                                  className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-green-500 bg-white w-full"
                                >
                                  <option value="new">🆕 New</option>
                                  <option value="contacted">📞 Contacted</option>
                                  <option value="enrolled">🎓 Enrolled</option>
                                  <option value="rejected">❌ Rejected</option>
                                </select>

                                {/* Enroll & Unlock Button */}
                                {app.status !== 'enrolled' && app.status !== 'rejected' ? (
                                  <button
                                    onClick={() => enrollStudent(app)}
                                    disabled={enrollingId === app._id}
                                    className={`text-xs font-bold px-3 py-2 rounded-lg transition-all w-full
                                      ${enrollingId === app._id
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-green-700 hover:bg-green-800 text-white shadow-sm hover:shadow-md'
                                      }`}
                                  >
                                    {enrollingId === app._id
                                      ? '⏳ Enrolling...'
                                      : '✅ Enroll & Unlock'
                                    }
                                  </button>
                                ) : app.status === 'enrolled' ? (
                                  <div className="text-center py-1.5 bg-green-50 border border-green-100 rounded-lg">
                                    <p className="text-xs text-green-700 font-bold">🎓 Enrolled</p>
                                    <p className="text-xs text-green-500">Course unlocked</p>
                                  </div>
                                ) : (
                                  <div className="text-center py-1.5 bg-red-50 border border-red-100 rounded-lg">
                                    <p className="text-xs text-red-600 font-bold">❌ Rejected</p>
                                  </div>
                                )}

                              </div>
                            </td>

                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Footer */}
                <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-xs text-gray-400">
                    Showing {filteredApps.length} of {applications.length} applications
                  </p>
                  <p className="text-xs text-gray-400">
                    {applications.filter(a => a.status === 'enrolled').length} enrolled ·{' '}
                    {applications.filter(a => a.status === 'new').length} new
                  </p>
                </div>

              </div>
            )}

            {/* Students Tab */}
            {tab === 'students' && (
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">

                {/* Header */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-700">
                    {students.length} Registered Student{students.length !== 1 ? 's' : ''}
                  </p>
                  <p className="text-xs text-gray-400">
                    Students who created accounts at /register
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        {['Name', 'Email', 'Phone', 'Course', 'State', 'Status', 'Joined'].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {students.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-16">
                            <p className="text-4xl mb-2">👥</p>
                            <p className="text-gray-400 text-sm">No registered students yet</p>
                            <p className="text-gray-300 text-xs mt-1">
                              Students register at /register after applying
                            </p>
                          </td>
                        </tr>
                      ) : (
                        students.map(student => (
                          <tr
                            key={student._id}
                            className={`border-b border-gray-50 hover:bg-gray-50 transition-colors
                              ${student.status === 'approved' ? 'bg-green-50/30' : ''}`}
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                  {student.name.charAt(0).toUpperCase()}
                                </div>
                                <p className="font-semibold text-gray-900 text-sm">
                                  {student.name}
                                </p>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-xs text-gray-600">{student.email}</td>
                            <td className="px-4 py-3">
                              <a href={`tel:${student.phone}`} className="text-xs text-green-600 hover:underline">
                                {student.phone}
                              </a>
                            </td>
                            <td className="px-4 py-3 text-xs text-gray-600 max-w-32 leading-relaxed">
                              {student.course || '—'}
                            </td>
                            <td className="px-4 py-3 text-xs text-gray-600">
                              {student.state || '—'}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`text-xs font-bold px-3 py-1 rounded-full
                                ${student.status === 'approved'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                {student.status === 'approved' ? '🎓 ENROLLED' : '⏳ PENDING'}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-xs text-gray-400">
                              {new Date(student.createdAt).toLocaleDateString('en-IN')}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

          </>
        )}

      </div>
    </div>
  )
}

export default AdminDashboard