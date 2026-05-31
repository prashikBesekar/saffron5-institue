import { useState } from "react";
import { Link } from "react-router-dom";
import courses from "../data/courses";

const courseStyles = [
  { bg: "bg-green-50", icon: "🌿", badge: "bg-green-100 text-green-800" },
  { bg: "bg-blue-50", icon: "🎓", badge: "bg-blue-100 text-blue-800" },
  { bg: "bg-purple-50", icon: "🔬", badge: "bg-purple-100 text-purple-800" },
  { bg: "bg-amber-50", icon: "📖", badge: "bg-amber-100 text-amber-800" },
  { bg: "bg-pink-50", icon: "🧘", badge: "bg-pink-100 text-pink-800" },
  { bg: "bg-teal-50", icon: "💊", badge: "bg-teal-100 text-teal-800" },
  { bg: "bg-red-50", icon: "🩺", badge: "bg-red-100 text-red-800" },
  { bg: "bg-indigo-50", icon: "🧪", badge: "bg-indigo-100 text-indigo-800" },
  { bg: "bg-orange-50", icon: "🏃", badge: "bg-orange-100 text-orange-800" },
];

const filters = ["All", "1 Year", "2 Years", "3 Years", "4.5 Years"];

function Courses() {
  const [active, setActive] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered =
    active === "All" ? courses : courses.filter((c) => c.duration === active);

  return (
    <div>
      {/* Page Hero */}
      <div className="bg-green-800 py-14 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-700 rounded-full opacity-20 translate-x-20 -translate-y-20 pointer-events-none" />
        <div className="relative max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs px-4 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
            Distance Learning · Study From Anywhere
          </span>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-3">
            Our Naturopathy Programs
          </h1>
          <p className="text-green-100 text-base">
            Choose from {courses.length} professionally designed courses in naturopathy, yoga &
            alternative medicine.
          </p>
        </div>
      </div>

      {/* Filter Bar - Desktop */}
      <div className="hidden md:block bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto">
          <span className="text-xs text-gray-400 font-medium mr-1 flex-shrink-0">
            Filter by duration:
          </span>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`flex-shrink-0 text-xs font-semibold px-4 py-2 rounded-full transition-all ${
                active === f
                  ? "bg-green-700 text-white shadow"
                  : "bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-700"
              }`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto text-xs text-gray-400 flex-shrink-0">
            {filtered.length} course{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Filter Bar - Mobile */}
      <div className="md:hidden bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="px-4 py-3">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors"
          >
            <span>
              🔽 {active === "All" ? "All Courses" : `${active} Duration`}
            </span>
            <span className="text-xs bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full">
              {filtered.length}
            </span>
          </button>

          {/* Mobile Filter Dropdown */}
          {filterOpen && (
            <div className="mt-2 flex flex-col gap-1 bg-gray-50 rounded-xl p-2 border border-gray-100">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    setActive(f);
                    setFilterOpen(false);
                  }}
                  className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    active === f
                      ? "bg-green-700 text-white shadow"
                      : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-gray-500 text-base mb-4">
                No courses found for {active} duration.
              </p>
              <button
                onClick={() => {
                  setActive("All");
                  setFilterOpen(false);
                }}
                className="text-green-600 font-semibold text-sm hover:underline"
              >
                Clear filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filtered.map((course, index) => {
                const style = courseStyles[index % courseStyles.length];
                return (
                  <Link
                    key={course.id}
                    to={`/courses/${course.slug}`}
                    className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 hover:border-green-300 hover:shadow-lg transition-all duration-300 group flex flex-col"
                  >
                    {/* Icon */}
                    <div
                      className={`w-14 h-14 ${style.bg} rounded-2xl flex items-center justify-center text-3xl mb-4 sm:mb-5`}
                    >
                      {style.icon}
                    </div>

                    {/* Title */}
                    <h2 className="font-bold text-gray-900 text-sm sm:text-base mb-2 group-hover:text-green-700 transition-colors leading-snug">
                      {course.title}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5 flex-1">
                      {course.description}
                    </p>

                    {/* Details */}
                    <div className="flex flex-col gap-1.5 sm:gap-2 mb-4 sm:mb-5 pt-4 border-t border-gray-50">
                      {[
                        { label: "⏱ Duration", value: course.duration },
                        { label: "📡 Mode", value: course.mode },
                        { label: "🎯 Eligibility", value: course.eligibility },
                      ].map((detail) => (
                        <div
                          key={detail.label}
                          className="flex items-center justify-between text-xs"
                        >
                          <span className="text-gray-400">{detail.label}</span>
                          <span className="font-semibold text-gray-700">
                            {detail.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                      <span
                        className={`text-xs font-bold px-3 py-1.5 rounded-full ${style.badge}`}
                      >
                        {course.duration}
                      </span>
                      <span className="text-green-600 font-bold text-xs sm:text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        View →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="bg-green-800 py-10 sm:py-12 px-4 text-center">
        <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2 sm:mb-3">
          Not sure which course to pick?
        </h2>
        <p className="text-green-100 text-xs sm:text-sm mb-5 sm:mb-6 max-w-md mx-auto">
          Talk to our admission team and we'll help you choose the right
          program.
        </p>
        <a
          href="https://wa.me/917219051876"
          target="_blank"
          rel="noopener noreferrer"
         className="inline-flex items-center gap-2 bg-white text-green-800 font-bold text-xs sm:text-sm px-5 sm:px-7 py-3 sm:py-3.5 rounded-full hover:bg-amber-400 hover:text-white transition-all"
        >
          💬 Chat With Us on WhatsApp
        </a>
      </div>
    </div>
  );
}

export default Courses;