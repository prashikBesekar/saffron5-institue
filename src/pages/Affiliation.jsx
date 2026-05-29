import { Link } from 'react-router-dom'

const franchiseModels = [
  {
    icon: '🏥',
    title: 'Clinic Franchise Model',
    color: 'bg-green-50 border-green-100',
    badge: 'bg-green-100 text-green-800',
    description: 'Practice as Saffron Faculty Doctor and consult patients in these fields:',
    items: [
      'Diabetes',
      'General Health',
      'Diet Consultancy',
      'Nutrition Consultancy',
      'Detox Diet Plans',
      'Stomach Disorders & Indigestion',
      'Child Nutrition',
    ],
    benefits: [
      'Every month 2 YouTube Video Postings',
      'New Social Media Account',
      'Online Marketing Worth Rs. 10,000/- a Month',
      'Goodwill of "Saffron" Name',
      'Products @ 15-25% Discount on orders above Rs. 15,000/-',
      'Every 3-6 months camps & seminars arranged by institution',
    ],
  },
  {
    icon: '🏛️',
    title: 'Institute Franchise Model',
    color: 'bg-blue-50 border-blue-100',
    badge: 'bg-blue-100 text-blue-800',
    description: 'Provide Offline + Online Courses To Your Students:',
    items: [
      'General Health (1 Month) — ₹3,500 / ₹5,000',
      'Food & New Medicine (1 Month) — ₹3,500 / ₹5,000',
      'Diabetes & Care (1 Month) — ₹3,500 / ₹5,000',
      'Dietetics & Consultancy (3 Months) — ₹10,500 / ₹12,500',
      'Nutrition & Health Care (6 Months) — ₹17,000 / ₹19,500',
      'Diploma In Naturopathy (1 Year) — ₹33,500 / ₹36,500',
      'Diploma In Nutrition & Health D.N.H (1.5 Years) — ₹39,500 / ₹43,000',
    ],
    benefits: [
      'Bachelor\'s & Master\'s allocated after 1st year of completion',
      'Franchisee provides 30% of fees to the Institute',
      'Certification issued under Saffron Medical Foundation',
      'Admission only through registration form',
    ],
  },
  {
    icon: '📦',
    title: 'Product Franchise Model',
    color: 'bg-amber-50 border-amber-100',
    badge: 'bg-amber-100 text-amber-800',
    description: 'Distribute Saffron health and wellness products:',
    items: [
      'Beauty Products',
      'Healthy Food Products',
      'Immunity Improvement Products',
      'Natural Oils',
      'Organic Powders',
    ],
    benefits: [
      'Purchase only through Saffron Application',
      'Purchase order by Saffron4health',
      'Franchisee can take up to ₹5,000 of products inclusive of immunity, healthy food, and beauty products',
    ],
  },
]

const charges = [
  { num: '1', text: 'Security fee (Refundable): Rs. 5,000/- — Submit application on printed Letter Head to "The Director, Saffron Educational & Medical Foundation"' },
  { num: '2', text: 'Affiliation Fee: Rs. 95,500/- (One Time) OR Rs. 10,000/- Per Month. Affiliation normally granted for One Year.' },
  { num: '3', text: 'At The Time Of Finalizing The Franchisee Contract: Rs. 25,000/- As Deposit (Non-Refundable)' },
  { num: '4', text: 'Renewal of affiliation fee: Rs. 3,000/- per year' },
  { num: '5', text: 'Physical verification of institute after affiliation is provided will be done.' },
  { num: '6', text: 'If Taking Clinic Franchisee: Charge 1st Consultancy Fees as Rs. 750/- & Rs. 350/- for Follow Up as per Agreement.' },
]

const requiredDocs = [
  'Letter Of Application To "Saffron Educational & Medical Foundation" For Requirement Of Affiliation',
  '10 Photographs Of Institute/College/Campus With Students & Teachers',
  'Electricity Bill Of Last 2 To 5 Years',
  'Property Document Copy',
  'List Of Teaching & Non Teaching Faculty With Aadhaar & PAN Card Proof',
]

const necessaryDocs = [
  'Trust Deed or NGO Certificate',
  'Hospital Association Letter (if trust/NGO have own hospital, not required)',
  'Staff & Teaching Faculty Educational Documents',
  'Agreement (Rs. 100 Stamp Paper)',
  'Rent Agreement (if NGO or trust have own building, not required)',
  'One ID Proof (PAN Card or Aadhaar Card)',
  'Latest Bank Statement',
]

const infrastructure = [
  {
    icon: '🏫',
    title: 'Class Room',
    desc: 'For 25 students — minimum 225 sq. ft. with proper ventilation, whiteboard and adequate furniture.',
  },
  {
    icon: '🔬',
    title: 'Laboratory',
    desc: 'Minimum 25×20 ft. with adequate lighting. Must have BP instruments, stethoscopes, thermometers, glucometers, weighing machines and more.',
  },
  {
    icon: '💧',
    title: 'Physical Facilities',
    desc: 'Drinking water, bathrooms & separate toilets for ladies and gents.',
  },
  {
    icon: '📚',
    title: 'Library',
    desc: 'Minimum 20 books/articles/magazines related to naturopathy subjects.',
  },
  {
    icon: '🏥',
    title: 'Clinical Facilities',
    desc: 'OPD facility, dressing facility, or attachment to a reputed clinic/hospital with certification for collaboration.',
  },
  {
    icon: '👨‍🏫',
    title: 'Faculty',
    desc: 'Maximum 25 students per batch. Maximum 2 batches per course. Must have Co-ordinator, Instructor, Naturopath Doctor (part-time), Lab Assistant, Assistant and Receptionist.',
  },
]

function Affiliation() {
  return (
    <div>

      {/* Hero */}
      <div className="bg-green-800 py-14 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-700 rounded-full opacity-20 translate-x-20 -translate-y-20 pointer-events-none" />
        <div className="relative max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs px-4 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
            Join the Saffron Network
          </span>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-3">
            Affiliation & Franchise
          </h1>
          <p className="text-green-100 text-base">
            Become a part of Saffron Educational & Medical Foundation —
            Start your own clinic, institute or product franchise.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 py-12 px-4">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">

          {/* 3 Franchise Models */}
          <div>
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-3">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                Franchise Opportunities
              </span>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900">
                3 Models to Choose From
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {franchiseModels.map(model => (
                <div key={model.title} className={`rounded-2xl p-6 border ${model.color} flex flex-col`}>
                  <div className="text-4xl mb-3">{model.icon}</div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full w-fit mb-3 ${model.badge}`}>
                    {model.title}
                  </span>
                  <p className="text-gray-600 text-xs mb-3 leading-relaxed">{model.description}</p>

                  {/* Items */}
                  <div className="flex flex-col gap-1.5 mb-4 flex-1">
                    {model.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-green-600 text-xs flex-shrink-0 mt-0.5">›</span>
                        <p className="text-gray-700 text-xs leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>

                  {/* Benefits */}
                  <div className="border-t border-white/60 pt-4 mt-2">
                    <p className="text-xs font-bold text-gray-700 mb-2">Benefits:</p>
                    {model.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2 mb-1.5">
                        <span className="text-green-600 font-bold text-xs flex-shrink-0">✅</span>
                        <p className="text-gray-600 text-xs leading-relaxed">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Affiliation Charges */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <span>💰</span> Affiliation Charges
            </h2>
            <p className="text-gray-500 text-sm mb-5">
              After completing all formalities, the below charges shall be deposited by Cash or Bank Account
              in favour of <strong>Saffron Educational & Medical Foundation</strong>.
            </p>
            <div className="flex flex-col gap-3">
              {charges.map(charge => (
                <div key={charge.num} className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
                  <span className="w-7 h-7 bg-green-700 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {charge.num}
                  </span>
                  <p className="text-gray-600 text-sm leading-relaxed">{charge.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Documents Required */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Application Docs */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>📄</span> Required Documents For Application
              </h2>
              <div className="flex flex-col gap-2">
                {requiredDocs.map((doc, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="w-5 h-5 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-gray-600 text-xs leading-relaxed">{doc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-green-50 rounded-xl p-3">
                <p className="text-xs text-green-700">
                  📧 Send all documents via email to:{' '}
                  <a href="mailto:info@saffron5health.com" className="font-bold hover:underline">
                    info@saffron5health.com
                  </a>
                </p>
              </div>
            </div>

            {/* Necessary Docs */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>📋</span> Necessary Documents For Affiliation
              </h2>
              <div className="flex flex-col gap-2">
                {necessaryDocs.map((doc, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-green-600 font-bold text-xs flex-shrink-0 mt-0.5">✓</span>
                    <p className="text-gray-600 text-xs leading-relaxed">{doc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Infrastructure Requirements */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <span>🏗️</span> Basic Infrastructure Requirements
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {infrastructure.map(item => (
                <div key={item.title} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-green-800 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-extrabold text-white mb-3">
              Interested in Affiliation?
            </h2>
            <p className="text-green-100 text-sm mb-6 max-w-md mx-auto">
              Contact us today to discuss franchise opportunities and start
              your journey with Saffron Educational & Medical Foundation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://wa.me/917218315876"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-green-800 font-bold text-sm px-7 py-3.5 rounded-full hover:bg-amber-400 hover:text-white transition-all"
              >
                💬 WhatsApp Us
              </a>
              <Link
                to="/contact"
                className="border-2 border-white/40 text-white font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-white/10 transition-all"
              >
                Send Application
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Affiliation