import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import courses from "../../data/courses";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [coursesOpenDesktop, setCoursesOpenDesktop] = useState(false); // Desktop
  const [coursesOpenMobile, setCoursesOpenMobile] = useState(false); // Mobile
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeAll = () => {
    setMenuOpen(false);
    setCoursesOpenDesktop(false);
    setCoursesOpenMobile(false);
  };

  // Close dropdown on outside click (Desktop only)
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest(".courses-dropdown")) {
        setCoursesOpenDesktop(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Add shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    closeAll();
  }, [location.pathname]);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Blog", path: "/blog" },
    { label: "Documentation", path: "/documentation" },
    { label: "Affiliation", path: "/affiliation" },
    { label: "Gallery", path: "/gallery" },
    { label: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-md" : "border-b border-gray-100"}`}
    >
      <div className="max-w-7xl mx-auto px-5 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
         onClick={() => {
                closeAll();
                scrollToTop();
              }}
          className="flex items-center gap-3 group"
        >
          <img
            src="/logo.png"
            alt="Saffron Educational Medical Foundation"
            className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <div>
            <p className="text-green-800 font-bold text-sm leading-tight tracking-tight">
              Saffron5 Institute
            </p>
            <p className="text-gray-400 text-[11px] leading-tight font-medium">
              Become Your Own Doctor
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={scrollToTop}
              className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive(link.path)
                  ? "text-green-700 bg-green-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Desktop Courses Dropdown */}
          <div className="courses-dropdown relative">
            <button
              onClick={() => {
                setCoursesOpenDesktop(!coursesOpenDesktop);
                scrollToTop();
              }}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                coursesOpenDesktop
                  ? "text-green-700 bg-green-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              Courses
              <svg
                className={`transition-transform duration-200 ${coursesOpenDesktop ? "rotate-180" : ""}`}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {coursesOpenDesktop && (
              <div className="absolute top-full mt-2 left-0 bg-white rounded-2xl w-80 z-50 border border-gray-100 overflow-hidden shadow-xl shadow-gray-200/60">
                <div className="px-3 py-2 border-b border-gray-50">
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
                    All Programs
                  </p>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {courses.map((course) => (
                    <Link
                      key={course.id}
                      to={`/courses/${course.slug}`}
                      onClick={closeAll}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-green-50 transition-colors group border-b border-gray-50 last:border-0"
                    >
                      <div className="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-green-700 font-bold text-xs">
                          {course.title.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-800 group-hover:text-green-700 transition-colors leading-snug block">
                          {course.title}
                        </span>
                        <span className="text-xs text-gray-400 mt-0.5 block">
                          {course.duration}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Right Side */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <>
              <button
                onClick={() =>
                  navigate(
                    role === "admin"
                      ? "/admin/dashboard"
                      : "/student/dashboard",
                  )
                }
                className="text-sm font-medium text-green-700 hover:text-green-800"
              >
                👤 {user.name?.split(" ")[0]}
              </button>
              <button
                onClick={handleLogout}
                className="border border-green-200 text-green-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-50 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-700 hover:text-green-700 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/apply"
                onClick={scrollToTop}
                className="bg-green-700 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-green-800 transition-colors"
              >
                Apply Now
              </Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden flex flex-col justify-center gap-[5px] w-9 h-9 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`block w-5 h-0.5 bg-gray-700 rounded-full mx-auto transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-gray-700 rounded-full mx-auto transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-gray-700 rounded-full mx-auto transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 pt-3 pb-5 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={scrollToTop}
              className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive(link.path) ? "bg-green-50 text-green-700" : "text-gray-700 hover:bg-gray-50"}`}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Courses */}
          <button
            onClick={() => setCoursesOpenMobile(!coursesOpenMobile)}
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 w-full transition-colors"
          >
            Courses
            <svg
              className={`transition-transform duration-200 ${coursesOpenMobile ? "rotate-180" : ""}`}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {coursesOpenMobile && (
            <div className="ml-4 flex flex-col gap-1 border-l-2 border-green-100 pl-4">
              {courses.map((course) => (
                <Link
                  key={course.id}
                  to={`/courses/${course.slug}`}
                  onClick={scrollToTop}
                  className="py-2 text-sm text-gray-600 hover:text-green-700 transition-colors"
                >
                  {course.title}
                </Link>
              ))}
            </div>
          )}

          <div className="border-t border-gray-100 my-2" />

          <Link
            to="/apply"
            onClick={scrollToTop}
            className="bg-green-700 text-white text-center px-5 py-3 rounded-xl text-sm font-semibold hover:bg-green-800"
          >
            Apply Now
          </Link>
          <Link
            to="/contact"
            onClick={scrollToTop}
            className="text-center px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Talk to us
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
