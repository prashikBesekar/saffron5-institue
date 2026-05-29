import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import emailConfig from '../data/config'

const courseOptions = [
  'Diploma in Naturopathy (N.D.)',
  'Bachelor in Alternative System of Medicine (B.A.S.M)',
  'Doctor of Medicine in Naturopathy (M.D.)',
  'PhD - Alternative System of Medicine',
  'BNYS - Naturopathy & Yoga Science',
  'Diploma in Naturopathy & Yogic Science (D.N.Y.S.)',
  'CMS & ED',
  'Diploma in Medical Lab Technology (DMLT)',
  'Bachelor of Physiotherapy (BPT)',
  'CMS & ED (Community Medical Services & Essential Drugs)',
  'Bachelor of Ayurvedic Medicine System (BAMS-AM)',
  'General Health',
  'Food & New Medicine',
  'Speciality in Diabetes',
]

const contactCards = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: 'Our Branches',
    lines: [
      'Head Office — Mumbai',
      '2nd Branch — Sambhaji Nagar',
      '3rd Branch — Nagpur',
      '4th Branch — Amravati (Opening Soon)',
    ],
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.08 1.18 2 2 0 012 .02h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
    title: 'Phone Numbers',
    lines: ['+91 72190 51876', '+91 96047 41733', '+91 75075 54335'],
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    title: 'Email',
    lines: [
      'saffronhealth5@gmail.com',
      'saffroninquiry5@gmail.com',
      'saffroneducation5@gmail.com',
    ],
  },
]

const inputClass =
  'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-all bg-white'

function CourseSelect({ value, onChange }) {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [courseSearch, setCourseSearch] = useState('')

  const filteredCourses = courseOptions.filter(c =>
    c.toLowerCase().includes(courseSearch.toLowerCase())
  )

  const handlePick = (course) => {
    onChange(course)
    setCourseSearch('')
    setSheetOpen(false)
  }

  const handleClose = () => {
    setCourseSearch('')
    setSheetOpen(false)
  }

  return (
    <div>
      {/*  Trigger button (shown on ALL screen sizes)  */}
      <button
        type="button"
        onClick={() => setSheetOpen(true)}
        className={`${inputClass} flex items-center justify-between text-left ${
          value ? 'text-gray-900' : 'text-gray-300'
        }`}
      >
        <span className="truncate pr-2">{value || 'Select a course'}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${sheetOpen ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/*  Mobile bottom sheet (hidden on sm+)  */}
      {sheetOpen && (
        <div className="sm:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={handleClose}
          />

          {/* Sheet */}
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl max-h-[72vh] flex flex-col shadow-2xl">
            {/* Handle */}
            <div className="w-9 h-1 bg-gray-200 rounded-full mx-auto mt-3 flex-shrink-0" />

            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-3 pb-2 flex-shrink-0">
              <span className="font-bold text-gray-900 text-base">Select a course</span>
              <button
                type="button"
                onClick={handleClose}
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xl leading-none hover:bg-gray-200 transition-colors"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Search */}
            <div className="px-4 pb-2 flex-shrink-0 relative">
              <svg
                className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search courses..."
                value={courseSearch}
                onChange={e => setCourseSearch(e.target.value)}
                autoFocus
                className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 bg-gray-50 transition-all"
              />
            </div>

            {/* Options list */}
            <div className="overflow-y-auto flex-1 px-2 pb-6">
              {filteredCourses.length === 0 ? (
                <p className="text-center text-gray-400 text-sm py-8">No courses found</p>
              ) : (
                filteredCourses.map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handlePick(c)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm flex items-center justify-between gap-3 transition-colors active:scale-[0.99]
                      ${value === c
                        ? 'bg-green-50 text-green-700 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50 active:bg-green-50'
                      }`}
                  >
                    <span>{c}</span>
                    {value === c && (
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="text-green-600 flex-shrink-0"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Desktop dropdown (hidden on mobile, shown on sm+) */}
      {sheetOpen && (
        <div className="hidden sm:block relative z-30">
          {/* Click-away overlay */}
          <div className="fixed inset-0" onClick={handleClose} />

          {/* Dropdown panel */}
          <div className="absolute top-1 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-30">
            {/* Search */}
            <div className="p-2 border-b border-gray-100 relative">
              <svg
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search courses..."
                value={courseSearch}
                onChange={e => setCourseSearch(e.target.value)}
                autoFocus
                className="w-full border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-green-500 bg-gray-50"
              />
            </div>

            {/* Options */}
            <div className="max-h-56 overflow-y-auto py-1">
              {filteredCourses.length === 0 ? (
                <p className="text-center text-gray-400 text-sm py-4">No courses found</p>
              ) : (
                filteredCourses.map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handlePick(c)}
                    className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between gap-3 transition-colors
                      ${value === c
                        ? 'bg-green-50 text-green-700 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    <span>{c}</span>
                    {value === c && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="text-green-600 flex-shrink-0"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Contact() {
  const formRef = useRef()
  const [form, setForm] = useState({
    from_name: '', from_email: '', phone: '', course: '', message: '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.from_name || !form.phone) {
      alert('Please fill in your name and phone number.')
      return
    }
    setStatus('sending')
    try {
      await emailjs.sendForm(
        emailConfig.serviceId,
        emailConfig.templateId,
        formRef.current,
        emailConfig.publicKey,
      )
      setStatus('success')
      setForm({ from_name: '', from_email: '', phone: '', course: '', message: '' })
    } catch (error) {
      console.error('EmailJS error:', error)
      setStatus('error')
    }
  }

  return (
    <main>

      {/* Hero */}
      <section className="bg-green-900 py-16 lg:py-20 px-5 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 -right-16 w-[280px] h-[280px] rounded-full border border-white/5" />
          <div className="absolute -top-6 -right-6 w-[180px] h-[180px] rounded-full border border-white/5" />
          <div className="absolute -bottom-20 -left-20 w-[240px] h-[240px] rounded-full border border-white/5" />
        </div>
        <div className="relative max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-wide">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
            We're Here to Help
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-3 tracking-tight leading-[1.12]">
            Contact Us
          </h1>
          <p className="text-green-200/75 text-base font-light leading-relaxed">
            Talk to our admission team. We reply within <span className="text-white font-medium">24 hours</span>.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="bg-gray-50/60 py-12 px-5">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left: contact info */}
          <div className="flex flex-col gap-4">

            {contactCards.map(card => (
              <div key={card.title} className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-green-200 hover:shadow-sm transition-all duration-200">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-700 flex-shrink-0">
                    {card.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm">{card.title}</h3>
                </div>
                <div className="flex flex-col gap-1 pl-0.5">
                  {card.lines.map(line => (
                    <p key={line} className="text-gray-400 text-sm leading-relaxed">{line}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* Office hours */}
            <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-700 flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 text-sm">Office Hours</h3>
              </div>
              <p className="text-gray-500 text-sm">Mon – Sat: <span className="font-semibold text-gray-700">10:00 AM – 5:00 PM</span></p>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/917218315876"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-green-700 hover:bg-green-800 active:scale-95 text-white font-bold text-sm px-6 py-4 rounded-2xl transition-all shadow-sm shadow-green-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.842L.057 23.854a.75.75 0 00.906.902l5.934-1.55A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.695 9.695 0 01-4.92-1.337l-.354-.21-3.656.956.979-3.572-.23-.368A9.694 9.694 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
              </svg>
              Chat on WhatsApp
            </a>

          </div>

          {/* Right: form */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">

            {/* Success state */}
            {status === 'success' && (
              <div className="flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-5">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-2 tracking-tight">Message Sent!</h3>
                <p className="text-gray-400 text-sm max-w-xs leading-relaxed mb-7">
                  Thank you! Our team will contact you within 24 hours on your phone or email.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-sm font-semibold text-green-600 hover:text-green-800 transition-colors inline-flex items-center gap-1.5"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M19 12H5M12 5l-7 7 7 7"/>
                  </svg>
                  Send another message
                </button>
              </div>
            )}

            {/* Form */}
            {status !== 'success' && (
              <>
                <h2 className="text-lg font-extrabold text-gray-900 mb-6 tracking-tight">
                  Send Us a Message
                </h2>

                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="from_name"
                        value={form.from_name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                        Phone Number <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 00000 00000"
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1.5">Email Address</label>
                    <input
                      type="email"
                      name="from_email"
                      value={form.from_email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={inputClass}
                    />
                  </div>

                  {/* ── Course selector ── */}
                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                      Course Interested In
                    </label>
                    {/* Hidden input so EmailJS can read the value */}
                    <input type="hidden" name="course" value={form.course} />
                    <CourseSelect
                      value={form.course}
                      onChange={(val) => setForm({ ...form, course: val })}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1.5">Your Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us anything — questions, doubts, queries..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {/* Error */}
                  {status === 'error' && (
                    <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-4">
                      <svg className="text-red-500 flex-shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      <p className="text-red-600 text-sm">Something went wrong. Please try WhatsApp instead.</p>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className={`w-full inline-flex items-center justify-center gap-2 font-bold text-sm py-4 rounded-xl transition-all text-white
                      ${status === 'sending'
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-green-700 hover:bg-green-800 active:scale-[0.98] shadow-sm shadow-green-200'
                      }`}
                  >
                    {status === 'sending' ? (
                      <>
                        <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.3"/>
                          <path d="M12 3a9 9 0 019 9"/>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-300 text-center flex items-center justify-center gap-1.5">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                    </svg>
                    Your information is safe. We never share your data.
                  </p>

                </form>
              </>
            )}
          </div>
        </div>

        {/* Google Map */}
        <div className="max-w-5xl mx-auto mt-6">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-2">
              <div className="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center text-green-700">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-700">Find Us — Borivali (W), Mumbai</p>
            </div>
            <iframe
              title="Saffron5 Institute Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.0!2d72.856!3d19.228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDEzJzQxLjAiTiA3MsKwNTEnMjEuNiJF!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="280"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>

      </section>
    </main>
  )
}

export default Contact