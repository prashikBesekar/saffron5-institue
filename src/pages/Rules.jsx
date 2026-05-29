import { useState } from 'react'
import { Link } from 'react-router-dom'

function AccordionItem({ title, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-bold text-gray-800 text-sm">{title}</span>
        <span className={`text-green-600 text-xl flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-gray-50 pt-4">
          {children}
        </div>
      )}
    </div>
  )
}

function Rules() {
  return (
    <div>

      {/* Hero */}
      <div className="bg-green-800 py-14 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-700 rounded-full opacity-20 translate-x-20 -translate-y-20 pointer-events-none" />
        <div className="relative max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs px-4 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
            Important Guidelines
          </span>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-3">
            Rules & Regulations
          </h1>
          <p className="text-green-100 text-base">
            Terms & Conditions — Please read carefully before enrolling
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">

          {/* Rules & Regulations */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <span>📋</span> Rules & Regulations / Terms & Conditions
            </h2>
            <div className="flex flex-col gap-3">
              {[
                { num: '1', text: 'Once The Registration Is Made By The Student, They Are Required To Make The Admission Within 24 to 48 hours.' },
                { num: '2', text: 'After The Admission, All The Study Material Will Be Provided To The Student Via Email.' },
                { num: '3', text: 'After Admission, Payment Made By The Student Will Not Be Refunded Under Any Circumstances.' },
                { num: '4', text: 'If Student Fails To Make The Installment Payment In Time, The Institute Has the Rights To Charge Them With Rs. 2,000/- As a Penalty Every Month.' },
                { num: '5', text: 'Violation Of Any Rules & Regulation Set By The Institute Will Result In Suspension Of The Student.' },
                { num: '6', text: 'If Student Tries To Create Problem For Institute, Strict Legal Action Will Also Be Taken Against Them In The Court Of Legal Law.' },
                { num: '7', text: 'Once The Payment For The Specific Course Is Done, If The Student Is Required To Cancel The Course, No Refund From The Institute Will Be Given.', bold: true },
                { num: '8', text: 'If Student Fails To Give The Examination On Time, Institution Will Charge For Re-examination. (Re-examination Charges = Rs. 4,300/- Only).' },
                { num: '9', text: 'One Can Only Appear For The Examination Within 1 Year Of the Time Period Of Course. Once The Time Period Is Over, Institution Will Not Allow the Student To Give the Examination.' },
                { num: '10', text: 'If Student Fails To Collect The Certificate On Time From The Given Branch, The Institute Will Not Hold One\'s Certificate For More Than 1 Month.' },
                { num: '11', text: 'In The Distance Learning Format, No Type Of Score Card Or Marksheet Will Be Provided To the Student.' },
                { num: '12', text: 'If an Identity Card is required, the Student Would have To Make The Extra Payment Of Rs. 950/- plus delivery charges to the Institute.' },
              ].map(rule => (
                <div key={rule.num} className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
                  <span className="w-7 h-7 bg-green-700 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {rule.num}
                  </span>
                  <p className={`text-sm leading-relaxed ${rule.bold ? 'font-bold text-gray-900' : 'text-gray-600'}`}>
                    {rule.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Hard Copy Material Fees */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
              <span>📚</span> Hard Copy Study Material Fees
            </h2>
            <p className="text-gray-500 text-sm mb-5">
              If the Student Requires The Hard Copy Of The Material, They Are Required To Make An Extra Payment.
              Study Material Available In: <strong>Hindi, English & Gujarati</strong>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { course: 'Diploma In Naturopathy (N.D.)', fee: '₹2,850/-', detail: '3 Books + Assignments' },
                { course: "Bachelor's In Alternative System Of Medicine (B.A.S.M.)", fee: '₹3,350/-', detail: '4 Books + Assignments' },
                { course: "Doctor's Of Medicine (M.D.)", fee: '₹3,850/-', detail: '5 Books + Assignments' },
                { course: 'Specialised Study Of PhD In Naturopathy', fee: '₹4,250/-', detail: '6 Books + Assignments' },
              ].map(item => (
                <div key={item.course} className="bg-green-50 border border-green-100 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-700 mb-1">{item.course}</p>
                  <p className="text-xl font-extrabold text-green-700">{item.fee}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Options */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <span>💳</span> Payment Options
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <p className="text-xs font-bold text-blue-700 mb-1">Option 1</p>
                <p className="font-bold text-gray-900 text-sm">One Time Payment</p>
                <p className="text-xs text-gray-500 mt-1">Get Rs. 3,000/- discount if paid at once</p>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                <p className="text-xs font-bold text-amber-700 mb-1">Option 2</p>
                <p className="font-bold text-gray-900 text-sm">4 Installments</p>
                <p className="text-xs text-gray-500 mt-1">4 months from date of first payment</p>
              </div>
              <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
                <p className="text-xs font-bold text-purple-700 mb-1">Option 3</p>
                <p className="font-bold text-gray-900 text-sm">EMI Options</p>
                <p className="text-xs text-gray-500 mt-1">6 to 16 months via installment</p>
              </div>
            </div>

            {/* EMI Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500">EMI Duration</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500">Interest Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { duration: '6 Month Installment', interest: '8% on actual fees' },
                    { duration: '8 Month Installment', interest: '10% on actual fees' },
                    { duration: '12 Month Installment', interest: '14% on actual fees' },
                    { duration: '16 Month Installment', interest: '18% on actual fees' },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">{row.duration}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{row.interest}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Privacy Policy */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <span>🔒</span> Privacy Policy
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3 bg-green-50 rounded-xl p-4">
                <span className="text-green-600 font-bold text-base flex-shrink-0">✅</span>
                <p className="text-gray-700 text-sm leading-relaxed">
                  The Institute Will Not Share Any Private Details Of The Student With Any Outside Party
                  — including Name, Contact Number, Email Address or Location.
                </p>
              </div>
              <div className="flex items-start gap-3 bg-amber-50 rounded-xl p-4">
                <span className="text-amber-500 text-base flex-shrink-0">⚠️</span>
                <p className="text-gray-700 text-sm leading-relaxed">
                  After The Completion Of Courses, Candidates Can Apply For Jobs For Which The Institution
                  Does Not Take Any Responsibility, Nor Do We Provide Any Assurance For Government Jobs.
                  Practitioners Can Only Be Eligible According To Their Skill Sets & Experience.
                </p>
              </div>
            </div>
          </div>

          {/* Cancellation & Refund */}
          <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
            <h2 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
              <span>❌</span> Cancellation & Refund Policy
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <span className="text-red-500 flex-shrink-0 font-bold">❌</span>
                <p className="text-red-700 text-sm leading-relaxed">
                  <strong>No Refund</strong> after registration of candidate — neither of Course Fees
                  nor for the Registration Form fees.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-500 flex-shrink-0 font-bold">❌</span>
                <p className="text-red-700 text-sm leading-relaxed">
                  Once Dispatched, No Refund Or Sales Return Is Allowed For Study Materials & Products.
                </p>
              </div>
            </div>
          </div>

          {/* Shipping */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>📦</span> Shipping & Study Materials
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              All digital study materials are provided via email after admission.
              Hard copy books are dispatched to the student's registered address.
              Once dispatched, no refund or exchange is allowed on study materials.
            </p>
          </div>

          {/* Contact CTA */}
          <div className="bg-green-800 rounded-2xl p-6 text-center">
            <h2 className="text-xl font-bold text-white mb-2">
              Have Questions About These Rules?
            </h2>
            <p className="text-green-100 text-sm mb-5">
              Our team is happy to clarify any terms before you enroll.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://wa.me/917218315876"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-green-800 font-bold text-sm px-6 py-3 rounded-full hover:bg-amber-400 hover:text-white transition-all"
              >
                💬 Ask on WhatsApp
              </a>
              <Link
                to="/contact"
                className="border-2 border-white/40 text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-white/10 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Rules