import { Link } from "react-router-dom";

const milestones = [
  {
    year: "1874",
    title: "Legal Foundation",
    desc: "Registered under Bombay Act No. III of 1874 — The Maharashtra Hereditary Offices Act.",
  },
  {
    year: "1969",
    title: "Institute Founded",
    desc: "Saffron Naturopath & Research Institute established in Mumbai, Maharashtra.",
  },
  {
    year: "1977",
    title: "Govt. Recognition",
    desc: "Government of Maharashtra officially recognized Naturopathy as a System of Medicine.",
  },
  {
    year: "2003",
    title: "Central Govt. Order",
    desc: "Ministry of Health, Govt. of India recognized Naturopathy practitioners to use the title of Doctor.",
  },
  {
    year: "2012",
    title: "Act Modified",
    desc: "Registration updated as per Central Government Act XXI of 1860 on 29th October 2012.",
  },
  {
    year: "2026",
    title: "10,000+ Students",
    desc: "Serving 10,000+ students across 28 states in India and abroad with 15 courses.",
  },
];

const founders = [
  {
    name: "Benedict Lust",
    role: "The Founder of Naturopathy",
    years: "Feb 3, 1872 – Sep 5, 1945",
    desc: "A German-born American who was one of the founders of naturopathic medicine in the first decades of the twentieth century.",
    color: "bg-green-600",
    initials: "BL",
  },
  {
    name: "Mahatma Gandhi",
    role: "Father of Naturopathy in India",
    years: "1869 – 1948",
    desc: "Mahatma Gandhi laid the milestone of naturopathy in India. He himself was a true follower of naturopathy throughout his complete life.",
    color: "bg-amber-600",
    initials: "MG",
  },
  {
    name: "Hippocrates",
    role: "Greek Physician",
    years: "460 BC – 370 BC",
    desc: "Hippocrates of Kos was a Greek physician of the classical period, considered one of the most outstanding figures in the history of medicine.",
    color: "bg-blue-600",
    initials: "HC",
  },
];

const objectives = [
  { icon: "🌿", text: "Educate People About The Healthy Way Of Life" },
  { icon: "🧘", text: "Understand All The Aspects Of Natural Way Of Life" },
  { icon: "💊", text: "Learn How to Cure Diseases With Nature Cure" },
  { icon: "❤️", text: "Master How to Treat Patients Like Your Family Members" },
];

const whatIsNaturopathy = [
  "Naturopathy is a drugless, non-invasive, rational and evidence-based system of medicine.",
  "It imparts treatments with natural elements based on the theory of vitality.",
  "Based on the theory of toxaemia and the theory of self-healing capacity of the body.",
  "Follows the principles of healthy living and nature cure.",
];

const studyMaterial = [
  { icon: "📚", label: "Books sent via mail" },
  { icon: "📰", label: "Articles every week" },
  { icon: "🎥", label: "Live lecture schedule — 1st to 5th every month" },
  { icon: "💻", label: "Twice a month live Zoom lectures with Doctors" },
  { icon: "📝", label: "Assignments & Presentations" },
  { icon: "💬", label: "Discussion & Doubt solving sessions" },
  { icon: "📋", label: "Online examination at year end" },
  { icon: "🎓", label: "Pre-recorded video lectures for self-study" },
];

const careerProspects = [
  "Naturopathy Physician",
  "Naturopathy Consultant",
  "Naturopathy Therapist",
  "Diet Consultant",
  "Assistant Research Officer",
  "Publication Officer",
  "Hospital Administration",
  "Spa Centre Manager",
  "Private Clinic Owner",
  "Ministry of AYUSH Officer",
  "CCRYN Research Officer",
  "NIN (National Institute of Naturopathy)",
];

