import { Link } from 'react-router-dom'

function CTASection() {
  return (
    <section className="bg-green-900 py-16 lg:py-24 relative overflow-hidden">

      {/* Background — concentric rings, same language as HeroSection */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-[360px] h-[360px] rounded-full border border-white/5" />
        <div className="absolute -top-8 -left-8 w-[260px] h-[260px] rounded-full border border-white/5" />
        <div className="absolute -bottom-24 -right-24 w-[400px] h-[400px] rounded-full border border-white/5" />
        <div className="absolute -bottom-10 -right-10 w-[280px] h-[280px] rounded-full border border-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/[0.03]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-5 text-center">

        {/* Admissions badge */}
        <div className="inline-flex items-center gap-2 bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-semibold px-4 py-2 rounded-full mb-7 tracking-wide">
          <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
          Admissions Open 2026
        </div>

        {/* Headline */}
        <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-5 leading-[1.12] tracking-tight">
          Ready to Begin Your{' '}
          <span className="text-amber-400 relative">
            Healing Journey?
            <svg className="absolute -bottom-1 left-0 w-full" height="4" viewBox="0 0 200 4" preserveAspectRatio="none">
              <path d="M0 3 Q50 0 100 3 Q150 6 200 3" stroke="#fbbf24" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5"/>
            </svg>
          </span>
        </h2>

        {/* Subtext */}
        <p className="text-green-200/75 text-base lg:text-lg mb-10 max-w-xl mx-auto leading-relaxed font-light">
          Join <span className="text-white font-semibold">10,000+ students</span> across India.
          Apply today and get instant access to course materials.
          Study at your own pace, from anywhere.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          <Link
            to="/apply"
            className="inline-flex items-center gap-2 bg-amber-400 text-green-900 font-bold text-sm px-8 py-4 rounded-xl hover:bg-amber-300 active:scale-95 transition-all duration-200 shadow-lg shadow-amber-400/20"
          >
            Apply for a Course
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <a
            href="https://wa.me/917218315876"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-semibold text-sm px-8 py-4 rounded-xl hover:bg-white/15 active:scale-95 transition-all duration-200"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.842L.057 23.854a.75.75 0 00.906.902l5.934-1.55A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.695 9.695 0 01-4.92-1.337l-.354-.21-3.656.956.979-3.572-.23-.368A9.694 9.694 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
            </svg>
            Talk to an Advisor
          </a>
        </div>

        {/* Trust strip */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {[
            { icon: '🔒', text: 'No spam, ever' },
            { icon: '⚡', text: 'Reply within 1 hour' },
            { icon: '🎓', text: 'Free counselling' },
          ].map(item => (
            <span key={item.text} className="inline-flex items-center gap-1.5 text-xs text-green-300/70">
              <span>{item.icon}</span>
              {item.text}
            </span>
          ))}
        </div>

      </div>
    </section>
  )
}

export default CTASection