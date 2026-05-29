import { Link } from 'react-router-dom';
import blogs from '../../data/blogs';

function BlogSection() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
              स्वास्थ्य ब्लॉग
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900">
              मुफ्त स्वास्थ्य जानकारी
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Free health articles in Hindi by Saffron5 Institute
            </p>
          </div>
          <Link
            to="/blog"
            onClick={() => window.scrollTo(0, 0)}
            className="hidden sm:flex items-center gap-2 text-green-600 font-semibold text-sm hover:text-green-800 transition-colors"
          >
            सभी देखें →
          </Link>
        </div>

        {/* Blog Cards with Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.slice(0, 3).map(blog => (
            <Link
              key={blog.id}
              to={`/blog/${blog.slug}`}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-green-200 transition-all duration-300 group flex flex-col h-full"
            >
              {/* Blog Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-bold text-white bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
                    {blog.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-bold text-gray-900 text-base leading-snug mb-3 group-hover:text-green-700 transition-colors line-clamp-2">
                  {blog.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                  {blog.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs pt-4 border-t border-gray-100">
                  <span className="text-gray-400">⏱️ {blog.readTime}</span>
                  <span className="text-green-600 font-semibold group-hover:translate-x-1 transition-transform">
                    पढ़ें →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link
            to="/blog"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center gap-2 bg-green-700 text-white font-semibold text-sm px-8 py-3.5 rounded-2xl hover:bg-green-800 transition-all"
          >
            सभी लेख देखें →
          </Link>
        </div>

      </div>
    </section>
  );
}

export default BlogSection;