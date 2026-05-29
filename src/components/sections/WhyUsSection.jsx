const reasons = [
  {
    icon: "🏛️",
    title: "Government Registered Trust",
    description:
      "Registered under Bombay Public Trust Act 1950. Affiliated with UN, UNICEF & UNESCO. Fully recognized and legal institution.",
    tag: "Est. 1969",
    tagColor: "bg-green-100 text-green-700",
    border: "hover:border-green-200",
    iconBg: "bg-green-100",
  },
  {
    icon: "📱",
    title: "100% Distance Learning",
    description:
      "Study from anywhere in India or abroad. Live lectures, pre-recorded videos, study materials & reference books all included.",
    tag: "Learn anywhere",
    tagColor: "bg-blue-100 text-blue-700",
    border: "hover:border-blue-200",
    iconBg: "bg-blue-100",
  },
  {
    icon: "👨‍⚕️",
    title: "Expert Doctor Mentorship",
    description:
      "Learn directly from experienced naturopath doctors with 15+ years of practice. One-on-one mentorship included.",
    tag: "15+ yrs experience",
    tagColor: "bg-amber-100 text-amber-700",
    border: "hover:border-amber-200",
    iconBg: "bg-amber-100",
  },
  {
    icon: "🌍",
    title: "Global Career Opportunities",
    description:
      "Practice in India or abroad. Work with Ministry of AYUSH, NIN, hospitals, spas, private clinics and more.",
    tag: "India & abroad",
    tagColor: "bg-purple-100 text-purple-700",
    border: "hover:border-purple-200",
    iconBg: "bg-purple-100",
  },
  {
    icon: "📜",
    title: "Guaranteed Certificate",
    description:
      "Receive an internationally recognised certificate upon completion. Certified projects and practical assessments included.",
    tag: "Internationally valid",
    tagColor: "bg-pink-100 text-pink-700",
    border: "hover:border-pink-200",
    iconBg: "bg-pink-100",
  },
  {
    icon: "💰",
    title: "Flexible Payment Options",
    description:
      "Pay by credit/debit card, internet banking, or cash. EMI options available. Affordable fees for every Indian student.",
    tag: "EMI available",
    tagColor: "bg-teal-100 text-teal-700",
    border: "hover:border-teal-200",
    iconBg: "bg-teal-100",
  },
];

function WhyUsSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wide">
            <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
            Why Choose Us
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Why Students Choose Saffron5
          </h2>
          <p className="text-gray-500 text-base max-w-lg mx-auto leading-relaxed">
            Trusted by thousands of students across India for over 55 years of
            excellence in naturopathic education.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className={`group bg-white border border-gray-100 ${reason.border} rounded-2xl p-6 hover:shadow-md transition-all duration-300 flex flex-col`}
            >
              {/* Icon + tag row */}
              <div className="flex items-start justify-between mb-5">
                <div
                  className={`w-11 h-11 ${reason.iconBg} rounded-xl flex items-center justify-center text-xl flex-shrink-0`}
                >
                  {reason.icon}
                </div>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${reason.tagColor}`}
                >
                  {reason.tag}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-bold text-gray-900 text-[15px] mb-2 leading-snug group-hover:text-green-700 transition-colors">
                {reason.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed flex-1">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom trust strip */}
        <div className="mt-14 bg-green-50 border border-green-100 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-700 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg">✦</span>
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">
                Still have questions?
              </p>
              <p className="text-gray-500 text-xs mt-0.5">
                Our advisors are available Mon–Sat, 9am–6pm IST
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/917218315876"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-green-800 active:scale-95 transition-all whitespace-nowrap shadow-sm shadow-green-200"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.842L.057 23.854a.75.75 0 00.906.902l5.934-1.55A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.695 9.695 0 01-4.92-1.337l-.354-.21-3.656.956.979-3.572-.23-.368A9.694 9.694 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
            </svg>
            Chat with Advisor
          </a>
        </div>
      </div>
    </section>
  );
}

export default WhyUsSection;
