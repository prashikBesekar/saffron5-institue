import { useState } from 'react';
import { Link } from 'react-router-dom';
import blogs from '../data/blogs';

// Collect unique categories
const allCategories = ['All', ...Array.from(new Set(blogs.map((b) => b.category)))];

// Per-category accent colors
const categoryColors = {
  All: 'bg-green-700 text-white',
  Naturopathy: 'bg-emerald-100 text-emerald-800',
  Yoga: 'bg-violet-100 text-violet-800',
  Diabetes: 'bg-rose-100 text-rose-800',
  Ayurveda: 'bg-amber-100 text-amber-800',
  Nutrition: 'bg-orange-100 text-orange-800',
  Physiotherapy: 'bg-sky-100 text-sky-800',
};

const getCategoryStyle = (cat) =>
  categoryColors[cat] || 'bg-gray-100 text-gray-700';

function Blog() {
  const featured = blogs[0];
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? blogs.slice(1)
      : blogs.slice(1).filter((b) => b.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#f8f6f1]">

      {/* ── Hero / Featured ── */}
      <div className="bg-green-900 relative overflow-hidden">

        {/* Grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        <Link to={`/blog/${featured.slug}`} className="group block">

          {/* ── Mobile hero image ── */}
          <div className="relative md:hidden h-56 overflow-hidden">
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900 via-green-900/50 to-transparent" />
            <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-amber-400 text-green-900 text-[10px] font-extrabold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full shadow">
              <span className="w-1.5 h-1.5 bg-green-900 rounded-full" />
              Featured
            </div>
          </div>

          <div className="max-w-7xl mx-auto grid md:grid-cols-2 md:min-h-[88vh]">

            {/* Left — text */}
            <div className="flex flex-col justify-center px-6 py-10 md:px-14 lg:px-20 relative z-10">

              {/* Featured badge — desktop only */}
              <div className="hidden md:flex items-center gap-1.5 bg-amber-400 text-green-900 text-[10px] font-extrabold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full w-fit mb-5 shadow">
                <span className="w-1.5 h-1.5 bg-green-900 rounded-full" />
                Featured Post
              </div>

              {/* Category label */}
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-px bg-amber-400" />
                <span className="text-amber-400 text-xs font-bold tracking-[0.2em] uppercase">
                  {featured.category}
                </span>
              </div>

              {/* Title */}
              <h1
                className="text-white font-extrabold leading-[1.08] tracking-tight mb-5"
                style={{ fontSize: 'clamp(1.7rem, 4vw, 3.25rem)' }}
              >
                {featured.title}
              </h1>

              <p className="text-green-200/70 text-base leading-relaxed mb-7 max-w-md">
                {featured.excerpt}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-green-300/60 text-sm">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                  </svg>
                  {featured.date}
                </div>
                <span className="text-green-700">·</span>
                <div className="flex items-center gap-2 text-green-300/60 text-sm">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {featured.readTime}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8">
                <span className="inline-flex items-center gap-2 text-sm font-bold text-white border border-white/20 px-5 py-2.5 rounded-full group-hover:bg-white group-hover:text-green-900 transition-all duration-300">
                  Read Article
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </div>
            </div>

            {/* Right — image desktop */}
            <div className="relative hidden md:block">
              <img
                src={featured.image}
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 group-hover:scale-[1.03] transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-green-900 via-green-900/30 to-transparent" />
            </div>

          </div>
        </Link>
      </div>

      {/* ── Sticky category filter tabs ── */}
      <div className="sticky top-0 z-30 bg-[#f8f6f1]/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 text-xs font-bold tracking-wide px-4 py-2 rounded-full transition-all duration-200
                  ${activeCategory === cat
                    ? 'bg-green-700 text-white shadow-sm'
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-green-300 hover:text-green-700'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Section header ── */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 pt-12 pb-4 flex items-end justify-between">
        <div>
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-green-700 mb-1">Latest from us</p>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            {activeCategory === 'All' ? 'All Articles' : activeCategory}
            <span className="ml-2 text-base font-semibold text-gray-400">({filtered.length})</span>
          </h2>
        </div>
        <div className="hidden sm:block w-24 h-px bg-gray-300" />
      </div>

      {/* ── Article grid ── */}
      {filtered.length === 0 ? (
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-20 text-center text-gray-400 text-sm">
          No articles in this category yet.
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-6 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((blog, i) => (
              <Link
                key={blog.id}
                to={`/blog/${blog.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-green-200 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-52 flex-shrink-0">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Post number */}
                  <div className="absolute top-3 left-3 w-8 h-8 bg-green-900/80 backdrop-blur-sm text-white text-xs font-extrabold rounded-full flex items-center justify-center">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  {/* Category badge */}
                  <div className={`absolute top-3 right-3 text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-full ${getCategoryStyle(blog.category)}`}>
                    {blog.category}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <p className="text-xs text-gray-400 mb-2">{blog.date}</p>

                  <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-green-800 transition-colors mb-2 line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1">
                    {blog.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                      {blog.readTime}
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 group-hover:gap-2 transition-all">
                      Read
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default Blog;