const testimonials = [
  {
    name: 'Edward Kumar',
    course: 'MD in Naturopathy',
    state: 'Tamil Nadu',
    text: 'I completed my MD in Naturopathy from Saffron Institute and now run my own clinic. The course content, live lectures and mentorship from the doctors was truly exceptional.',
    initials: 'EK',
    avatarBg: 'bg-green-600',
    cardAccent: 'hover:border-green-200',
  },
  {
    name: 'Priya Ghosh',
    course: 'Diploma in Naturopathy',
    state: 'West Bengal',
    text: 'The distance learning format was perfect for me. I could study alongside my full-time job and complete the diploma in just 1 year. Highly recommended!',
    initials: 'PG',
    avatarBg: 'bg-blue-600',
    cardAccent: 'hover:border-blue-200',
  },
  {
    name: 'Dr. Kundan Chhetri',
    course: 'PhD in Naturopathy',
    state: 'West Bengal',
    text: 'Saffron Institute gave me the research foundation I needed. The PhD program is rigorous and the faculty are world-class naturopathy practitioners.',
    initials: 'KC',
    avatarBg: 'bg-purple-600',
    cardAccent: 'hover:border-purple-200',
  },
  {
    name: 'Fani Francis',
    course: 'PhD in Naturopathy',
    state: 'Kerala',
    text: 'I learned through live lectures, pre-recorded videos and study materials. The experience has been great and I plan to join as faculty in the future.',
    initials: 'FF',
    avatarBg: 'bg-amber-600',
    cardAccent: 'hover:border-amber-200',
  },
]

function TestimonialsSection() {
  return (
    <section className="bg-gray-50/60 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wide">
            <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
            Student Stories
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            What Our Students Say
          </h2>
          <p className="text-gray-500 text-base max-w-lg mx-auto leading-relaxed">
            Real reviews from real students studying across India and beyond.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {testimonials.map(t => (
            <div
              key={t.name}
              className={`group bg-white rounded-2xl p-6 border border-gray-100 ${t.cardAccent} hover:shadow-md transition-all duration-300 flex flex-col`}
            >

              {/* Top row — stars + quote mark */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-5xl text-gray-100 font-serif leading-none select-none">"</span>
              </div>

              {/* Quote */}
              <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-5">
                {t.text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className={`w-10 h-10 ${t.avatarBg} rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                  {t.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm truncate">{t.name}</p>
                  <p className="text-gray-400 text-xs mt-0.5 truncate">{t.course} · {t.state}</p>
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 border border-green-100 px-2.5 py-1 rounded-full flex-shrink-0">
                  Verified
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom social proof bar */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {['bg-green-600', 'bg-blue-600', 'bg-purple-600', 'bg-amber-600'].map((c, i) => (
                <div key={i} className={`w-7 h-7 ${c} rounded-full border-2 border-white flex items-center justify-center`}>
                  <span className="text-white text-[9px] font-bold">
                    {['EK','PG','KC','FF'][i]}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 font-medium">
              Join <span className="text-green-700 font-bold">10,000+</span> students
            </p>
          </div>
          <div className="hidden sm:block w-px h-5 bg-gray-200" />
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#fbbf24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <p className="text-sm text-gray-600 font-medium">
              <span className="text-gray-900 font-bold">4.9/5</span> average rating
            </p>
          </div>
          <div className="hidden sm:block w-px h-5 bg-gray-200" />
          <p className="text-sm text-gray-500">
            Across <span className="text-gray-700 font-semibold">28 states</span> in India
          </p>
        </div>

      </div>
    </section>
  )
}

export default TestimonialsSection