function About() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-green-800 py-14 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-700 rounded-full opacity-20 translate-x-20 -translate-y-20 pointer-events-none" />
        <div className="relative max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-wide">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
            Est. 1969 · Government Registered
          </span>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-3">
            About Saffron5 Institute
          </h1>
          <p className="text-green-100 text-base">
            Saffron Naturopath & Research Institute — India's most trusted name
            in naturopathy education since 1969.
          </p>
        </div>
      </div>

      {/* Who We Are */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
              Who We Are
            </span>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
              Saffron Naturopath & Research Institute
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              An autonomous educational body registered under the
              <strong> Bombay Act No. III of 1874</strong> — The Maharashtra
              Hereditary Offices Act, as modified up to 29th October 2012 based
              on Central Government Act XXI of 1860.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              Founded under{" "}
              <strong>
                Saffron Educational & Medical Foundation REG. NO. E-34921(M)
              </strong>{" "}
              with a branch at Sambhaji Nagar. We offer 15 professional courses
              in naturopathy, yoga science and alternative medicine through 100%
              distance learning.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              All courses are offered in the{" "}
              <strong>Correspondence Model</strong> — practice according to your
              comfort zone and your own timing.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "🏛️ Govt. Registered Trust",
                "🌍 UN & UNESCO Affiliated",
                "📜 Reg. No. E-34921(M)",
                "📡 Distance Learning",
                "🏥 Branch: Sambhaji Nagar",
              ].map((badge) => (
                <span
                  key={badge}
                  className="text-xs bg-green-50 text-green-800 border border-green-100 px-3 py-1.5 rounded-full font-medium"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: "10,000+", label: "Students Enrolled", icon: "🎓" },
              { num: "55+", label: "Years of Excellence", icon: "🏛️" },
              { num: "28", label: "States Covered", icon: "🗺️" },
              { num: "15", label: "Courses Offered", icon: "📚" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-gray-50 rounded-2xl p-5 text-center border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="text-2xl font-extrabold text-green-700">
                  {s.num}
                </div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What is Naturopathy */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
              What Is Naturopathy?
            </span>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-6">
              The Science of Natural Healing
            </h2>
            <div className="flex flex-col gap-4">
              {whatIsNaturopathy.map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-green-700 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Class Objectives */}
          <div>
            <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-amber-600 rounded-full" />
              Why Be Part of Saffron Institute?
            </span>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
              Class Objectives
            </h2>
            <div className="flex flex-col gap-4">
              {objectives.map((obj, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-md transition-all"
                >
                  <span className="text-3xl">{obj.icon}</span>
                  <p className="text-gray-800 text-sm font-medium leading-relaxed">
                    {obj.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Founders of Naturopathy */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
              Founders of Naturopathy
            </span>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900">
              The Pioneers Who Built This Science
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {founders.map((f) => (
              <div
                key={f.name}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all text-center"
              >
                <div
                  className={`w-16 h-16 ${f.color} rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4`}
                >
                  {f.initials}
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-1">
                  {f.name}
                </h3>
                <p className="text-green-700 text-xs font-semibold mb-1">
                  {f.role}
                </p>
                <p className="text-gray-400 text-xs mb-3">{f.years}</p>
                <p className="text-gray-600 text-xs leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Study Material */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
              How We Teach
            </span>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900">
              Study Material & Learning Methods
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {studyMaterial.map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md hover:border-green-200 transition-all text-center"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="text-gray-700 text-xs font-medium leading-relaxed">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Career Prospects */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
              After Completing the Course
            </span>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3">
              Career Prospects
            </h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              After completion, you can start your own Naturopathy Clinic, work
              with government agencies or join hospitals and research centres.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {careerProspects.map((career) => (
              <span
                key={career}
                className="text-sm bg-green-50 text-green-800 border border-green-100 px-4 py-2.5 rounded-full font-medium hover:bg-green-100 transition-colors"
              >
                {career}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Legal Info */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
              Legal & Registration
            </span>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900">
              Our Legal Standing
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* State Govt */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
                <span>🏛️</span> State Government Resolution
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                Resolution passed by Government of Maharashtra on
                <strong> 01.02.1977</strong> — Recognition of Government of
                Maharashtra, Urban Development & Public Health Department.
              </p>
              <p className="text-gray-500 text-xs">
                Resolution No. NCR/1077/60006/PH-7, Mantralaya, Bombay-32, Dated
                1st December, 1977.
              </p>
            </div>

            {/* Central Govt */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
                <span>🇮🇳</span> Central Government Order
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                As per order No. 14015/25/96-U & H(R)(Pt) dt. 25.11.2003 issued
                by Ministry of Health Government of India —
                <strong> Naturopathy is a recognized system</strong> and
                Naturopathy practitioners can use the title of 'Doctor'.
              </p>
            </div>

            {/* Registration Details */}
            <div className="bg-green-50 rounded-2xl p-6 border border-green-100 lg:col-span-2">
              <h3 className="font-bold text-gray-900 text-base mb-5 flex items-center gap-2">
                <span>📜</span> Registration Details
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  {
                    label: "Trust Name",
                    value: "Saffron Educational & Medical Foundation",
                  },
                  { label: "Registration No.", value: "E-34921(M)" },
                  {
                    label: "Registered Under",
                    value: "Bombay Act No. III of 1874",
                  },
                  { label: "Branch", value: "Sambhaji Nagar" },
                  { label: "Head Office", value: "Mumbai, Maharashtra" },
                  { label: "Status", value: "Active & Govt. Recognized" },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
              Our Journey
            </span>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900">
              Key Milestones
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-green-100" />
            <div className="flex flex-col gap-6">
              {milestones.map((m, i) => (
                <div key={m.year} className="flex gap-6 relative">
                  <div className="w-12 h-12 bg-green-700 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 z-10 shadow">
                    {i + 1}
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-5 flex-1 border border-gray-100">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-green-700 font-extrabold text-base">
                        {m.year}
                      </span>
                      <span className="font-bold text-gray-900 text-sm">
                        {m.title}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-green-800 py-12 px-4 text-center">
        <h2 className="text-2xl font-extrabold text-white mb-3">
          Join Our Growing Family
        </h2>
        <p className="text-green-100 text-sm mb-6 max-w-md mx-auto">
          Become part of India's most trusted naturopathy institute. Your
          healing journey starts here.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/courses"
            className="bg-white text-green-800 font-bold text-sm px-7 py-3.5 rounded-full hover:bg-amber-400 hover:text-white transition-all"
          >
            Explore Courses
          </Link>
          <Link
            to="/contact"
            className="border-2 border-white/40 text-white font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-white/10 transition-all"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
