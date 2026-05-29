import { Link } from 'react-router-dom'
import courses from '../../data/courses'

const dotColors = [
  'bg-yellow-400',
  'bg-emerald-400',
  'bg-blue-400',
  'bg-pink-400',
  'bg-purple-400',
]

function HeroSection() {
  return (
    <section className="relative bg-green-900 overflow-hidden">

      {/* Background texture — subtle leaf-vein pattern using layered rings */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full border border-white/5" />
        <div className="absolute -top-12 -right-12 w-[360px] h-[360px] rounded-full border border-white/5" />
        <div className="absolute top-0 right-0 w-[240px] h-[240px] rounded-full border border-white/5" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-green-800/50 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* Left — Text Content */}
        <div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-semibold px-4 py-2 rounded-full mb-7 tracking-wide">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
            Est. 1969 · Government Registered Trust
          </div>

          {/* Headline */}
          <h1 className="text-4xl lg:text-[52px] font-extrabold text-white leading-[1.12] mb-5 tracking-tight">
            India's Premier{' '}
            <span className="text-amber-400 relative">
              Naturopathy
              <svg className="absolute -bottom-1 left-0 w-full" height="4" viewBox="0 0 200 4" preserveAspectRatio="none">
                <path d="M0 3 Q50 0 100 3 Q150 6 200 3" stroke="#fbbf24" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6"/>
              </svg>
            </span>{' '}
            Institute
          </h1>

          {/* Subheading */}
          <p className="text-green-200/80 text-base lg:text-lg leading-relaxed mb-9 max-w-md font-light">
            Learn the ancient science of natural healing. Join{' '}
            <span className="text-white font-medium">10,000+ students</span>{' '}
            across India building careers in naturopathy, yoga & alternative medicine.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 mb-9">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 bg-amber-400 text-green-900 font-bold text-sm px-7 py-3.5 rounded-xl hover:bg-amber-300 active:scale-95 transition-all duration-200 shadow-lg shadow-amber-400/20"
            >
              Explore Courses
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <a
              href="https://wa.me/919833232057"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-semibold text-sm px-7 py-3.5 rounded-xl hover:bg-white/15 active:scale-95 transition-all duration-200"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.842L.057 23.854a.75.75 0 00.906.902l5.934-1.55A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.695 9.695 0 01-4.92-1.337l-.354-.21-3.656.956.979-3.572-.23-.368A9.694 9.694 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>
              Talk to Advisor
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2">
            {[
              { icon: '🏛️', text: 'UN & UNESCO Affiliated' },
              { icon: '🎖️', text: 'ISO Certified' },
              { icon: '📱', text: '100% Distance Learning' },
            ].map(badge => (
              <span
                key={badge.text}
                className="inline-flex items-center gap-1.5 text-xs text-green-200/70 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg"
              >
                <span>{badge.icon}</span>
                {badge.text}
              </span>
            ))}
          </div>

        </div>

        {/* Right — Course Preview Card */}
        <div className="bg-white/8 backdrop-blur-md border border-white/15 rounded-2xl overflow-hidden shadow-2xl shadow-black/20">

          {/* Card header */}
          <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
            <p className="text-white/50 text-xs font-semibold uppercase tracking-widest">
              Our Programs
            </p>
            <span className="text-xs text-amber-400 font-semibold bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
              15 Courses
            </span>
          </div>

          {/* Course list */}
          <div className="px-3 py-3 flex flex-col gap-0.5">
            {courses.slice(0, 5).map((course, index) => (
              <Link
                key={course.id}
                to={`/courses/${course.slug}`}
                className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/10 transition-all group cursor-pointer"
              >
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dotColors[index]}`} />
                <span className="text-white/85 text-sm flex-1 group-hover:text-white transition-colors leading-snug">
                  {course.title}
                </span>
                <span className="text-white/35 text-xs bg-white/8 px-2.5 py-1 rounded-lg flex-shrink-0 group-hover:text-white/60 transition-colors">
                  {course.duration}
                </span>
              </Link>
            ))}
          </div>

          {/* View all */}
          <div className="px-5 pb-4">
            <Link
              to="/courses"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-white/15 text-white/60 text-sm hover:bg-white/8 hover:text-white transition-all group"
            >
              View all 15 programs
              <svg className="group-hover:translate-x-0.5 transition-transform" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>

          {/* Mini stat row */}
          <div className="grid grid-cols-3 border-t border-white/10">
            {[
              { num: '10K+', label: 'Students' },
              { num: '55+', label: 'Yrs Experience' },
              { num: '28', label: 'States' },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`text-center py-4 ${i < 2 ? 'border-r border-white/10' : ''}`}
              >
                <div className="text-white font-bold text-xl tracking-tight">{s.num}</div>
                <div className="text-white/40 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}

export default HeroSection