import { useParams, Link } from 'react-router-dom';
import blogs from '../data/blogs';
import { useEffect, useState } from 'react';

function BlogDetail() {
  const { slug } = useParams();
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  // ── Hook must be before any early return ──
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gray-50">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-5 text-4xl">😕</div>
        <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Article Not Found</h1>
        <p className="text-gray-400 text-sm mb-6">The article you're looking for doesn't exist or was moved.</p>
        <Link
          to="/blog"
          className="bg-green-700 text-white font-bold px-8 py-3.5 rounded-2xl hover:bg-green-800 transition-colors"
        >
          ← Back to Blog
        </Link>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const relatedPosts = blogs
    .filter((b) => b.slug !== slug && b.category === blog.category)
    .slice(0, 3);

  const fallbackRelated = blogs
    .filter((b) => b.slug !== slug)
    .slice(0, 3);

  const related = relatedPosts.length > 0 ? relatedPosts : fallbackRelated;

  // ── Section renderers ──────────────────────────────────────────────────────

  const renderSection = (section, index) => {
    switch (section.type) {

      case 'intro':
        return (
          <div key={index} className="text-gray-700 leading-relaxed text-[17px]">
            {section.content.split('\n\n').map((para, i) => (
              <p key={i} className="mb-5">{para}</p>
            ))}
          </div>
        );

      case 'steps':
        return (
          <div key={index} className="my-10">
            <h2 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-1 h-6 bg-green-600 rounded-full inline-block" />
              {section.title}
            </h2>
            <div className="space-y-4">
              {section.steps.map((step, i) => (
                <div key={i} className="flex gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:border-green-200 transition-colors">
                  <div className="w-9 h-9 bg-green-700 text-white rounded-xl flex items-center justify-center font-extrabold text-sm flex-shrink-0 mt-0.5">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-base">{step.title}</h3>
                    <p className="text-gray-600 mt-1.5 leading-relaxed text-sm">{step.content}</p>
                    {step.tip && (
                      <div className="mt-3 bg-amber-50 border border-amber-100 px-4 py-3 rounded-xl text-sm text-amber-800 flex items-start gap-2">
                        <span className="flex-shrink-0 mt-0.5">📌</span>
                        <span>{step.tip}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'tips': {
        return (
          <div key={index} className="my-10 bg-green-50 border border-green-100 rounded-2xl p-6">
            <h2 className="text-xl font-extrabold text-gray-900 mb-5 flex items-center gap-2">
              <span className="text-green-600">✦</span> {section.title}
            </h2>
            <div className="space-y-3">
              {section.items?.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-green-200 text-green-800 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {typeof item === 'string' ? item : item.food}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'diet': {
        return (
          <div key={index} className="my-10 bg-amber-50 border border-amber-100 rounded-2xl p-6">
            <h2 className="text-xl font-extrabold text-gray-900 mb-5 flex items-center gap-2">
              <span>🥗</span> {section.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {section.items?.map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white border border-amber-100 rounded-xl px-4 py-3">
                  <span className="w-2 h-2 bg-amber-400 rounded-full flex-shrink-0" />
                  <p className="text-gray-700 text-sm">
                    {typeof item === 'string' ? item : item.food}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'schedule': {
        return (
          <div key={index} className="my-10 bg-sky-50 border border-sky-100 rounded-2xl p-6">
            <h2 className="text-xl font-extrabold text-gray-900 mb-5 flex items-center gap-2">
              <span>🗓️</span> {section.title}
            </h2>
            <div className="space-y-2">
              {section.items?.map((item, i) => (
                <div key={i} className="flex items-start gap-3 py-2 border-b border-sky-100 last:border-0">
                  <span className="text-sky-500 flex-shrink-0 mt-0.5">▶</span>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {typeof item === 'string' ? item : item.food}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'warning': {
        return (
          <div key={index} className="my-10 bg-red-50 border border-red-200 rounded-2xl p-6">
            <h2 className="text-xl font-extrabold text-red-800 mb-5 flex items-center gap-2">
              <span>⚠️</span> {section.title}
            </h2>
            <div className="space-y-3">
              {section.items?.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-red-200 text-red-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">!</span>
                  <p className="text-red-700 text-sm leading-relaxed">
                    {typeof item === 'string' ? item : item.food}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="bg-[#f8f6f1] min-h-screen">

      {/* ── Reading progress bar ── */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
        <div
          className="h-full bg-green-600 transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ── Hero ── */}
      <div className="relative overflow-hidden" style={{ minHeight: 'clamp(380px, 55vw, 560px)' }}>
        <img
          src={blog.image}
          alt={blog.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/55 to-black/92" />

        {/* Back button */}
        <div className="absolute top-6 left-4 md:left-8 z-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-white/20 transition-all"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            All Articles
          </Link>
        </div>

        {/* Hero text */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-8 md:px-10 md:pb-12 max-w-4xl mx-auto">
          {/* Category + meta */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="bg-green-600 text-white text-[10px] font-extrabold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full">
              {blog.category}
            </span>
            <span className="text-white/50 text-xs">{blog.date}</span>
            <span className="text-white/30 text-xs">·</span>
            <span className="text-white/50 text-xs flex items-center gap-1">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              {blog.readTime}
            </span>
          </div>

          <h1
            className="font-extrabold text-white leading-tight tracking-tight"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)' }}
          >
            {blog.title}
          </h1>

          {blog.subtitle && (
            <p className="text-green-100/75 mt-3 text-base leading-relaxed max-w-2xl">
              {blog.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-3xl mx-auto px-4 -mt-6 relative z-10 pb-20">

        {/* Article card */}
        <div className="bg-white rounded-3xl shadow-xl px-6 py-9 md:px-10 md:py-12">
          {blog.sections.map((section, index) => renderSection(section, index))}
        </div>

        {/* ── Share bar ── */}
        <div className="flex flex-wrap gap-3 justify-center mt-8">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(blog.title + ' ' + window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-bold text-sm px-6 py-3 rounded-2xl transition-all active:scale-95"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.842L.057 23.854a.75.75 0 00.906.902l5.934-1.55A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.695 9.695 0 01-4.92-1.337l-.354-.21-3.656.956.979-3.572-.23-.368A9.694 9.694 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
            </svg>
            Share on WhatsApp
          </a>

          <button
            onClick={handleCopyLink}
            className={`inline-flex items-center gap-2 border font-bold text-sm px-6 py-3 rounded-2xl transition-all active:scale-95
              ${copied
                ? 'border-green-300 bg-green-50 text-green-700'
                : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
              }`}
          >
            {copied ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
                </svg>
                Copy Link
              </>
            )}
          </button>
        </div>

        {/* ── Related articles ── */}
        {related.length > 0 && (
          <div className="bg-white rounded-3xl p-7 mt-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1 h-5 bg-green-600 rounded-full" />
              <h3 className="font-extrabold text-gray-900 text-lg">Related Articles</h3>
            </div>
            <div className="space-y-4">
              {related.map((b) => (
                <Link
                  key={b.id}
                  to={`/blog/${b.slug}`}
                  className="flex gap-4 group p-3 -mx-3 rounded-2xl hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={b.image}
                    alt={b.title}
                    className="w-20 h-16 object-cover rounded-xl flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-green-700 uppercase tracking-wide">
                      {b.category}
                    </span>
                    <p className="font-semibold text-gray-900 text-sm leading-snug group-hover:text-green-700 transition-colors line-clamp-2 mt-0.5">
                      {b.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{b.readTime} · {b.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── Enquiry CTA ── */}
        <div className="bg-green-900 rounded-3xl p-7 mt-8 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-800 rounded-full opacity-50 pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-green-800 rounded-full opacity-50 pointer-events-none" />
          <div className="relative z-10">
            <p className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-2">Interested in this topic?</p>
            <h3 className="text-white font-extrabold text-xl mb-2 leading-snug">
              Explore Our Naturopathy Courses
            </h3>
            <p className="text-green-200/70 text-sm mb-6 max-w-sm mx-auto">
              Turn your interest into a career. Our team will guide you personally.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/apply"
                className="bg-amber-400 hover:bg-amber-500 text-green-900 font-extrabold text-sm px-7 py-3 rounded-2xl transition-all active:scale-95"
              >
                Apply Now →
              </Link>
              <a
                href="https://wa.me/917218315876"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm px-7 py-3 rounded-2xl transition-all active:scale-95"
              >
                💬 Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default BlogDetail;