import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import CourseContent from '../components/sections/CourseContent'
import courses from '../data/courses'

function StudentDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const statusColors = {
    pending: 'bg-amber-100 text-amber-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  }

  const statusMessages = {
    pending: '⏳ Your application is under review. Our team will call you within 24 hours.',
    approved: '✅ Congratulations! Your application has been approved. Please complete your payment.',
    rejected: '❌ Your application was not approved this time. Please contact us for more information.',
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Top Bar */}
      <div className="bg-green-800 px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">S5</span>
            </div>
            <span className="text-white font-bold text-sm hidden sm:block">
              Saffron5 Institute
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-green-200 text-xs hidden sm:block">
              Welcome, {user?.name}
            </span>
            <button
              onClick={handleLogout}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors border border-white/20"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Welcome Banner */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-green-700 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-gray-900">
                Welcome back, {user?.name?.split(' ')[0]}! 👋
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left — Main */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Application Status */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
                <span>📋</span> Application Status
              </h2>

              {user?.course ? (
                <>
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <p className="text-xs text-gray-400 mb-1">Applied Course</p>
                    <p className="font-bold text-gray-900 text-sm">{user.course}</p>
                  </div>

                  <div className={`rounded-xl px-4 py-3 text-sm font-semibold mb-3 ${statusColors[user?.status] || statusColors.pending}`}>
                    {user?.status?.toUpperCase() || 'PENDING'}
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {statusMessages[user?.status] || statusMessages.pending}
                  </p>
                </>
              ) : (
                <div className="text-center py-6">
                  <p className="text-4xl mb-3">📚</p>
                  <p className="text-gray-500 text-sm mb-4">
                    You haven't applied for a course yet.
                  </p>
                  <Link
                    to="/apply"
                    className="bg-green-700 text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-green-800 transition-colors"
                  >
                    Apply for a Course →
                  </Link>
                </div>
              )}
            </div>

            {/* Study Materials */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
                <span>📚</span> Study Materials
              </h2>

              {user?.studyMaterials?.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {user.studyMaterials.map((material, i) => (
                    <a
                      key={i}
                      href={material.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between bg-green-50 border border-green-100 rounded-xl px-4 py-3 hover:bg-green-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">📄</span>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{material.title}</p>
                          <p className="text-xs text-gray-400">
                            {new Date(material.uploadedAt).toLocaleDateString('en-IN')}
                          </p>
                        </div>
                      </div>
                      <span className="text-green-600 text-sm font-bold">Download →</span>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-xl">
                  <p className="text-4xl mb-3">📂</p>
                  <p className="text-gray-500 text-sm">
                    Study materials will appear here once your enrollment is confirmed.
                  </p>
                </div>
              )}
            </div>

            {/* Course Content Player */}
            {user?.status === 'approved' && user?.course && (() => {
              const enrolledCourse = courses.find(c => c.title === user.course)
              return enrolledCourse?.modules ? (
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-gray-900 text-base flex items-center gap-2">
                      <span>🎬</span> My Course Content
                    </h2>
                    <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                      ✅ Enrolled
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">
                    {enrolledCourse.title}
                  </p>
                  <CourseContent
                    modules={enrolledCourse.modules}
                    isEnrolled={true}
                  />
                </div>
              ) : null
            })()}

            {/* Live Schedule */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
                <span>💻</span> Live Lecture Schedule
              </h2>
              <div className="flex flex-col gap-3">
                {[
                  { icon: '📅', text: 'Live lectures: 1st to 5th of every month' },
                  { icon: '🎥', text: 'Zoom sessions with Doctors: Twice a month' },
                  { icon: '📝', text: 'Feedback sessions: Between 1st to 5th' },
                  { icon: '📋', text: 'Online examination: At end of every year' },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-3 bg-blue-50 rounded-xl px-4 py-3">
                    <span className="text-xl">{item.icon}</span>
                    <p className="text-gray-700 text-sm">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="flex flex-col gap-5">

            {/* Quick Info */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <h3 className="font-bold text-gray-900 text-sm mb-4">
                My Details
              </h3>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Name', value: user?.name },
                  { label: 'Email', value: user?.email },
                  { label: 'State', value: user?.state || 'Not set' },
                  { label: 'Status', value: user?.status || 'Pending' },
                ].map(item => (
                  <div key={item.label}>
                    <p className="text-xs text-gray-400">{item.label}</p>
                    <p className="text-sm font-semibold text-gray-800 capitalize">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
              <h3 className="font-bold text-amber-800 text-sm mb-3">
                💳 Payment Details
              </h3>
              <div className="flex flex-col gap-1.5 text-xs text-amber-700">
                <p>📱 PhonePe / GPay: <strong>7218315876</strong></p>
                <p>🏦 Bank of Baroda</p>
                <p>A/C: <strong>94450100017137</strong></p>
                <p>IFSC: <strong>BARBODBCDUR</strong></p>
                <p className="mt-2 font-semibold">
                  ⚠️ Send screenshot on WhatsApp after payment!
                </p>
              </div>
              <a
                href="https://wa.me/917218315876"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-center bg-green-600 text-white text-xs font-bold py-2.5 rounded-xl hover:bg-green-700 transition-colors"
              >
                💬 WhatsApp Payment Proof
              </a>
            </div>

            {/* Contact Support */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <h3 className="font-bold text-gray-900 text-sm mb-3">
                📞 Need Help?
              </h3>
              <div className="flex flex-col gap-2 text-xs text-gray-600">
                <a href="tel:7219051876" className="hover:text-green-700">
                  📞 +91 72190 51876
                </a>
                <a href="tel:9604741733" className="hover:text-green-700">
                  📞 +91 96047 41733
                </a>
                <a href="mailto:saffroninquiry5@gmail.com" className="hover:text-green-700">
                  ✉️ saffroninquiry5@gmail.com
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard