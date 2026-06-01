import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../data/api'

const gradients = [
  'from-green-800 to-emerald-600',
  'from-green-900 to-teal-700',
  'from-emerald-800 to-green-600',
]

const languageLabels = {
  hindi: '🇮🇳 Hindi',
  english: '🇬🇧 English',
  marathi: '🟠 Marathi',
  gujarati: '🟡 Gujarati',
  other: '🌐 Other',
}

function BlogDetail() {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [progress, setProgress] = useState(0)
  const [copied, setCopied] = useState(false)
  const [clapped, setClapped] = useState(false)
  const [claps, setClaps] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
    loadBlog()
  }, [slug])

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const loadBlog = async () => {
    try {
      setLoading(true)
      setNotFound(false)
      const data = await api(`/blogs/${slug}`)
      setBlog(data.blog)
      setClaps(Math.floor(Math.random() * 500) + 50)

      const relatedData = await api(`/blogs?category=${data.blog.category}&limit=4`)
      setRelated((relatedData.blogs || []).filter(b => b.slug !== slug).slice(0, 3))
    } catch {
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const handleClap = () => {
    setClapped(true)
    setClaps(c => c + 1)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-green-200 border-t-green-700 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-sm">Loading article...</p>
        </div>
      </div>
    )
  }

  if (notFound || !blog) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
        <p className="text-6xl mb-4">😕</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Article Not Found</h1>
        <Link to="/blog" className="bg-green-700 text-white font-bold px-6 py-3 rounded-full hover:bg-green-800 transition-colors mt-4">
          ← Back to Blog
        </Link>
      </div>
    )
  }

  const readTime = Math.max(1, Math.ceil((blog.content?.length || 500) / 1000))

  return (
    <div className="bg-white min-h-screen">

      {/* Reading progress */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-gray-100">
        <div
          className="h-full bg-green-600 transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-4 pt-10 pb-20">

        {/* Back */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            All Articles
          </Link>
        </div>

        {/* Category */}
        <div className="mb-4">
          <span className="text-xs font-bold text-green-700 uppercase tracking-widest">
            {blog.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
          {blog.title}
        </h1>

        {/* Excerpt / Subtitle */}
        {blog.excerpt && (
          <p className="text-xl text-gray-500 leading-relaxed mb-8 font-light">
            {blog.excerpt}
          </p>
        )}

        {/* Author bar */}
        <div className="flex items-center justify-between py-4 border-y border-gray-100 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-green-700 rounded-full flex items-center justify-center text-white font-bold text-base">
              {(blog.author || 'S').charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">
                {blog.author || 'Saffron5 Institute'}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                <span>{readTime} min read</span>
                <span>·</span>
                <span>
                  {new Date(blog.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </span>
                <span>·</span>
                <span>👁 {blog.views}</span>
                {blog.language && (
                  <>
                    <span>·</span>
                    <span>{languageLabels[blog.language]}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Share */}
          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(blog.title + ' ' + window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-full hover:border-green-400 hover:bg-green-50 transition-all text-gray-500 hover:text-green-600"
              title="Share on WhatsApp"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.842L.057 23.854a.75.75 0 00.906.902l5.934-1.55A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.695 9.695 0 01-4.92-1.337l-.354-.21-3.656.956.979-3.572-.23-.368A9.694 9.694 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
              </svg>
            </a>
            <button
              onClick={handleCopyLink}
              className={`w-9 h-9 flex items-center justify-center border rounded-full transition-all
                ${copied ? 'border-green-400 bg-green-50 text-green-600' : 'border-gray-200 text-gray-400 hover:border-gray-400'}`}
              title="Copy link"
            >
              {copied ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Cover Image */}
        {blog.image ? (
          <div className="mb-10 rounded-2xl overflow-hidden">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full object-cover max-h-[500px]"
              onError={e => e.target.parentElement.style.display = 'none'}
            />
            {blog.imageCaption && (
              <p className="text-xs text-gray-400 text-center mt-2 italic">
                {blog.imageCaption}
              </p>
            )}
          </div>
        ) : (
          <div className={`mb-10 rounded-2xl overflow-hidden h-64 lg:h-80 bg-gradient-to-br ${gradients[0]} flex items-center justify-center`}>
            <span className="text-8xl opacity-30">{blog.icon || '📝'}</span>
          </div>
        )}

        {/* Article Content — Medium typography */}
        <div
          className="text-gray-800 text-lg leading-[1.9] font-light"
          style={{
            whiteSpace: 'pre-wrap',
            fontFamily: 'Georgia, "Times New Roman", serif',
            letterSpacing: '0.01em',
          }}
        >
          {blog.content}
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-100">
            {blog.tags.map(tag => (
              <span key={tag} className="text-sm text-gray-500 border border-gray-200 px-4 py-2 rounded-full hover:border-gray-400 cursor-pointer transition-colors">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Clap + Share — Medium bottom bar */}
        <div className="flex items-center justify-between py-6 border-y border-gray-100 mt-8">
          <button
            onClick={handleClap}
            className={`flex items-center gap-2 transition-all active:scale-90 ${clapped ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <span className="text-2xl">{clapped ? '👏' : '👏'}</span>
            <span className="text-sm font-medium">{claps}</span>
          </button>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(blog.title + ' ' + window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-bold text-sm px-5 py-2.5 rounded-full transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.842L.057 23.854a.75.75 0 00.906.902l5.934-1.55A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.695 9.695 0 01-4.92-1.337l-.354-.21-3.656.956.979-3.572-.23-.368A9.694 9.694 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
              </svg>
              Share
            </a>
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 border border-gray-200 text-gray-600 font-bold text-sm px-5 py-2.5 rounded-full hover:bg-gray-50 transition-all"
            >
              {copied ? '✅ Copied!' : '🔗 Copy Link'}
            </button>
          </div>
        </div>

        {/* Author bio */}
        <div className="flex gap-4 py-8 border-b border-gray-100">
          <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
            {(blog.author || 'S').charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Written by</p>
            <p className="font-bold text-gray-900 text-lg">{blog.author || 'Saffron5 Institute'}</p>
            <p className="text-gray-500 text-sm mt-1">
              Naturopathy & Natural Health Education — Saffron Naturopath & Research Institute, Mumbai
            </p>
            <Link
              to="/courses"
              className="inline-block mt-3 text-xs font-bold border border-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors"
            >
              View Our Courses
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-green-900 rounded-3xl p-8 mt-8 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-800 rounded-full opacity-50 pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-green-800 rounded-full opacity-50 pointer-events-none" />
          <div className="relative z-10">
            <p className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-2">
              Interested in this topic?
            </p>
            <h3 className="text-white font-extrabold text-2xl mb-2">
              Explore Our Naturopathy Courses
            </h3>
            <p className="text-green-200/70 text-sm mb-6 max-w-sm mx-auto">
              Turn your interest into a career. Enroll today and learn from expert naturopathy doctors.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/apply"
                className="bg-amber-400 hover:bg-amber-500 text-green-900 font-extrabold text-sm px-7 py-3 rounded-2xl transition-all"
              >
                Apply Now →
              </Link>
              <a
                href="https://wa.me/917218315876"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 border border-white/20 text-white font-bold text-sm px-7 py-3 rounded-2xl hover:bg-white/20 transition-all"
              >
                💬 Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1 h-5 bg-green-600 rounded-full" />
              <h3 className="font-bold text-gray-900 text-lg">More to Read</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((b, i) => (
                <Link
                  key={b._id}
                  to={`/blog/${b.slug}`}
                  className="group flex flex-col"
                >
                  {/* Thumbnail */}
                  <div className="rounded-xl overflow-hidden h-40 mb-3">
                    {b.image ? (
                      <img
                        src={b.image}
                        alt={b.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center`}>
                        <span className="text-3xl opacity-60">{b.icon || '📝'}</span>
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-bold text-green-700 mb-1">{b.category}</span>
                  <p className="font-bold text-gray-900 text-sm leading-snug group-hover:text-green-700 transition-colors line-clamp-2">
                    {b.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {Math.max(1, Math.ceil((b.content?.length || 500) / 1000))} min read
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

      </article>
    </div>
  )
}

export default BlogDetail