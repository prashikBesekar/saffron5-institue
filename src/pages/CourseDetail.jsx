import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import courses from '../data/courses'
import CourseContent from '../components/sections/CourseContent'
import { useAuth } from '../context/AuthContext'

const courseStyles = [
  { bg: 'bg-green-50', icon: '🌿', accent: 'text-green-700', ring: 'ring-green-200' },
  { bg: 'bg-blue-50', icon: '🎓', accent: 'text-blue-700', ring: 'ring-blue-200' },
  { bg: 'bg-purple-50', icon: '🔬', accent: 'text-purple-700', ring: 'ring-purple-200' },
  { bg: 'bg-amber-50', icon: '📖', accent: 'text-amber-700', ring: 'ring-amber-200' },
  { bg: 'bg-pink-50', icon: '🧘', accent: 'text-pink-700', ring: 'ring-pink-200' },
  { bg: 'bg-teal-50', icon: '💊', accent: 'text-teal-700', ring: 'ring-teal-200' },
  { bg: 'bg-red-50', icon: '🩺', accent: 'text-red-700', ring: 'ring-red-200' },
  { bg: 'bg-indigo-50', icon: '🧪', accent: 'text-indigo-700', ring: 'ring-indigo-200' },
  { bg: 'bg-orange-50', icon: '🏃', accent: 'text-orange-700', ring: 'ring-orange-200' },
]

const included = [
  { icon: '📚', text: 'Books & Study Materials via Mail' },
  { icon: '🎥', text: 'Pre-Recorded Video Lectures' },
  { icon: '💻', text: 'Live Zoom Sessions (Twice a Month)' },
  { icon: '📰', text: 'Weekly Articles & Updates' },
  { icon: '📝', text: 'Assignments & Presentations' },
  { icon: '💬', text: 'Doubt Solving Sessions' },
  { icon: '📋', text: 'Online Examination at Year End' },
  { icon: '🎓', text: 'Official Certificate on Completion' },
]

