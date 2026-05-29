const testimonials = [
  { name: 'Edward Kumar', course: 'MD in Naturopathy', state: 'Tamil Nadu', initials: 'EK', color: 'bg-green-600', text: 'I completed my MD in Naturopathy and now run my own clinic in Chennai. The live lectures and mentorship from faculty doctors was truly world-class.' },
  { name: 'Priya Ghosh', course: 'Diploma in Naturopathy', state: 'West Bengal', initials: 'PG', color: 'bg-blue-600', text: 'The distance learning format was perfect. I studied alongside my full-time job and earned my diploma in just 1 year. Highly recommended!' },
  { name: 'Dr. Kundan Chhetri', course: 'PhD in Naturopathy', state: 'West Bengal', initials: 'KC', color: 'bg-purple-600', text: 'The PhD program gave me a solid research foundation. The faculty are world-class practitioners with decades of clinical experience.' },
  { name: 'Fani Francis', course: 'BNYS', state: 'Kerala', initials: 'FF', color: 'bg-amber-600', text: 'I learned through live lectures, recorded videos and study materials. The experience was great and I now work in a wellness resort in Kerala.' },
  { name: 'Ramesh Patel', course: 'B.A.S.M', state: 'Gujarat', initials: 'RP', color: 'bg-red-600', text: 'Saffron5 made education affordable. I paid in EMI and studied from my hometown in Gujarat. The certificate opened many doors for me.' },
  { name: 'Sunita Rao', course: 'Diploma in DNYS', state: 'Karnataka', initials: 'SR', color: 'bg-teal-600', text: 'I was nervous as a first-time student but the faculty were incredibly supportive. Best decision I made for my career in wellness.' },
]

const stats = [
  { num: '10,000+', label: 'Students Enrolled', icon: '🎓' },
  { num: '28', label: 'States Covered', icon: '🗺️' },
  { num: '15+', label: 'Countries', icon: '🌍' },
  { num: '95%', label: 'Satisfaction Rate', icon: '⭐' },
]

function Students() {
  return (
    <div>

      {/* Hero */}
      <div className="bg-green-800 py-14 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-700 rounded-full opacity-20 translate-x-20 -translate-y-20 pointer-events-none" />
        <div className="relative max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs px-4 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
            Real Students · Real Results
          </span>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-3">
            Our Students
          </h1>
          <p className="text-green-100 text-base">
            10,000+ students across India and abroad have transformed
            their lives through our programs.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-100">
          {stats.map(s => (
            <div key={s.label} className="flex flex-col items-center py-8 px-4 text-center">
              <span className="text-3xl mb-2">{s.icon}</span>
              <span className="text-2xl font-extrabold text-green-700">{s.num}</span>
              <span className="text-xs text-gray-500 mt-1">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
              Student Reviews
            </span>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900">
              What Our Students Say
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-400">★</span>
                  ))}
                </div>
                {/* Quote */}
                <p className="text-gray-600 text-sm leading-relaxed italic flex-1 mb-5">
                  "{t.text}"
                </p>
                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.course} · {t.state}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Students