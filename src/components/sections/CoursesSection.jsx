import { Link } from 'react-router-dom'
import courses from '../../data/courses'

const courseStyles = [
  { bg: 'bg-green-50',  iconBg: 'bg-green-100',  icon: '🌿', badge: 'bg-green-100 text-green-700',  accent: 'group-hover:border-green-300' },
  { bg: 'bg-blue-50',   iconBg: 'bg-blue-100',   icon: '🎓', badge: 'bg-blue-100 text-blue-700',   accent: 'group-hover:border-blue-300' },
  { bg: 'bg-purple-50', iconBg: 'bg-purple-100', icon: '🔬', badge: 'bg-purple-100 text-purple-700', accent: 'group-hover:border-purple-300' },
  { bg: 'bg-amber-50',  iconBg: 'bg-amber-100',  icon: '📖', badge: 'bg-amber-100 text-amber-700',  accent: 'group-hover:border-amber-300' },
  { bg: 'bg-pink-50',   iconBg: 'bg-pink-100',   icon: '🧘', badge: 'bg-pink-100 text-pink-700',   accent: 'group-hover:border-pink-300' },
  { bg: 'bg-teal-50',   iconBg: 'bg-teal-100',   icon: '💊', badge: 'bg-teal-100 text-teal-700',   accent: 'group-hover:border-teal-300' },
  { bg: 'bg-red-50',    iconBg: 'bg-red-100',    icon: '🩺', badge: 'bg-red-100 text-red-700',    accent: 'group-hover:border-red-300' },
  { bg: 'bg-indigo-50', iconBg: 'bg-indigo-100', icon: '🧪', badge: 'bg-indigo-100 text-indigo-700', accent: 'group-hover:border-indigo-300' },
  { bg: 'bg-orange-50', iconBg: 'bg-orange-100', icon: '🏃', badge: 'bg-orange-100 text-orange-700', accent: 'group-hover:border-orange-300' },
]

function CoursesSection() {
  return (
    <section className="bg-gray-50/60 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wide">
            <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
            Our Programs
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Choose Your Path to Wellness
          </h2>
          <p className="text-gray-500 text-base max-w-lg mx-auto leading-relaxed">
            All courses are distance learning — study from anywhere in India
            at your own pace with expert guidance.
          </p>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course, index) => {
            const style = courseStyles[index % courseStyles.length]
            return (
              <Link
                key={course.id}
                to={`/courses/${course.slug}`}
                className={`group flex flex-col bg-white rounded-2xl p-6 border border-gray-100 ${style.accent} hover:shadow-md transition-all duration-300`}
              >
                {/* Icon + duration row */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 ${style.iconBg} rounded-xl flex items-center justify-center text-xl flex-shrink-0`}>
                    {style.icon}
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${style.badge}`}>
                    {course.duration}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-gray-900 text-[15px] mb-2 group-hover:text-green-700 transition-colors leading-snug">
                  {course.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-5">
                  {course.description}
                </p>

                {/* Footer */}
                <div className="flex items-center gap-1.5 text-green-600 text-sm font-semibold mt-auto">
                  <span className="group-hover:translate-x-0.5 transition-transform inline-block">Learn more</span>
                  <svg className="group-hover:translate-x-1 transition-transform" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>

              </Link>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 bg-green-700 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-green-800 active:scale-95 transition-all shadow-sm shadow-green-200"
          >
            View All Courses
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  )
}

export default CoursesSection