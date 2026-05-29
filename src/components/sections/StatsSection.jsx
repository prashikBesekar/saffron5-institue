const stats = [
  {
    number: "10,000+",
    label: "Students Enrolled",
    icon: "🎓",
    desc: "Across India & abroad",
  },
  {
    number: "55+",
    label: "Years of Excellence",
    icon: "🏛️",
    desc: "Est. 1969, Mumbai",
  },
  {
    number: "28",
    label: "States Covered",
    icon: "🗺️",
    desc: "Pan-India reach",
  },
  { number: "15", label: "Courses Offered", icon: "📚", desc: "Diploma to PhD" },
];

function StatsSection() {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`
                group flex flex-col items-center justify-center py-10 px-6 text-center
                relative cursor-default select-none
                ${i < 3 ? "lg:border-r border-gray-100" : ""}
                ${i < 2 ? "border-b lg:border-b-0 border-gray-100" : ""}
              `}
            >
              {/* Hover fill */}
              <div className="absolute inset-2 rounded-2xl bg-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center">
                <span className="text-2xl mb-3">{stat.icon}</span>
                <span className="text-3xl lg:text-4xl font-extrabold text-green-700 tracking-tight leading-none">
                  {stat.number}
                </span>
                <span className="text-sm font-semibold text-gray-700 mt-2">
                  {stat.label}
                </span>
                <span className="text-xs text-gray-400 mt-1">{stat.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
