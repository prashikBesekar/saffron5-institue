import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../data/api'

const languageLabels = {
  hindi:    '🇮🇳 HI',
  english:  '🇬🇧 EN',
  marathi:  '🟠 MR',
  gujarati: '🟡 GJ',
  other:    '🌐',
}

const gradients = [
  'from-green-800 to-emerald-600',
  'from-green-900 to-teal-700',
  'from-emerald-800 to-green-600',
  'from-teal-800 to-green-700',
  'from-green-700 to-emerald-800',
  'from-emerald-900 to-teal-600',
]

const icons = ['🌿', '💆‍♀️', '🧘', '🥗', '💊', '🏃', '🔬', '❤️', '🌱', '📝']

// ── Read time helper ───────────────────────────────────────────────────────────
const readTime = (content) => Math.max(1, Math.ceil((content?.length || 500) / 1000))

// ── Date helper ────────────────────────────────────────────────────────────────
const formatDate = (date, short = false) =>
  new Date(date).toLocaleDateString('en-IN', short
    ? { day: 'numeric', month: 'short' }
    : { day: 'numeric', month: 'long', year: 'numeric' }
  )

// ── Thumbnail — image with gradient fallback ───────────────────────────────────
function Thumbnail({ blog, index, className }) {
  const [imgError, setImgError] = useState(false)
  const gradient = gradients[index % gradients.length]
  const icon = blog.icon || icons[index % icons.length]

  if (!blog.image || imgError) {
    return (
      <div className={`${className} bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}>
        <span className="text-3xl opacity-60">{icon}</span>
      </div>
    )
  }
  return (
    <img
      src={blog.image}
      alt={blog.title}
      onError={() => setImgError(true)}
      className={`${className} object-cover flex-shrink-0`}
    />
  )
}

// ── Author chip ────────────────────────────────────────────────────────────────
function AuthorChip({ name, size = 'sm' }) {
  const initial = (name || 'S').charAt(0).toUpperCase()
  const dim = size === 'lg' ? 'w-8 h-8 text-xs' : 'w-6 h-6 text-[10px]'
  const textSize = size === 'lg' ? 'text-sm' : 'text-xs'
  return (
    <div className="flex items-center gap-2">
      <div className={`${dim} bg-green-700 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>
        {initial}
      </div>
      <span className={`${textSize} text-gray-700 font-medium`}>{name || 'Saffron5 Institute'}</span>
    </div>
  )
}

// ── Tag row — category + language + read time + views ─────────────────────────
function MetaRow({ blog, featured = false }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${featured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
        {blog.category}
      </span>
      {blog.language && blog.language !== 'english' && (
        <span className="text-xs text-gray-400">{languageLabels[blog.language]}</span>
      )}
      <span className="text-xs text-gray-400">{readTime(blog.content)} min read</span>
      <span className="text-xs text-gray-400 flex items-center gap-0.5">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
        </svg>
        {blog.views}
      </span>
      {blog.tags?.slice(0, 2).map(tag => (
        <span key={tag} className="text-xs text-gray-300">#{tag}</span>
      ))}
    </div>
  )
}

function Blog() {
  const [blogs, setBlogs] = useState([])
  const [featured, setFeatured] = useState(null)
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => { loadMeta() }, [])
  useEffect(() => { loadBlogs() }, [activeCategory, currentPage, search])

  const loadMeta = async () => {
    try {
      const data = await api('/blogs/meta/categories')
      setCategories(['All', ...(data.categories || [])])
      setTotal(data.total || 0)
    } catch { setCategories(['All']) }
  }

  const loadBlogs = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage, limit: 10,
        ...(activeCategory !== 'All' && { category: activeCategory }),
        ...(search && { search }),
      })
      const data = await api(`/blogs?${params}`)
      setBlogs(data.blogs || [])
      setTotalPages(data.pages || 1)
      setTotal(data.total || 0)
      if (currentPage === 1 && data.blogs?.length > 0) setFeatured(data.blogs[0])
    } catch { setBlogs([]) }
    finally { setLoading(false) }
  }

  const handleSearch = e => {
    e.preventDefault()
    setSearch(searchInput)
    setCurrentPage(1)
  }

  const clearSearch = () => {
    setSearch('')
    setSearchInput('')
    setCurrentPage(1)
  }

  const isFeaturedView = featured && !search && activeCategory === 'All' && currentPage === 1
  const listBlogs = isFeaturedView ? blogs.slice(1) : blogs

  return (
    <div className="min-h-screen bg-white">

      {/* ── Category + Search bar — sticky ───────────── */}
      <div className="border-b border-gray-100 sticky top-16 z-30 bg-white/95 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">

          {/* Category pills — scrollable */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar flex-1 min-w-0">
            {categories.map(cat => (
              <button key={cat}
                onClick={() => { setActiveCategory(cat); setCurrentPage(1) }}
                className={`flex-shrink-0 text-xs font-semibold px-4 py-1.5 rounded-full border transition-all
                  ${activeCategory === cat
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : 'border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex items-center gap-2 flex-shrink-0">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="Search..."
                className="border border-gray-200 rounded-xl pl-8 pr-3 py-1.5 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-all w-28 lg:w-44"
              />
            </div>
            {search && (
              <button type="button" onClick={clearSearch}
                className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors flex-shrink-0"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </form>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">

        {/* ── Featured hero ─────────────────────────────── */}
        {isFeaturedView && (
          <Link to={`/blog/${featured.slug}`}
            className="group block py-10 lg:py-14 border-b border-gray-100"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">

              {/* Text */}
              <div className="order-2 lg:order-1">
                <div className="mb-5">
                  <AuthorChip name={featured.author} size="lg" />
                </div>
                <h1 className="text-2xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-3 tracking-tight group-hover:text-green-800 transition-colors">
                  {featured.title}
                </h1>
                <p className="text-gray-400 text-base leading-relaxed mb-5 line-clamp-3">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  <MetaRow blog={featured} featured />
                </div>
                <p className="text-xs text-gray-300">{formatDate(featured.createdAt)}</p>
              </div>

              {/* Image */}
              <div className="order-1 lg:order-2 relative overflow-hidden rounded-2xl aspect-video lg:aspect-[4/3]">
                {featured.image ? (
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    onError={e => {
                      e.target.style.display = 'none'
                      e.target.nextSibling?.style && (e.target.nextSibling.style.display = 'flex')
                    }}
                  />
                ) : null}
                <div className={`w-full h-full bg-gradient-to-br ${gradients[0]} ${featured.image ? 'hidden' : 'flex'} items-center justify-center`}>
                  <span className="text-7xl opacity-30">{featured.icon || '📝'}</span>
                </div>
                {/* Featured badge */}
                <div className="absolute top-3 left-3 bg-amber-400 text-gray-900 text-[11px] font-extrabold px-3 py-1 rounded-full tracking-wide">
                  Featured
                </div>
              </div>

            </div>
          </Link>
        )}

        {/* ── Section header ────────────────────────────── */}
        {!search ? (
          <div className="py-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                {activeCategory === 'All' ? 'Latest Articles' : activeCategory}
              </p>
              <span className="text-xs text-gray-300 font-normal">({total})</span>
            </div>
          </div>
        ) : (
          <div className="py-6">
            <h2 className="text-lg font-extrabold text-gray-900 tracking-tight">
              Results for "<span className="text-green-700">{search}</span>"
            </h2>
            <p className="text-gray-400 text-sm mt-1">{total} article{total !== 1 ? 's' : ''} found</p>
          </div>
        )}

        {/* ── Blog list ─────────────────────────────────── */}
        {loading ? (
          <div className="py-24 flex flex-col items-center gap-3">
            <svg className="animate-spin text-green-600" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.2"/>
              <path d="M12 3a9 9 0 019 9"/>
            </svg>
            <p className="text-gray-400 text-sm">Loading articles...</p>
          </div>
        ) : listBlogs.length === 0 && !featured ? (
          <div className="py-24 text-center">
            <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <p className="text-gray-400 text-sm font-medium">No articles yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {listBlogs.map((blog, i) => (
              <Link key={blog._id} to={`/blog/${blog.slug}`}
                className="group flex gap-5 py-7 hover:bg-gray-50/50 rounded-xl -mx-2 px-2 transition-colors"
              >
                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2.5">
                    <AuthorChip name={blog.author} />
                    <span className="text-gray-200 text-xs">·</span>
                    <span className="text-xs text-gray-400">{formatDate(blog.createdAt, true)}</span>
                  </div>
                  <h2 className="text-base lg:text-[17px] font-bold text-gray-900 leading-snug mb-1.5 group-hover:text-green-800 transition-colors line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-3 hidden sm:block">
                    {blog.excerpt}
                  </p>
                  <MetaRow blog={blog} />
                </div>

                {/* Thumbnail */}
                <Thumbnail
                  blog={blog}
                  index={i + 1}
                  className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-300"
                />
              </Link>
            ))}
          </div>
        )}

        {/* ── Pagination ────────────────────────────────── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 py-12 border-t border-gray-100">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 disabled:opacity-30 hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              Previous
            </button>

            <span className="text-sm text-gray-400 px-2">
              {currentPage} <span className="text-gray-200">/</span> {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 disabled:opacity-30 hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              Next
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default Blog