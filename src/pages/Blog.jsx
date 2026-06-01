import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../data/api'

const languageLabels = {
  hindi: '🇮🇳 HI',
  english: '🇬🇧 EN',
  marathi: '🟠 MR',
  gujarati: '🟡 GJ',
  other: '🌐',
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

function CoverImage({ blog, index, className }) {
  if (blog.image) {
    return (
      <img
        src={blog.image}
        alt={blog.title}
        className={`${className} object-cover`}
        onError={e => {
          e.target.style.display = 'none'
          e.target.nextSibling.style.display = 'flex'
        }}
      />
    )
  }
  return (
    <div className={`${className} bg-gradient-to-br ${gradients[index % gradients.length]} flex flex-col items-center justify-center`}>
      <span className="text-5xl mb-2 opacity-80">{blog.icon || icons[index % icons.length]}</span>
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

  useEffect(() => {
    loadMeta()
  }, [])

  useEffect(() => {
    loadBlogs()
  }, [activeCategory, currentPage, search])

  const loadMeta = async () => {
    try {
      const data = await api('/blogs/meta/categories')
      setCategories(['All', ...(data.categories || [])])
      setTotal(data.total || 0)
    } catch {
      setCategories(['All'])
    }
  }

  const loadBlogs = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
        ...(activeCategory !== 'All' && { category: activeCategory }),
        ...(search && { search }),
      })
      const data = await api(`/blogs?${params}`)
      setBlogs(data.blogs || [])
      setTotalPages(data.pages || 1)
      setTotal(data.total || 0)
      if (currentPage === 1 && data.blogs?.length > 0) {
        setFeatured(data.blogs[0])
      }
    } catch {
      setBlogs([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = e => {
    e.preventDefault()
    setSearch(searchInput)
    setCurrentPage(1)
  }

  const listBlogs = featured && currentPage === 1 && !search && activeCategory === 'All'
    ? blogs.slice(1)
    : blogs

  return (
    <div className="min-h-screen bg-white">

      {/* Top bar — Medium style */}
      <div className="border-b border-gray-100 sticky top-16 z-30 bg-white/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setCurrentPage(1) }}
                className={`flex-shrink-0 text-xs font-medium px-4 py-1.5 rounded-full border transition-all
                  ${activeCategory === cat
                    ? 'border-gray-900 text-gray-900 bg-gray-900 text-white'
                    : 'border-gray-200 text-gray-500 hover:border-gray-400'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex gap-2 flex-shrink-0">
            <input
              type="text"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Search..."
              className="border border-gray-200 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:border-gray-400 w-36 lg:w-48"
            />
            {search && (
              <button
                type="button"
                onClick={() => { setSearch(''); setSearchInput(''); setCurrentPage(1) }}
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </form>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">

        {/* Featured — Medium hero style */}
        {featured && !search && activeCategory === 'All' && currentPage === 1 && (
          <Link
            to={`/blog/${featured.slug}`}
            className="group block py-12 border-b border-gray-100"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

              {/* Text side */}
              <div>
                {/* Author */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 bg-green-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {(featured.author || 'S').charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-gray-700 font-medium">
                    {featured.author || 'Saffron5 Institute'}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-3 group-hover:text-green-800 transition-colors">
                  {featured.title}
                </h1>

                {/* Excerpt */}
                <p className="text-gray-500 text-lg leading-relaxed mb-6 line-clamp-3">
                  {featured.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs font-bold bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    {featured.category}
                  </span>
                  {featured.language && featured.language !== 'english' && (
                    <span className="text-xs text-gray-400">
                      {languageLabels[featured.language]}
                    </span>
                  )}
                  <span className="text-xs text-gray-400">
                    {new Date(featured.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'long', year: 'numeric'
                    })}
                  </span>
                  <span className="text-xs text-gray-400">
                    · {Math.max(1, Math.ceil((featured.content?.length || 500) / 1000))} min read
                  </span>
                  <span className="text-xs text-gray-400">· 👁 {featured.views}</span>
                </div>
              </div>

              {/* Image side */}
              <div className="relative overflow-hidden rounded-2xl aspect-video lg:aspect-square">
                {featured.image ? (
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${gradients[0]} flex items-center justify-center`}>
                    <span className="text-8xl opacity-40">{featured.icon || '📝'}</span>
                  </div>
                )}
                {/* Featured badge */}
                <div className="absolute top-4 left-4 bg-amber-400 text-gray-900 text-xs font-extrabold px-3 py-1.5 rounded-full">
                  Featured
                </div>
              </div>

            </div>
          </Link>
        )}

        {/* Section header */}
        {!search && (
          <div className="py-8 flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
              {activeCategory === 'All' ? 'Latest Articles' : activeCategory}
              <span className="ml-2 normal-case font-normal">({total})</span>
            </h2>
          </div>
        )}

        {search && (
          <div className="py-6">
            <h2 className="text-xl font-bold text-gray-900">
              Results for "<span className="text-green-700">{search}</span>"
            </h2>
            <p className="text-gray-400 text-sm mt-1">{total} articles found</p>
          </div>
        )}

        {/* Blog List — Medium style */}
        {loading ? (
          <div className="py-20 flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-green-200 border-t-green-700 rounded-full animate-spin" />
            <p className="text-gray-400 text-sm">Loading articles...</p>
          </div>
        ) : listBlogs.length === 0 && !featured ? (
          <div className="py-20 text-center">
            <p className="text-5xl mb-4">📭</p>
            <p className="text-gray-500">No articles yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {listBlogs.map((blog, i) => (
              <Link
                key={blog._id}
                to={`/blog/${blog.slug}`}
                className="group flex gap-6 py-8 hover:bg-gray-50/50 rounded-xl -mx-2 px-2 transition-colors"
              >
                {/* Left — text */}
                <div className="flex-1 min-w-0">

                  {/* Author + date */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-green-700 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                      {(blog.author || 'S').charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs text-gray-600 font-medium">
                      {blog.author || 'Saffron5 Institute'}
                    </span>
                    <span className="text-gray-300 text-xs">·</span>
                    <span className="text-xs text-gray-400">
                      {new Date(blog.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short'
                      })}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-base lg:text-lg font-bold text-gray-900 leading-snug mb-2 group-hover:text-green-800 transition-colors line-clamp-2">
                    {blog.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
                    {blog.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                      {blog.category}
                    </span>
                    {blog.language && blog.language !== 'english' && (
                      <span className="text-xs text-gray-400">
                        {languageLabels[blog.language]}
                      </span>
                    )}
                    <span className="text-xs text-gray-400">
                      {Math.max(1, Math.ceil((blog.content?.length || 500) / 1000))} min read
                    </span>
                    <span className="text-xs text-gray-400">· 👁 {blog.views}</span>

                    {/* Tags */}
                    {blog.tags?.slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs text-gray-400">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right — thumbnail */}
                <div className="flex-shrink-0 w-24 h-24 lg:w-32 lg:h-32 rounded-xl overflow-hidden">
                  {blog.image ? (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={e => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                      }}
                    />
                  ) : null}
                  <div
                    className={`w-full h-full bg-gradient-to-br ${gradients[(i + 1) % gradients.length]} ${blog.image ? 'hidden' : 'flex'} items-center justify-center`}
                  >
                    <span className="text-3xl opacity-70">
                      {blog.icon || icons[i % icons.length]}
                    </span>
                  </div>
                </div>

              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 py-12 border-t border-gray-100">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-5 py-2 rounded-full text-sm font-medium border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              ← Previous
            </button>
            <span className="text-sm text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-5 py-2 rounded-full text-sm font-medium border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              Next →
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default Blog