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

  const [selectedCourse, setSelectedCourse] = useState(null)
  const [courseModules, setCourseModules] = useState([])
  const [newModule, setNewModule] = useState('')
  const [newLesson, setNewLesson] = useState({
    moduleId: '',
    title: '',
    type: 'video',
    duration: '',
    videoUrl: '',
    videoSource: 'youtube',
    fileUrl: '',
    preview: false,
  })
  const [videoLoading, setVideoLoading] = useState(false)

  const loadCourseModules = async (slug) => {
    try {
      setVideoLoading(true)
      const data = await api(`/course-content/${slug}`, 'GET', null, token)
      setCourseModules(data.modules || [])
    } catch (err) {
      setCourseModules([])
    } finally {
      setVideoLoading(false)
    }
  }

  const addModule = async (courseSlug, courseTitle) => {
    if (!newModule.trim()) return alert('Enter module title!')
    try {
      await api(`/course-content/${courseSlug}/module`, 'POST', {
        courseTitle,
        moduleTitle: newModule,
      }, token)
      setNewModule('')
      await loadCourseModules(courseSlug)
      alert('✅ Module added!')
    } catch (err) {
      alert('Failed: ' + err.message)
    }
  }

  const addLesson = async (courseSlug) => {
    if (!newLesson.moduleId) return alert('Select a module!')
    if (!newLesson.title) return alert('Enter lesson title!')
    if (newLesson.type === 'video' && !newLesson.videoUrl) return alert('Enter video URL!')

    try {
      await api(
        `/course-content/${courseSlug}/module/${newLesson.moduleId}/lesson`,
        'POST',
        newLesson,
        token
      )
      setNewLesson({
        moduleId: newLesson.moduleId,
        title: '',
        type: 'video',
        duration: '',
        videoUrl: '',
        videoSource: 'youtube',
        fileUrl: '',
        preview: false,
      })
      await loadCourseModules(courseSlug)
      alert('✅ Video added!')
    } catch (err) {
      alert('Failed: ' + err.message)
    }
  }

  const deleteLesson = async (courseSlug, moduleId, lessonId) => {
    if (!window.confirm('Delete this lesson?')) return
    try {
      await api(
        `/course-content/${courseSlug}/module/${moduleId}/lesson/${lessonId}`,
        'DELETE',
        null,
        token
      )
      await loadCourseModules(courseSlug)
    } catch (err) {
      alert('Failed to delete.')
    }
  }

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

      setApplications(prev =>
        prev.map(a => a._id === app._id ? { ...a, status: 'enrolled' } : a)
      )

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
            { key: 'courses', label: '🎬 Manage Videos' },
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

            {/* Manage Videos Tab */}
            {tab === 'courses' && (
              <div className="flex flex-col gap-6">

                {/* Course Selector */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h2 className="font-bold text-gray-900 text-base mb-4">
                    🎬 Select Course to Manage Videos
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {[
                      { slug: 'diploma-naturopathy', title: 'Diploma N.D.' },
                      { slug: 'bachelor-asm', title: 'B.A.S.M.' },
                      { slug: 'md-naturopathy', title: 'M.D.' },
                      { slug: 'phd-naturopathy', title: 'PhD' },
                      { slug: 'bnys', title: 'BNYS' },
                      { slug: 'dnys', title: 'DNYS' },
                      { slug: 'nutrition-consultancy', title: 'Nutrition' },
                      { slug: 'dietetics-consultancy', title: 'Dietetics' },
                      { slug: 'dmlt', title: 'DMLT' },
                      { slug: 'bpt', title: 'BPT' },
                      { slug: 'cms-ed', title: 'CMS & ED' },
                      { slug: 'bams', title: 'BAMS' },
                      { slug: 'general-health', title: 'General Health' },
                      { slug: 'food-new-medicine', title: 'Food Medicine' },
                      { slug: 'speciality-diabetes', title: 'Diabetes' },
                    ].map(course => (
                      <button
                        key={course.slug}
                        onClick={() => {
                          setSelectedCourse(course)
                          loadCourseModules(course.slug)
                        }}
                        className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all
                          ${selectedCourse?.slug === course.slug
                            ? 'bg-green-700 text-white border-green-700'
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-green-400'
                          }`}
                      >
                        {course.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Video Manager */}
                {selectedCourse && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Left — Add Module & Video */}
                    <div className="flex flex-col gap-5">

                      {/* Add Module */}
                      <div className="bg-white rounded-2xl p-6 border border-gray-100">
                        <h3 className="font-bold text-gray-900 text-sm mb-4">
                          ➕ Add New Module
                        </h3>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newModule}
                            onChange={e => setNewModule(e.target.value)}
                            placeholder="Module name (e.g. Naturopathy Basics)"
                            className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-green-500"
                          />
                          <button
                            onClick={() => addModule(selectedCourse.slug, selectedCourse.title)}
                            className="bg-green-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-green-800 transition-colors"
                          >
                            Add
                          </button>
                        </div>
                      </div>

                      {/* Add Video/Lesson */}
                      <div className="bg-white rounded-2xl p-6 border border-gray-100">
                        <h3 className="font-bold text-gray-900 text-sm mb-4">
                          🎥 Add Video or Assignment
                        </h3>
                        <div className="flex flex-col gap-3">

                          {/* Select Module */}
                          <div>
                            <label className="text-xs font-semibold text-gray-500 block mb-1">
                              Select Module *
                            </label>
                            {courseModules.length === 0 ? (
                              <div className="bg-amber-50 border border-amber-100 rounded-xl px-3 py-2.5 text-xs text-amber-700">
                                ⚠️ No modules yet — add a module first using the form above!
                              </div>
                            ) : (
                              <select
                                value={newLesson.moduleId}
                                onChange={e => setNewLesson({ ...newLesson, moduleId: e.target.value })}
                                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 bg-white"
                              >
                                <option value="">Choose module...</option>
                                {courseModules.map(m => (
                                  <option key={m._id} value={m._id}>{m.title}</option>
                                ))}
                              </select>
                            )}
                          </div>

                          {/* Lesson Type */}
                          <div>
                            <label className="text-xs font-semibold text-gray-500 block mb-1">
                              Type
                            </label>
                            <div className="flex gap-2">
                              {['video', 'assignment'].map(t => (
                                <button
                                  key={t}
                                  onClick={() => setNewLesson({ ...newLesson, type: t })}
                                  className={`flex-1 py-2 rounded-xl text-xs font-semibold capitalize transition-all
                                    ${newLesson.type === t
                                      ? 'bg-green-700 text-white'
                                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                  {t === 'video' ? '🎥 Video' : '📝 Assignment'}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Title */}
                          <div>
                            <label className="text-xs font-semibold text-gray-500 block mb-1">
                              Lesson Title *
                            </label>
                            <input
                              type="text"
                              value={newLesson.title}
                              onChange={e => setNewLesson({ ...newLesson, title: e.target.value })}
                              placeholder="e.g. Introduction to Naturopathy"
                              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-green-500"
                            />
                          </div>

                          {newLesson.type === 'video' && (
                            <>
                              {/* Video Source */}
                              <div>
                                <label className="text-xs font-semibold text-gray-500 block mb-1">
                                  Video Source
                                </label>
                                <select
                                  value={newLesson.videoSource}
                                  onChange={e => setNewLesson({ ...newLesson, videoSource: e.target.value })}
                                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 bg-white"
                                >
                                  <option value="youtube">YouTube</option>
                                  <option value="googledrive">Google Drive</option>
                                  <option value="vimeo">Vimeo</option>
                                  <option value="direct">Direct MP4 Link</option>
                                </select>
                              </div>

                              {/* Video URL */}
                              <div>
                                <label className="text-xs font-semibold text-gray-500 block mb-1">
                                  Video URL *
                                </label>
                                <input
                                  type="text"
                                  value={newLesson.videoUrl}
                                  onChange={e => setNewLesson({ ...newLesson, videoUrl: e.target.value })}
                                  placeholder={
                                    newLesson.videoSource === 'youtube'
                                      ? 'https://youtube.com/watch?v=...'
                                      : newLesson.videoSource === 'googledrive'
                                        ? 'https://drive.google.com/file/d/...'
                                        : 'Paste video URL here'
                                  }
                                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-green-500"
                                />
                                <p className="text-xs text-gray-400 mt-1">
                                  {newLesson.videoSource === 'youtube' && '💡 Paste full YouTube URL — ID extracted automatically'}
                                  {newLesson.videoSource === 'googledrive' && '💡 Make sure file is set to "Anyone with link can view"'}
                                  {newLesson.videoSource === 'vimeo' && '💡 Paste Vimeo video ID or full URL'}
                                </p>
                              </div>

                              {/* Duration */}
                              <div>
                                <label className="text-xs font-semibold text-gray-500 block mb-1">
                                  Duration (optional)
                                </label>
                                <input
                                  type="text"
                                  value={newLesson.duration}
                                  onChange={e => setNewLesson({ ...newLesson, duration: e.target.value })}
                                  placeholder="e.g. 08:29"
                                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-green-500"
                                />
                              </div>
                            </>
                          )}

                          {newLesson.type === 'assignment' && (
                            <div>
                              <label className="text-xs font-semibold text-gray-500 block mb-1">
                                File URL (Google Drive / PDF link)
                              </label>
                              <input
                                type="text"
                                value={newLesson.fileUrl}
                                onChange={e => setNewLesson({ ...newLesson, fileUrl: e.target.value })}
                                placeholder="https://drive.google.com/..."
                                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-green-500"
                              />
                            </div>
                          )}

                          {/* Free Preview Toggle */}
                          <label className="flex items-center gap-3 cursor-pointer">
                            <div
                              onClick={() => setNewLesson({ ...newLesson, preview: !newLesson.preview })}
                              className={`w-10 h-6 rounded-full transition-colors relative ${newLesson.preview ? 'bg-green-600' : 'bg-gray-300'}`}
                            >
                              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow ${newLesson.preview ? 'left-5' : 'left-1'}`} />
                            </div>
                            <span className="text-xs font-semibold text-gray-600">
                              Free Preview (visible without enrollment)
                            </span>
                          </label>

                          {/* Submit */}
                          <button
                            onClick={() => addLesson(selectedCourse.slug)}
                            className="w-full bg-green-700 hover:bg-green-800 text-white font-bold text-sm py-3 rounded-xl transition-colors"
                          >
                            ➕ Add to Course
                          </button>

                        </div>
                      </div>
                    </div>

                    {/* Right — Current Modules & Videos */}
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-gray-900 text-sm">
                            Current Content — {selectedCourse.title}
                          </h3>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {courseModules.length} modules ·{' '}
                            {courseModules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0)} lessons
                          </p>
                        </div>
                        <button
                          onClick={() => loadCourseModules(selectedCourse.slug)}
                          className="text-xs text-green-600 hover:underline"
                        >
                          🔄 Refresh
                        </button>
                      </div>

                      {videoLoading ? (
                        <div className="p-8 text-center">
                          <p className="text-gray-400 text-sm">⏳ Loading...</p>
                        </div>
                      ) : courseModules.length === 0 ? (
                        <div className="p-8 text-center">
                          <p className="text-4xl mb-2">📭</p>
                          <p className="text-gray-400 text-sm">No content added yet.</p>
                          <p className="text-gray-300 text-xs mt-1">Add a module first, then add videos.</p>
                        </div>
                      ) : (
                        <div className="max-h-96 overflow-y-auto divide-y divide-gray-50">
                          {courseModules.map(module => (
                            <div key={module._id} className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <p className="font-bold text-gray-800 text-sm">
                                  📁 {module.title}
                                </p>
                                <span className="text-xs text-gray-400">
                                  {module.lessons?.length || 0} lessons
                                </span>
                              </div>

                              {module.lessons?.map(lesson => (
                                <div
                                  key={lesson._id}
                                  className="flex items-center gap-2 ml-3 py-1.5 border-b border-gray-50 last:border-0"
                                >
                                  <span className="text-xs">
                                    {lesson.type === 'video' ? '🎥' : '📝'}
                                  </span>
                                  <div className="flex-1">
                                    <p className="text-xs text-gray-700 font-medium">
                                      {lesson.title}
                                      {lesson.preview && (
                                        <span className="ml-1 text-green-600">(Preview)</span>
                                      )}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                      {lesson.videoSource} · {lesson.duration || 'No duration'}
                                    </p>
                                  </div>
                                  <button
                                    onClick={() => deleteLesson(selectedCourse.slug, module._id, lesson._id)}
                                    className="text-red-400 hover:text-red-600 text-xs px-2 py-1 rounded-lg hover:bg-red-50 transition-colors flex-shrink-0"
                                  >
                                    🗑️
                                  </button>
                                </div>
                              ))}

                              {(!module.lessons || module.lessons.length === 0) && (
                                <p className="text-xs text-gray-300 ml-3">No lessons yet</p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                )}
              </div>
            )}

          </>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard