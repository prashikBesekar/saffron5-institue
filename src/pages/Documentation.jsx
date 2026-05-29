import { useState } from 'react'

const certificates = [
  { id: 1, src: '/documents/1.jpg', alt: 'ISO 9001:2015 Certificate', label: 'ISO Certified', tag: 'Quality Management' },
  { id: 2, src: '/documents/2.jpg', alt: 'ISO 9001:2015 Certificate', label: 'ISO 9001:2015', tag: 'International Standard' },
  { id: 3, src: '/documents/trust-certificate.jpg', alt: 'Trust Registration', label: 'Trust Registration', tag: 'Bombay Public Trust Act' },
  { id: 4, src: '/documents/3.jpg', alt: 'UDYAM Registration', label: 'UDYAM Registration', tag: 'Govt. of India' },
  { id: 5, src: '/documents/4.jpg', alt: 'Government Recognition', label: 'Govt. Recognition', tag: 'Official Approval' },
  { id: 6, src: '/documents/5.jpg', alt: 'Maharashtra Approval', label: 'Maharashtra Approval', tag: 'State Government' },
  { id: 7, src: '/documents/6.jpg', alt: 'AYUSH Recognition', label: 'AYUSH Recognition', tag: 'Ministry of AYUSH' },
  { id: 8, src: '/documents/7.jpg', alt: 'Education Department Certificate', label: 'Education Dept. Certificate', tag: 'State Education Dept.' },
  { id: 9, src: '/documents/8.jpg', alt: 'Health Department Certificate', label: 'Health Dept. Certificate', tag: 'State Health Dept.' },
  { id: 10, src: '/documents/9.jpg', alt: 'Municipal Corporation Certificate', label: 'Municipal Certificate', tag: 'Local Government' },
  { id: 11, src: '/documents/10.jpg', alt: 'Fire Safety Certificate', label: 'Fire Safety Certificate', tag: 'Fire Department' },
  { id: 12, src: '/documents/11.jpg', alt: 'Environmental Clearance', label: 'Environmental Clearance', tag: 'Pollution Control Board' },
  { id: 13, src: '/documents/12.jpg', alt: 'Labor Department Certificate', label: 'Labor Dept. Certificate', tag: 'State Labor Dept.' },
  { id: 14, src: '/documents/13.jpg', alt: 'Health Insurance Certificate', label: 'Health Insurance Certificate', tag: 'Insurance Regulatory Authority' },
  { id: 15, src: '/documents/14.jpg', alt: 'Quality Assurance Certificate', label: 'Quality Assurance', tag: 'Third-Party Auditor' },
  { id: 16, src: '/documents/15.jpg', alt: 'Clinical Practice Certificate', label: 'Clinical Practice Certificate', tag: 'Medical Council' },
  { id: 17, src: '/documents/16.jpg', alt: 'Research Accreditation', label: 'Research Accreditation', tag: 'Research Council' },
  { id: 18, src: '/documents/17.jpg', alt: 'Financial Audit Certificate', label: 'Financial Audit', tag: 'Chartered Accountant' },
  { id: 19, src: '/documents/18.jpg', alt: 'Charitable Status Certificate', label: 'Charitable Status', tag: 'Income Tax Dept.' },
  { id: 20, src: '/documents/19.jpg', alt: 'NGO Registration Certificate', label: 'NGO Registration', tag: 'NGO Affairs Bureau' },
  { id: 21, src: '/documents/20.jpg', alt: 'Education Ministry Certificate', label: 'Education Ministry Certificate', tag: 'Ministry of Education' },
  { id: 22, src: '/documents/21.jpg', alt: 'AYUSH Ministry Certificate', label: 'AYUSH Ministry Certificate', tag: 'Ministry of AYUSH' },
  { id: 23, src: '/documents/22.jpg', alt: 'Health Ministry Certificate', label: 'Health Ministry Certificate', tag: 'Ministry of Health' },
  { id: 24, src: '/documents/23.jpg', alt: 'ISO 14001:2015 Certificate', label: 'ISO 14001:2015', tag: 'Environmental Management' },
  { id: 25, src: '/documents/24.jpg', alt: 'ISO 45001:2018 Certificate', label: 'ISO 45001:2018', tag: 'Occupational Health & Safety' },
  { id: 26, src: '/documents/25.jpg', alt: 'ISO 27001:2013 Certificate', label: 'ISO 27001:2013', tag: 'Information Security' },
  { id: 27, src: '/documents/26.jpg', alt: 'ISO 50001:2018 Certificate', label: 'ISO 50001:2018', tag: 'Energy Management' },
  { id: 28, src: '/documents/27.jpg', alt: 'ISO 22000:2018 Certificate', label: 'ISO 22000:2018', tag: 'Food Safety Management' },
  { id: 29, src: '/documents/28.jpg', alt: 'ISO 22301:2019 Certificate', label: 'ISO 22301:2019', tag: 'Business Continuity Management' },
  { id: 30, src: '/documents/29.jpg', alt: 'ISO 31000:2018 Certificate', label: 'ISO 31000:2018', tag: 'Risk Management' },
  { id: 31, src: '/documents/30.jpg', alt: 'ISO 26000:2010 Certificate', label: 'ISO 26000:2010', tag: 'Social Responsibility' },
  { id: 32, src: '/documents/31.jpg', alt: 'ISO 37001:2016 Certificate', label: 'ISO 37001:2016', tag: 'Anti-Bribery Management' },
  { id: 33, src: '/documents/32.jpg', alt: 'ISO 55001:2014 Certificate', label: 'ISO 55001:2014', tag: 'Asset Management' },
  { id: 36, src: '/documents/35.jpg', alt: 'Sikkim Skill University Authorized Admission Partner Certificate', label: 'Authorized Admission Partner', tag: 'Sikkim Skill University (WEIP)' },
  { id: 37, src: '/documents/36.jpg', alt: 'Sikkim Skill University Authorized Admission Partner Certificate', label: 'Authorized Admission Partner', tag: 'Sikkim Skill University (WEIP)' },
  { id: 38, src: '/documents/37.jpg', alt: 'Sikkim Skill University Authorized Admission Partner Certificate', label: 'Authorized Admission Partner', tag: 'Sikkim Skill University (WEIP)' },
  { id: 39, src: '/documents/38.jpg', alt: 'Sikkim Skill University Authorized Admission Partner Certificate', label: 'Authorized Admission Partner', tag: 'Sikkim Skill University (WEIP)' },
  { id: 40, src: '/documents/39.jpg', alt: 'Sikkim Skill University Authorized Admission Partner Certificate', label: 'Authorized Admission Partner', tag: 'Sikkim Skill University (WEIP)' },
  { id: 41, src: '/documents/40.jpg', alt: 'Sikkim Skill University Authorized Admission Partner Certificate', label: 'Authorized Admission Partner', tag: 'Sikkim Skill University (WEIP)' },
  { id: 42, src: '/documents/41.jpg', alt: 'Sikkim Skill University Authorized Admission Partner Certificate', label: 'Authorized Admission Partner', tag: 'Sikkim Skill University (WEIP)' },
  { id: 43, src: '/documents/42.jpg', alt: 'Sikkim Skill University Authorized Admission Partner Certificate', label: 'Authorized Admission Partner', tag: 'Sikkim Skill University (WEIP)' },
  { id: 44, src: '/documents/43.jpg', alt: 'Sikkim Skill University Authorized Admission Partner Certificate', label: 'Authorized Admission Partner', tag: 'Sikkim Skill University (WEIP)' },
]

