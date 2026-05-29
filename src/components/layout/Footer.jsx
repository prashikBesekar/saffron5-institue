import { Link } from "react-router-dom";
import courses from "../../data/courses";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: 'Blog', path: '/blog' },
  { label: "All Courses", path: "/courses" },
  { label: "Gallery", path: "/gallery" },
  { label: "Our Students", path: "/students" },
  { label: "Study Centers", path: "/study-centers" },
  { label: "Affiliation", path: "/affiliation" },
  { label: "Rules & Regulations", path: "/rules" },
  { label: 'Documentation', path: '/documentation' },
  { label: "Contact Us", path: "/contact" },
];

const socials = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/917218315876",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.842L.057 23.854a.75.75 0 00.906.902l5.934-1.55A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.695 9.695 0 01-4.92-1.337l-.354-.21-3.656.956.979-3.572-.23-.368A9.694 9.694 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
      </svg>
    ),
  },
];

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <footer className="bg-gray-950 text-gray-400">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-5 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <Link to="/" onClick={scrollToTop} className="flex items-center gap-2.5 mb-5 group">
            <div className="w-9 h-9 bg-green-700 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 transition-colors">
               <img
                src="/logo.png"
                alt="Saffron Educational Medical Foundation"
                className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">
                Saffron5 Institute
              </p>
              <p className="text-gray-500 text-[11px] leading-tight">
                Become Your Own Doctor
              </p>
            </div>
          </Link>

          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            An autonomous body offering naturopathy & alternative medicine
            courses since 1969. UN, UNICEF & UNESCO affiliated.
          </p>

          {/* Social icons */}
          <div className="flex gap-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-8 h-8 bg-gray-800 hover:bg-green-700 text-gray-400 hover:text-white rounded-lg flex items-center justify-center transition-all duration-200"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-2.5">
            {quickLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={scrollToTop}
                  className="text-sm text-gray-500 hover:text-green-400 transition-colors flex items-center gap-2 group"
                >
                  <svg
                    className="text-gray-700 group-hover:text-green-500 transition-colors flex-shrink-0"
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Courses */}
        <div>
          <h3 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">
            Our Courses
          </h3>
          <ul className="flex flex-col gap-2.5">
            {courses.map((course) => (
              <li key={course.id}>
                <Link
                  to={`/courses/${course.slug}`}
                    onClick={scrollToTop}
                  className="text-sm text-gray-500 hover:text-green-400 transition-colors flex items-center gap-2 group leading-snug"
                >
                  <svg
                    className="text-gray-700 group-hover:text-green-500 transition-colors flex-shrink-0 mt-0.5"
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                  {course.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/*Contact */}
        <div>
          <h3 className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">
            Contact Us
          </h3>

          <ul className="flex flex-col gap-4 text-sm text-gray-500 mb-6">
            <li className="flex gap-3 items-start">
              <svg
                className="text-green-600 flex-shrink-0 mt-0.5"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="leading-relaxed">
                Head of Branch 1. Mumbai 2nd Branch - Sambhaji Nagar 3rd Branch
                - Nagpur 4th Branch - Amravati District Opening
              </span>
            </li>
            <li className="flex gap-3 items-start">
              <svg
                className="text-green-600 flex-shrink-0 mt-0.5"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.08 1.18 2 2 0 012 .02h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              <div className="flex flex-col gap-1">
                <a
                  href="tel:+917219051876"
                  className="hover:text-green-400 transition-colors"
                >
                  +91 7219051876
                </a>
                <a
                  href="tel:+919604741733"
                  className="hover:text-green-400 transition-colors"
                >
                  +91 9604741733
                </a>
              </div>
            </li>
            <li className="flex gap-3 items-center">
              <svg
                className="text-green-600 flex-shrink-0"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <a
                href="mailto:saffronhealth5@gmail.com"
                className="hover:text-green-400 transition-colors truncate"
              >
                saffronhealth5@gmail.com
              </a>
            </li>
            <li className="flex gap-3 items-center">
              <svg
                className="text-green-600 flex-shrink-0"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <a
                href="mailto:saffroninquiry5@gmail.com"
                className="hover:text-green-400 transition-colors truncate"
              >
                saffroninquiry5@gmail.com
              </a>
            </li>
            <li className="flex gap-3 items-center">
              <svg
                className="text-green-600 flex-shrink-0"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Mon – Sat: 10:00 AM – 5:00 PM</span>
            </li>
          </ul>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/9197219051876"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all active:scale-95 shadow-sm"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.842L.057 23.854a.75.75 0 00.906.902l5.934-1.55A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.695 9.695 0 01-4.92-1.337l-.354-.21-3.656.956.979-3.572-.23-.368A9.694 9.694 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800/60">
        <div className="max-w-7xl mx-auto px-5 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-600">
            © 2025 Saffron5 Health Institute. All rights reserved.
          </p>
          <p className="text-xs text-gray-700 text-center">
            Reg. Trust: Saffron Educational & Medical Foundation —{" "}
            <span className="text-gray-600">REG.NO.: E-34921(M)</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