const careerRoles = [
  'Naturopathy Physician', 'Naturopathy Consultant',
  'Yoga & Wellness Therapist', 'Research Officer',
  'Publication Officer', 'Hospital Administrator',
  'Spa & Wellness Manager', 'Private Clinic Owner',
  'Ministry of AYUSH Officer', 'Diet Consultant',
]

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-800 text-sm pr-4">{faq.q}</span>
        <span className={`text-green-600 text-lg flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      {open && (
        <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-3">
          {faq.a}
        </div>
      )}
    </div>
  )
}

function CourseDetail() {
  const { slug } = useParams()
  const { user } = useAuth()

  const course = courses.find(c => c.slug === slug)
  const courseIndex = courses.findIndex(c => c.slug === slug)
  const style = courseStyles[courseIndex % courseStyles.length]

  const isEnrolled = user?.status === 'approved' || user?.status === 'enrolled'

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <p className="text-6xl mb-4">😕</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h1>
        <p className="text-gray-500 mb-6">The course you're looking for doesn't exist.</p>
        <Link
          to="/courses"
          className="bg-green-700 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-800 transition-colors"
        >
          View All Courses
        </Link>
      </div>
    )
  }

  return (
    <div>

      {/* Hero */}
      <div className="bg-green-800 py-14 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-green-700 rounded-full opacity-20 translate-x-20 -translate-y-20 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-green-300 text-xs mb-6 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <Link to="/courses" className="hover:text-white transition-colors">Courses</Link>
            <span>›</span>
            <span className="text-white">{course.title}</span>
          </div>

          <div className="flex items-start gap-5">
            <div className={`w-16 h-16 ${style.bg} rounded-2xl flex items-center justify-center text-3xl flex-shrink-0`}>
              {style.icon}
            </div>
            <div>
              <h1 className="text-2xl lg:text-4xl font-extrabold text-white mb-3 leading-tight">
                {course.title}
              </h1>
              <p className="text-green-100 text-base max-w-2xl leading-relaxed">
                {course.description}
              </p>
            </div>
          </div>

          {/* Quick info pills */}
          <div className="flex flex-wrap gap-3 mt-8">
            {[
              { label: '⏱ Duration', value: course.duration },
              { label: '📡 Mode', value: course.mode },
              { label: '🎯 Eligibility', value: course.eligibility },
              { label: '💰 Fee', value: course.fee },
            ].map(item => (
              <div key={item.label} className="bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm">
                <span className="text-white/60 text-xs block">{item.label}</span>
                <span className="text-white font-semibold">{item.value}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ✅ LEFT COLUMN — contains ALL left content including CourseContent */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* What You Will Learn */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                <span className="text-2xl">🎯</span> What You Will Learn
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.curriculum.map((topic, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-gray-600 text-sm leading-relaxed">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                <span className="text-2xl">📦</span> What's Included
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {included.map(item => (
                  <div key={item.text} className="flex items-center gap-3 bg-green-50 rounded-xl px-4 py-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-gray-700 text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Opportunities */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                <span className="text-2xl">🚀</span> Career Opportunities
              </h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {careerRoles.map(role => (
                  <span key={role} className="text-sm bg-green-50 text-green-800 border border-green-100 px-4 py-2 rounded-full font-medium">
                    {role}
                  </span>
                ))}
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Work with Ministry of AYUSH, NIN, CCRYN, hospitals, spas,
                private clinics, research centres and more across India and abroad.
                You can also start your own Naturopathy Clinic or Practice.
              </p>
            </div>

            {/* How to Apply */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                <span className="text-2xl">📋</span> How to Apply
              </h2>
              <div className="flex flex-col gap-4">
                {[
                  { step: '01', title: 'Fill Registration Form', desc: 'Fill the registration form on our website with your personal and academic details.' },
                  { step: '02', title: 'Document Verification', desc: 'Submit required certificates. After verification you receive a selection certificate.' },
                  { step: '03', title: 'Selection Interview', desc: 'A selection officer will schedule a brief interview to assess your application.' },
                  { step: '04', title: 'Complete Payment', desc: 'Pay via PhonePe, Google Pay or Bank Transfer to Bank of Baroda. EMI options available.' },
                  { step: '05', title: 'Get Instant Access', desc: 'After payment confirmation, receive your study materials and course access immediately.' },
                ].map(item => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-10 h-10 bg-green-700 text-white rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{item.title}</p>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                <span className="text-2xl">❓</span> Frequently Asked Questions
              </h2>
              <div className="flex flex-col gap-3">
                {course.faqs.map((faq, i) => (
                  <FAQItem key={i} faq={faq} />
                ))}
              </div>
            </div>

            {/* CourseContent INSIDE */}
            {course.modules && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">🎬</span>
                  <h2 className="text-lg font-bold text-gray-900">
                    Course Content
                  </h2>
                </div>
                <CourseContent
                  modules={course.modules}
                  isEnrolled={isEnrolled}
                />
              </div>
            )}

          </div>
          {/* END LEFT COLUMN */}

          {/* RIGHT SIDEBAR */}
          <div className="flex flex-col gap-5">

            {/* Apply Card */}
            <div className="bg-white rounded-2xl p-6 border border-green-200 shadow-sm sticky top-24">
              <div className={`w-12 h-12 ${style.bg} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                {style.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1">
                Ready to Enroll?
              </h3>

              {/* Fee */}
              <div className="bg-green-50 border border-green-100 rounded-xl px-4 py-3 mb-4">
                <p className="text-xs text-gray-500 mb-0.5">Course Fee</p>
                <p className="text-2xl font-extrabold text-green-700">{course.fee}</p>
                {/* <p className="text-xs text-gray-400">EMI options available</p> */}
              </div>

              <p className="text-gray-500 text-xs mb-4 leading-relaxed">
                Admissions open. Get instant access after payment.
              </p>

              <Link
                to="/apply"
                onClick={() => window.scrollTo(0, 0)}
                className="block w-full bg-green-700 hover:bg-green-800 text-white text-center font-bold text-sm py-3.5 rounded-xl transition-colors mb-3"
              >
                Apply Now
              </Link>
              <a
                href="https://wa.me/917218315876"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full border border-green-200 text-green-700 text-center font-semibold text-sm py-3.5 rounded-xl hover:bg-green-50 transition-colors"
              >
                💬 Ask on WhatsApp
              </a>

              {/* Payment Methods */}
              <div className="mt-5 pt-4 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-500 mb-3">Payment Methods</p>
                <div className="flex flex-col gap-2 text-xs text-gray-600">
                  <p>📱 PhonePe / GPay: <strong>7218315876</strong></p>
                  <p>🏦 Bank of Baroda</p>
                  <p className="text-gray-400">A/C: 94450100017137</p>
                  <p className="text-gray-400">IFSC: BARBODBCDUR</p>
                  <p className="text-amber-600 text-xs mt-1">
                    ⚠️ Send payment screenshot on WhatsApp
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
                {[
                  '✅ Study at your own pace',
                  '✅ Certificate guaranteed',
                  '✅ Live Zoom with Doctors',
                ].map(point => (
                  <p key={point} className="text-xs text-gray-500">{point}</p>
                ))}
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <h3 className="font-bold text-gray-900 text-sm mb-3">
                📞 Have Questions?
              </h3>
              <div className="flex flex-col gap-2 text-xs text-gray-600">
                {['+91 72190 51876', '+91 96047 41733', '+91 75075 54335'].map(num => (
                  <a key={num} href={`tel:${num.replace(/\s/g, '')}`}
                    className="hover:text-green-700 transition-colors font-medium">
                    📞 {num}
                  </a>
                ))}
                <a href="mailto:saffroninquiry5@gmail.com"
                  className="hover:text-green-700 transition-colors mt-1">
                  ✉️ saffroninquiry5@gmail.com
                </a>
              </div>
            </div>

            {/* Other Courses */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <h3 className="font-bold text-gray-900 text-sm mb-4">
                Other Programs
              </h3>
              <div className="flex flex-col gap-2">
                {courses
                  .filter(c => c.slug !== slug)
                  .slice(0, 5)
                  .map(c => (
                    <Link
                      key={c.id}
                      to={`/courses/${c.slug}`}
                      className="text-xs text-gray-600 hover:text-green-700 py-1.5 border-b border-gray-50 flex items-center justify-between group transition-colors"
                    >
                      <span className="line-clamp-1">{c.title}</span>
                      <span className="text-gray-300 group-hover:text-green-500 flex-shrink-0 ml-2">→</span>
                    </Link>
                  ))}
                <Link to="/courses" className="text-xs text-green-600 font-semibold mt-1 hover:underline">
                  View all courses →
                </Link>
              </div>
            </div>

          </div>
          {/* END RIGHT SIDEBAR */}

        </div>
      </div>

    </div>
  )
}

export default CourseDetail