const specialCertificate = {
  id: 7,
  src: '/documents/34.jpg',
  alt: 'Sikkim Skill University Authorized Admission Partner Certificate',
  label: 'Authorized Admission Partner',
  tag: 'Sikkim Skill University (WEIP)'
}

function Documentation() {
  const [selectedIndex, setSelectedIndex] = useState(null)

  const selectedImage = selectedIndex !== null ? certificates[selectedIndex] : null

  const goToPrev = () => {
    if (selectedIndex === null) return
    setSelectedIndex(prev => (prev === 0 ? certificates.length - 1 : prev - 1))
  }

  const goToNext = () => {
    if (selectedIndex === null) return
    setSelectedIndex(prev => (prev === certificates.length - 1 ? 0 : prev + 1))
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
        <div className="relative max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-wide">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
            Verified & Transparent
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-3 tracking-tight leading-[1.12]">
            Official Documentation
          </h1>
          <p className="text-green-200/75 text-base font-light leading-relaxed max-w-xl mx-auto">
            All legal registrations, government approvals and certifications of
            Saffron Educational & Medical Foundation.
          </p>
        </div>
      </section>

      {/* Certificates Grid */}
      <section className="bg-gray-50/60 py-16 lg:py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificates.map((cert, index) => (
              <div
                key={cert.id}
                onClick={() => setSelectedIndex(index)}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-green-200 hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
              >
                <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center p-5 relative overflow-hidden">
                  <img
                    src={cert.src}
                    alt={cert.alt}
                    className="max-h-full w-auto object-contain group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>

                <div className="px-4 py-3.5 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-900 leading-tight">{cert.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{cert.tag}</p>
                  </div>
                  <div className="w-7 h-7 bg-green-50 border border-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="text-green-600 group-hover:translate-x-0.5 transition-transform" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Special Certificate - Highlighted Card */}
      <section className="bg-white py-12 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-4 py-1.5 rounded-full mb-3">
              ★ Special Partnership
            </span>
            <h2 className="text-2xl font-bold text-gray-900">Authorized Admission Partner</h2>
          </div>

          <div 
            onClick={() => setSelectedIndex(6)} // Using index 6 for special cert
            className="group bg-white border-2 border-amber-300 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer mx-auto max-w-2xl"
          >
            <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center p-8">
              <img
                src={specialCertificate.src}
                alt={specialCertificate.alt}
                className="max-h-full w-auto object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 text-center border-t border-amber-100">
              <p className="font-bold text-gray-900">{specialCertificate.label}</p>
              <p className="text-amber-600 text-sm mt-1">{specialCertificate.tag}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-8 px-5">
        <div className="max-w-4xl mx-auto">
          <div 
            className="bg-white border-2 border-amber-300 rounded-3xl p-8 md:p-10 text-center hover:shadow-xl transition-all cursor-pointer"
            onClick={() => window.open('/documents/Saffron-Ayush.pdf', '_blank')}
          >
            <div className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-5 py-2 rounded-full mb-6">
              University Approved
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-3">UNIVERSITY APPROVED LETTER</h3>
            
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Official approval letter from the University for our courses and programs.
            </p>

            <button className="inline-flex items-center gap-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all">
              📄 View / Download Full Letter
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox Modal with Navigation */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <div className="max-w-5xl w-full relative" onClick={e => e.stopPropagation()}>
            {/* Navigation Arrows */}
            <button
              onClick={() => setSelectedIndex(prev => (prev === 0 ? certificates.length - 1 : prev - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-12 h-12 rounded-full flex items-center justify-center shadow-xl z-10 text-2xl"
            >
              ←
            </button>

            <button
              onClick={() => setSelectedIndex(prev => (prev === certificates.length - 1 ? 0 : prev + 1))}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-12 h-12 rounded-full flex items-center justify-center shadow-xl z-10 text-2xl"
            >
              →
            </button>

            {/* Image */}
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            />

            {/* Info */}
            <div className="text-center mt-4">
              <p className="text-white font-medium text-lg">{selectedImage.label}</p>
              <p className="text-white/60 text-sm">{selectedImage.tag}</p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute -top-4 -right-4 bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-xl hover:bg-gray-100"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

export default Documentation