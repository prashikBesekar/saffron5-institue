import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import api from "../data/api";

const statusColors = {
  new: "bg-blue-50 text-blue-700 border border-blue-100",
  contacted: "bg-amber-50 text-amber-700 border border-amber-100",
  enrolled: "bg-green-50 text-green-700 border border-green-100",
  rejected: "bg-red-50 text-red-600 border border-red-100",
};

const statusIcons = {
  new: "🆕",
  contacted: "📞",
  enrolled: "🎓",
  rejected: "❌",
};

const iconOptions = [
  "📝",
  "💆‍♀️",
  "🌿",
  "🥗",
  "🧘",
  "💊",
  "🏃",
  "🔬",
  "❤️",
  "🌱",
];

const managedCourses = [
  { slug: "diploma-naturopathy", title: "Diploma N.D." },
  { slug: "bachelor-asm", title: "B.A.S.M." },
  { slug: "md-naturopathy", title: "M.D." },
  { slug: "phd-naturopathy", title: "PhD" },
  { slug: "bnys", title: "BNYS" },
  { slug: "dnys", title: "DNYS" },
  { slug: "nutrition-consultancy", title: "Nutrition" },
  { slug: "dietetics-consultancy", title: "Dietetics" },
  { slug: "dmlt", title: "DMLT" },
  { slug: "bpt", title: "BPT" },
  { slug: "cms-ed", title: "CMS & ED" },
  { slug: "bams", title: "BAMS" },
  { slug: "general-health", title: "General Health" },
  { slug: "food-new-medicine", title: "Food Medicine" },
  { slug: "speciality-diabetes", title: "Diabetes" },
];

const inputClass =
  "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-all bg-white";

const Spinner = ({ size = 22 }) => (
  <svg
    className="animate-spin text-green-600"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.2" />
    <path d="M12 3a9 9 0 019 9" />
  </svg>
);

// ── Mobile application card ────────────────────────────────────────────────────
function AppCard({ app, enrollingId, onUpdateStatus, onEnroll }) {
  return (
    <div
      className={`rounded-2xl border p-4 ${app.status === "enrolled" ? "bg-green-50/40 border-green-100" : "bg-white border-gray-100"}`}
    >
      {/* Name + status */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="min-w-0">
          <p className="font-bold text-gray-900 text-sm truncate">{app.name}</p>
          <p className="text-gray-400 text-xs mt-0.5 truncate">
            {app.email || "No email"}
          </p>
          <p className="text-gray-300 text-xs">
            {new Date(app.createdAt).toLocaleDateString("en-IN")}
          </p>
        </div>
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-lg whitespace-nowrap flex-shrink-0 ${statusColors[app.status]}`}
        >
          {statusIcons[app.status]}{" "}
          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
        </span>
      </div>

      {/* Course + location + fee */}
      <div className="bg-gray-50 rounded-xl px-3 py-2.5 mb-3">
        <p className="text-xs text-gray-700 leading-snug">{app.course}</p>
        <div className="flex items-center justify-between mt-1.5">
          <p className="text-xs text-gray-400">
            {app.state || "—"}
            {app.city ? `, ${app.city}` : ""}
          </p>
          <p className="text-sm font-bold text-green-700">{app.fee || "—"}</p>
        </div>
      </div>

      {/* Call + WhatsApp */}
      <div className="flex gap-2 mb-3">
        <a
          href={`tel:${app.phone}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-green-50 border border-green-100 text-green-700 text-xs font-semibold py-2.5 rounded-xl active:bg-green-100 transition-colors"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.08 1.18 2 2 0 012 .02h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
          {app.phone}
        </a>
        <a
          href={`https://wa.me/91${app.phone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 bg-green-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl active:bg-green-700 transition-colors"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          </svg>
          WA
        </a>
      </div>

      {/* Status select + enroll */}
      <div className="flex gap-2">
        <select
          value={app.status}
          onChange={(e) => onUpdateStatus(app._id, e.target.value)}
          className="flex-1 text-xs border border-gray-200 rounded-xl px-2 py-2.5 focus:outline-none focus:border-green-500 bg-white"
        >
          <option value="new">🆕 New</option>
          <option value="contacted">📞 Contacted</option>
          <option value="enrolled">🎓 Enrolled</option>
          <option value="rejected">❌ Rejected</option>
        </select>

        {app.status !== "enrolled" && app.status !== "rejected" ? (
          <button
            onClick={() => onEnroll(app)}
            disabled={enrollingId === app._id}
            className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2.5 rounded-xl transition-all whitespace-nowrap
              ${enrollingId === app._id ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-green-700 text-white active:bg-green-800"}`}
          >
            {enrollingId === app._id ? (
              <>
                <Spinner size={11} /> Enrolling...
              </>
            ) : (
              <>
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Enroll
              </>
            )}
          </button>
        ) : app.status === "enrolled" ? (
          <div className="inline-flex items-center px-3 py-2.5 bg-green-50 border border-green-100 rounded-xl">
            <p className="text-xs text-green-700 font-bold">🎓 Done</p>
          </div>
        ) : (
          <div className="inline-flex items-center px-3 py-2.5 bg-red-50 border border-red-100 rounded-xl">
            <p className="text-xs text-red-600 font-bold">❌</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Mobile student card ────────────────────────────────────────────────────────
function StudentCard({ student }) {
  return (
    <div
      className={`rounded-2xl border p-4 ${student.status === "approved" ? "bg-green-50/30 border-green-100" : "bg-white border-gray-100"}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 bg-green-700 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {student.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-gray-900 text-sm truncate">
              {student.name}
            </p>
            <p className="text-gray-400 text-xs truncate">{student.email}</p>
          </div>
        </div>
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-lg flex-shrink-0 ${student.status === "approved" ? "bg-green-50 text-green-700 border border-green-100" : "bg-gray-50 text-gray-500 border border-gray-100"}`}
        >
          {student.status === "approved" ? "🎓" : "⏳"}
        </span>
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <a
          href={`tel:${student.phone}`}
          className="text-xs text-green-600 font-semibold"
        >
          {student.phone}
        </a>
        <p className="text-xs text-gray-400">
          {new Date(student.createdAt).toLocaleDateString("en-IN")}
        </p>
      </div>
      {student.course && (
        <p className="text-xs text-gray-400 mt-1.5 leading-snug">
          {student.course}
        </p>
      )}
    </div>
  );
}

// ── Main dashboard ─────────────────────────────────────────────────────────────
function AdminDashboard() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab] = useState("applications");
  const [applications, setApplications] = useState([]);
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [enrollingId, setEnrollingId] = useState(null);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseModules, setCourseModules] = useState([]);
  const [newModule, setNewModule] = useState("");
  const [newLesson, setNewLesson] = useState({
    moduleId: "",
    title: "",
    type: "video",
    duration: "",
    videoUrl: "",
    videoSource: "youtube",
    fileUrl: "",
    preview: false,
  });
  const [videoLoading, setVideoLoading] = useState(false);

  // Blog State
  const [blogTab, setBlogTab] = useState("list");
  const [adminBlogs, setAdminBlogs] = useState([]);
  const [blogTotal, setBlogTotal] = useState(0);
  const [blogSearch, setBlogSearch] = useState("");
  const [blogLoading, setBlogLoading] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    language: "hindi",
    icon: "📝",
    tags: "",
    status: "published",
    image: "",
    imageCaption: "",
    author: "Saffron5 Institute",
  });
  const [bulkText, setBulkText] = useState("");
  const [bulkLoading, setBulkLoading] = useState(false);

  const loadCourseModules = async (slug) => {
    try {
      setVideoLoading(true);
      const data = await api(`/course-content/${slug}`, "GET", null, token);
      setCourseModules(data.modules || []);
    } catch {
      setCourseModules([]);
    } finally {
      setVideoLoading(false);
    }
  };

  const addModule = async (courseSlug, courseTitle) => {
    if (!newModule.trim()) return alert("Enter module title!");
    try {
      await api(
        `/course-content/${courseSlug}/module`,
        "POST",
        { courseTitle, moduleTitle: newModule },
        token,
      );
      setNewModule("");
      await loadCourseModules(courseSlug);
      alert("Module added!");
    } catch (err) {
      alert("Failed: " + err.message);
    }
  };

  const addLesson = async (courseSlug) => {
    if (!newLesson.moduleId) return alert("Select a module!");
    if (!newLesson.title) return alert("Enter lesson title!");
    if (newLesson.type === "video" && !newLesson.videoUrl)
      return alert("Enter video URL!");
    try {
      await api(
        `/course-content/${courseSlug}/module/${newLesson.moduleId}/lesson`,
        "POST",
        newLesson,
        token,
      );
      setNewLesson({
        moduleId: newLesson.moduleId,
        title: "",
        type: "video",
        duration: "",
        videoUrl: "",
        videoSource: "youtube",
        fileUrl: "",
        preview: false,
      });
      await loadCourseModules(courseSlug);
      alert("Video added!");
    } catch (err) {
      alert("Failed: " + err.message);
    }
  };

  const deleteLesson = async (courseSlug, moduleId, lessonId) => {
    if (!window.confirm("Delete this lesson?")) return;
    try {
      await api(
        `/course-content/${courseSlug}/module/${moduleId}/lesson/${lessonId}`,
        "DELETE",
        null,
        token,
      );
      await loadCourseModules(courseSlug);
    } catch {
      alert("Failed to delete.");
    }
  };

  // Blog functions
  const loadAdminBlogs = async () => {
    try {
      setBlogLoading(true);
      const params = new URLSearchParams({
        page: 1,
        limit: 20,
        ...(blogSearch && { search: blogSearch }),
      });
      const data = await api(`/blogs/admin/all?${params}`, "GET", null, token);
      setAdminBlogs(data.blogs || []);
      setBlogTotal(data.total || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setBlogLoading(false);
    }
  };

  const publishBlog = async () => {
    if (!newBlog.title.trim()) return alert("Enter blog title!");
    if (!newBlog.content.trim()) return alert("Enter blog content!");

    try {
      const tagsArray = newBlog.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        title: newBlog.title.trim(),
        content: newBlog.content.trim(),
        category: newBlog.category.trim() || "General",
        language: newBlog.language,
        icon: newBlog.icon || "📝",
        status: newBlog.status,
        author: newBlog.author.trim() || "Saffron5 Institute",
        tags: tagsArray,
      };

      // Only add optional fields if they have values
      if (newBlog.excerpt.trim()) payload.excerpt = newBlog.excerpt.trim();
      if (newBlog.image.trim()) payload.image = newBlog.image.trim();
      if (newBlog.imageCaption.trim())
        payload.imageCaption = newBlog.imageCaption.trim();

      console.log("Sending payload:", payload);

      const data = await api("/blogs", "POST", payload, token);

      setNewBlog({
        title: "",
        content: "",
        excerpt: "",
        category: "",
        language: "hindi",
        icon: "📝",
        tags: "",
        status: "published",
        image: "",
        imageCaption: "",
        author: "Saffron5 Institute",
      });
      await loadAdminBlogs();
      alert("✅ Blog published!");
    } catch (err) {
      console.error("Publish error:", err);
      alert("Failed: " + err.message);
    }
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    try {
      await api(`/blogs/${id}`, "DELETE", null, token);
      await loadAdminBlogs();
    } catch (err) {
      alert("Failed to delete.");
    }
  };

  const bulkUpload = async () => {
    if (!bulkText.trim()) return alert("Paste your blog data!");
  
    try {
      setBulkLoading(true);
      
      // ✅ Better validation
      const trimmed = bulkText.trim();
      
      if (!trimmed.startsWith('[')) {
        return alert('❌ JSON must start with [ bracket\n\nExample:\n[\n  { "title": "...", "content": "..." }\n]');
      }
      
      if (!trimmed.endsWith(']')) {
        return alert('❌ JSON must end with ] bracket');
      }
      
      // Parse JSON
      let blogs;
      try {
        blogs = JSON.parse(trimmed);
      } catch (parseErr) {
        console.error('JSON Parse Error:', parseErr.message);
        return alert(`❌ Invalid JSON format!\n\n${parseErr.message}\n\nMake sure:\n✓ All strings use double quotes\n✓ No trailing commas\n✓ Proper nesting`);
      }
      
      if (!Array.isArray(blogs)) {
        return alert('❌ Data must be an array! Start with [ and end with ]');
      }
      
      if (blogs.length === 0) {
        return alert('❌ Array is empty! Add at least 1 blog');
      }
      
      // Validate each blog
      const errors = [];
      blogs.forEach((blog, i) => {
        if (!blog.title) errors.push(`Blog ${i + 1}: Missing "title"`);
        if (!blog.content) errors.push(`Blog ${i + 1}: Missing "content"`);
      });
      
      if (errors.length > 0) {
        return alert(`❌ Validation errors:\n\n${errors.join('\n')}`);
      }
      
      console.log(`Valid JSON with ${blogs.length} blogs`);
      
      const data = await api("/blogs/bulk", "POST", { blogs }, token);
      alert(`✅ ${data.uploaded} blogs uploaded!\n❌ ${data.failed} failed`);
      setBulkText("");
      await loadAdminBlogs();
    } catch (err) {
      console.error('Bulk upload error:', err);
      alert(`❌ Upload failed:\n\n${err.message}`);
    } finally {
      setBulkLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (tab === "blogs") loadAdminBlogs();
  }, [tab]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [appsData, studentsData, statsData] = await Promise.all([
        api("/admin/applications", "GET", null, token),
        api("/admin/students", "GET", null, token),
        api("/admin/stats", "GET", null, token),
      ]);
      setApplications(appsData.applications);
      setStudents(studentsData.students);
      setStats(statsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api(`/admin/applications/${id}`, "PATCH", { status }, token);
      setApplications((prev) =>
        prev.map((app) => (app._id === id ? { ...app, status } : app)),
      );
    } catch {
      alert("Failed to update status");
    }
  };

  const enrollStudent = async (app) => {
    if (
      !window.confirm(
        `Enroll ${app.name} for:\n"${app.course}"\n\nThis will unlock their course immediately. Continue?`,
      )
    )
      return;
    setEnrollingId(app._id);
    try {
      const data = await api(
        "/admin/enroll-student",
        "POST",
        {
          applicationId: app._id,
          studentEmail: app.email,
          studentPhone: app.phone,
          courseName: app.course,
        },
        token,
      );
      setApplications((prev) =>
        prev.map((a) => (a._id === app._id ? { ...a, status: "enrolled" } : a)),
      );
      const studentsData = await api("/admin/students", "GET", null, token);
      setStudents(studentsData.students);
      alert(data.message);
    } catch (err) {
      alert("Failed to enroll: " + err.message);
    } finally {
      setEnrollingId(null);
    }
  };

  const filteredApps = applications.filter((app) =>
    [app.name, app.phone, app.email, app.course, app.state].some((v) =>
      v?.toLowerCase().includes(search.toLowerCase()),
    ),
  );

  const newCount = applications.filter((a) => a.status === "new").length;

  // Add this function inside AdminDashboard() component

  // In AdminDashboard.jsx, update handleImageUpload function:
  
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
  
    if (!file) return
  
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image too large! Max 5MB allowed')
      return
    }
  
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Only image files allowed')
      return
    }
  
    try {
      // Read and compress image
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          // Create canvas for compression
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
  
          // Set max dimensions
          const maxWidth = 1200
          const maxHeight = 800
          let width = img.width
          let height = img.height
  
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width
              width = maxWidth
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height
              height = maxHeight
            }
          }
  
          canvas.width = width
          canvas.height = height
          ctx.drawImage(img, 0, 0, width, height)
  
          // Convert to base64 with compression
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7)
          setNewBlog({ ...newBlog, image: compressedBase64 })
          console.log(' Image compressed and loaded')
        }
        img.src = event.target.result
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error(' Image upload error:', error)
      alert('Failed to upload image')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-green-900 border-b border-green-800 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <Link
              to="/"
              className="w-8 h-8 bg-white/15 border border-white/20 rounded-xl flex items-center justify-center flex-shrink-0"
            >
              <span className="text-white font-bold text-xs">S5</span>
            </Link>
            <div className="min-w-0">
              <p className="text-white font-bold text-sm leading-tight">
                Admin
              </p>
              <p className="text-green-300/70 text-xs truncate">{user?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={loadData}
              className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 text-white text-xs font-semibold px-3 py-2 rounded-xl"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M23 4v6h-6M1 20v-6h6" />
                <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
              </svg>
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-red-500/30 border border-white/15 text-white text-xs font-semibold px-3 py-2 rounded-xl"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-5">
        {/* ── Stats ─────────────────────────────────────── */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            {[
              {
                label: "New",
                value: stats.newApplications,
                icon: "🆕",
                border: "border-blue-100",
                desc: "Need to contact",
              },
              {
                label: "Contacted",
                value: applications.filter((a) => a.status === "contacted")
                  .length,
                icon: "📞",
                border: "border-amber-100",
                desc: "Awaiting payment",
              },
              {
                label: "Enrolled",
                value: stats.enrolled,
                icon: "🎓",
                border: "border-green-100",
                desc: "Course unlocked",
              },
              {
                label: "Users",
                value: stats.totalStudents,
                icon: "👥",
                border: "border-purple-100",
                desc: "Registered",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`bg-white rounded-2xl p-4 border ${stat.border}`}
              >
                <span className="text-xl">{stat.icon}</span>
                <div className="text-2xl font-extrabold text-gray-900 mt-1.5 tracking-tight leading-none">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-gray-700 mt-1">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-400 mt-0.5 hidden sm:block">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* How it works — collapsible on mobile */}
        <details className="bg-green-50 border border-green-100 rounded-2xl mb-5 group">
          <summary className="px-4 py-3.5 flex items-center justify-between cursor-pointer list-none select-none">
            <span className="text-green-800 text-xs font-bold flex items-center gap-1.5">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              How to enroll a student
            </span>
            <svg
              className="text-green-600 transition-transform duration-200 group-open:rotate-180"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </summary>
          <div className="px-4 pb-4 flex flex-wrap gap-2">
            {[
              "1. Student fills apply form",
              "2. Call & share payment details",
              "3. Change status → Contacted",
              "4. Student pays via PhonePe/Bank",
              "5. Student sends payment screenshot",
              "6. Verify in your bank/PhonePe",
              '7. Click "Enroll & Unlock"',
              "8. Student logs in → course unlocked!",
            ].map((step, i) => (
              <span
                key={i}
                className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-lg font-medium"
              >
                {step}
              </span>
            ))}
          </div>
        </details>

        {/* Tabs — scrollable row on mobile  */}
        <div className="flex gap-2 mb-5 overflow-x-auto no-scrollbar pb-0.5">
          {[
            {
              key: "applications",
              label: "Applications",
              count: newCount > 0 ? newCount : null,
            },
            { key: "students", label: "Students", count: null },
            { key: "courses", label: "Videos", count: null },
            { key: "blogs", label: "📝 Blogs", count: null },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0
                ${tab === t.key ? "bg-green-700 text-white shadow-sm" : "bg-white text-gray-600 border border-gray-200"}`}
            >
              {t.label}
              {t.count && (
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${tab === t.key ? "bg-white/25 text-white" : "bg-blue-100 text-blue-700"}`}
                >
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/*  Loading */}
        {loading ? (
          <div className="bg-white rounded-2xl border border-gray-100 flex flex-col items-center justify-center py-24 gap-3">
            <Spinner />
            <p className="text-gray-400 text-sm">Loading data...</p>
          </div>
        ) : (
          <>
            {/* Applications */}
            {tab === "applications" && (
              <div>
                {/* Search */}
                <div className="flex gap-2 mb-4">
                  <div className="relative flex-1">
                    <svg
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search name, phone, course..."
                      className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-all"
                    />
                  </div>
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="text-xs text-gray-400 px-3 border border-gray-200 rounded-xl"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {filteredApps.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-gray-100 flex flex-col items-center py-20 gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#9ca3af"
                        strokeWidth="1.5"
                      >
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-400 text-sm">
                      No applications found
                    </p>
                    {search && (
                      <button
                        onClick={() => setSearch("")}
                        className="text-green-600 text-xs"
                      >
                        Clear search
                      </button>
                    )}
                  </div>
                ) : (
                  <>
                    {/* Mobile: card list */}
                    <div className="flex flex-col gap-3 md:hidden">
                      {filteredApps.map((app) => (
                        <AppCard
                          key={app._id}
                          app={app}
                          enrollingId={enrollingId}
                          onUpdateStatus={updateStatus}
                          onEnroll={enrollStudent}
                        />
                      ))}
                      <p className="text-xs text-gray-400 text-center pt-1">
                        {filteredApps.length} of {applications.length}{" "}
                        applications
                      </p>
                    </div>

                    {/* Desktop: table */}
                    <div className="hidden md:block bg-white rounded-2xl border border-gray-100 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                              {[
                                "Name & Contact",
                                "Phone",
                                "Course",
                                "Fee",
                                "State",
                                "Status",
                                "Actions",
                              ].map((h) => (
                                <th
                                  key={h}
                                  className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-widest whitespace-nowrap"
                                >
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {filteredApps.map((app) => (
                              <tr
                                key={app._id}
                                className={`border-b border-gray-50 transition-colors ${app.status === "enrolled" ? "bg-green-50/40" : "hover:bg-gray-50/60"}`}
                              >
                                <td className="px-4 py-4">
                                  <p className="font-semibold text-gray-900 text-sm">
                                    {app.name}
                                  </p>
                                  <p className="text-gray-400 text-xs mt-0.5">
                                    {app.email || "No email"}
                                  </p>
                                  <p className="text-gray-300 text-xs">
                                    {new Date(app.createdAt).toLocaleDateString(
                                      "en-IN",
                                    )}
                                  </p>
                                </td>
                                <td className="px-4 py-4">
                                  <a
                                    href={`tel:${app.phone}`}
                                    className="text-sm text-green-600 font-semibold hover:underline flex items-center gap-1"
                                  >
                                    <svg
                                      width="12"
                                      height="12"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                    >
                                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.08 1.18 2 2 0 012 .02h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                                    </svg>
                                    {app.phone}
                                  </a>
                                  <a
                                    href={`https://wa.me/91${app.phone}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-green-400 hover:text-green-600 mt-0.5 flex items-center gap-1"
                                  >
                                    <svg
                                      width="10"
                                      height="10"
                                      viewBox="0 0 24 24"
                                      fill="currentColor"
                                    >
                                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                    </svg>
                                    WhatsApp
                                  </a>
                                </td>
                                <td className="px-4 py-4">
                                  <p className="text-xs text-gray-700 max-w-[140px] leading-relaxed">
                                    {app.course}
                                  </p>
                                </td>
                                <td className="px-4 py-4">
                                  <p className="text-sm font-bold text-green-700 whitespace-nowrap">
                                    {app.fee || "—"}
                                  </p>
                                </td>
                                <td className="px-4 py-4">
                                  <p className="text-xs text-gray-600">
                                    {app.state || "—"}
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    {app.city || ""}
                                  </p>
                                </td>
                                <td className="px-4 py-4">
                                  <span
                                    className={`text-xs font-bold px-2.5 py-1 rounded-lg whitespace-nowrap ${statusColors[app.status]}`}
                                  >
                                    {statusIcons[app.status]}{" "}
                                    {app.status.charAt(0).toUpperCase() +
                                      app.status.slice(1)}
                                  </span>
                                </td>
                                <td className="px-4 py-4">
                                  <div className="flex flex-col gap-2 min-w-[130px]">
                                    <select
                                      value={app.status}
                                      onChange={(e) =>
                                        updateStatus(app._id, e.target.value)
                                      }
                                      className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-green-500 bg-white"
                                    >
                                      <option value="new">🆕 New</option>
                                      <option value="contacted">
                                        📞 Contacted
                                      </option>
                                      <option value="enrolled">
                                        🎓 Enrolled
                                      </option>
                                      <option value="rejected">
                                        ❌ Rejected
                                      </option>
                                    </select>
                                    {app.status !== "enrolled" &&
                                    app.status !== "rejected" ? (
                                      <button
                                        onClick={() => enrollStudent(app)}
                                        disabled={enrollingId === app._id}
                                        className={`inline-flex items-center justify-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg transition-all w-full
                                          ${enrollingId === app._id ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-green-700 hover:bg-green-800 text-white shadow-sm"}`}
                                      >
                                        {enrollingId === app._id ? (
                                          <>
                                            <Spinner size={11} /> Enrolling...
                                          </>
                                        ) : (
                                          <>
                                            <svg
                                              width="11"
                                              height="11"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              strokeWidth="2.5"
                                            >
                                              <path d="M20 6L9 17l-5-5" />
                                            </svg>
                                            Enroll & Unlock
                                          </>
                                        )}
                                      </button>
                                    ) : app.status === "enrolled" ? (
                                      <div className="text-center py-1.5 bg-green-50 border border-green-100 rounded-lg">
                                        <p className="text-xs text-green-700 font-bold">
                                          🎓 Enrolled
                                        </p>
                                      </div>
                                    ) : (
                                      <div className="text-center py-1.5 bg-red-50 border border-red-100 rounded-lg">
                                        <p className="text-xs text-red-600 font-bold">
                                          ❌ Rejected
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <p className="text-xs text-gray-400">
                          Showing{" "}
                          <span className="font-semibold text-gray-600">
                            {filteredApps.length}
                          </span>{" "}
                          of{" "}
                          <span className="font-semibold text-gray-600">
                            {applications.length}
                          </span>
                        </p>
                        <p className="text-xs text-gray-400">
                          <span className="text-green-600 font-semibold">
                            {
                              applications.filter(
                                (a) => a.status === "enrolled",
                              ).length
                            }{" "}
                            enrolled
                          </span>
                          {" · "}
                          <span className="text-blue-600 font-semibold">
                            {newCount} new
                          </span>
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Students */}
            {tab === "students" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold text-gray-700">
                    {students.length} Registered Student
                    {students.length !== 1 ? "s" : ""}
                  </p>
                  <p className="text-xs text-gray-400 hidden sm:block">
                    Accounts at /register
                  </p>
                </div>

                {students.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-gray-100 flex flex-col items-center py-20 gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#9ca3af"
                        strokeWidth="1.5"
                      >
                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                      </svg>
                    </div>
                    <p className="text-gray-400 text-sm">
                      No registered students yet
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Mobile: cards */}
                    <div className="flex flex-col gap-3 md:hidden">
                      {students.map((s) => (
                        <StudentCard key={s._id} student={s} />
                      ))}
                    </div>

                    {/* Desktop: table */}
                    <div className="hidden md:block bg-white rounded-2xl border border-gray-100 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                              {[
                                "Name",
                                "Email",
                                "Phone",
                                "Course",
                                "State",
                                "Status",
                                "Joined",
                              ].map((h) => (
                                <th
                                  key={h}
                                  className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-widest"
                                >
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {students.map((student) => (
                              <tr
                                key={student._id}
                                className={`border-b border-gray-50 hover:bg-gray-50/60 transition-colors ${student.status === "approved" ? "bg-green-50/30" : ""}`}
                              >
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 bg-green-700 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                      {student.name.charAt(0).toUpperCase()}
                                    </div>
                                    <p className="font-semibold text-gray-900 text-sm">
                                      {student.name}
                                    </p>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-xs text-gray-500">
                                  {student.email}
                                </td>
                                <td className="px-4 py-3">
                                  <a
                                    href={`tel:${student.phone}`}
                                    className="text-xs text-green-600 hover:underline font-medium"
                                  >
                                    {student.phone}
                                  </a>
                                </td>
                                <td className="px-4 py-3 text-xs text-gray-500 max-w-[130px] leading-relaxed">
                                  {student.course || "—"}
                                </td>
                                <td className="px-4 py-3 text-xs text-gray-500">
                                  {student.state || "—"}
                                </td>
                                <td className="px-4 py-3">
                                  <span
                                    className={`text-xs font-bold px-2.5 py-1 rounded-lg ${student.status === "approved" ? "bg-green-50 text-green-700 border border-green-100" : "bg-gray-50 text-gray-500 border border-gray-100"}`}
                                  >
                                    {student.status === "approved"
                                      ? "🎓 Enrolled"
                                      : "⏳ Pending"}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-xs text-gray-400">
                                  {new Date(
                                    student.createdAt,
                                  ).toLocaleDateString("en-IN")}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Videos */}
            {tab === "courses" && (
              <div className="flex flex-col gap-4">
                <div className="bg-white rounded-2xl p-5 border border-gray-100">
                  <h2 className="font-bold text-gray-900 text-sm mb-3">
                    Select Course to Manage
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                    {managedCourses.map((course) => (
                      <button
                        key={course.slug}
                        onClick={() => {
                          setSelectedCourse(course);
                          loadCourseModules(course.slug);
                        }}
                        className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all min-h-[44px]
                          ${selectedCourse?.slug === course.slug ? "bg-green-700 text-white border-green-700" : "bg-gray-50 text-gray-600 border-gray-100 active:bg-gray-100"}`}
                      >
                        {course.title}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedCourse && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-4">
                      {/* Add module */}
                      <div className="bg-white rounded-2xl p-5 border border-gray-100">
                        <h3 className="font-bold text-gray-900 text-sm mb-3">
                          Add New Module
                        </h3>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newModule}
                            onChange={(e) => setNewModule(e.target.value)}
                            placeholder="e.g. Naturopathy Basics"
                            className={inputClass}
                          />
                          <button
                            onClick={() =>
                              addModule(
                                selectedCourse.slug,
                                selectedCourse.title,
                              )
                            }
                            className="bg-green-700 text-white text-xs font-bold px-4 rounded-xl whitespace-nowrap min-h-[44px]"
                          >
                            Add
                          </button>
                        </div>
                      </div>

                      {/* Add lesson */}
                      <div className="bg-white rounded-2xl p-5 border border-gray-100">
                        <h3 className="font-bold text-gray-900 text-sm mb-4">
                          Add Video or Assignment
                        </h3>
                        <div className="flex flex-col gap-3.5">
                          <div>
                            <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                              Module <span className="text-red-400">*</span>
                            </label>
                            {courseModules.length === 0 ? (
                              <div className="bg-amber-50 border border-amber-100 rounded-xl px-3 py-2.5 text-xs text-amber-700">
                                No modules yet — add one first.
                              </div>
                            ) : (
                              <select
                                value={newLesson.moduleId}
                                onChange={(e) =>
                                  setNewLesson({
                                    ...newLesson,
                                    moduleId: e.target.value,
                                  })
                                }
                                className={inputClass}
                              >
                                <option value="">Choose module...</option>
                                {courseModules.map((m) => (
                                  <option key={m._id} value={m._id}>
                                    {m.title}
                                  </option>
                                ))}
                              </select>
                            )}
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                              Type
                            </label>
                            <div className="flex gap-2">
                              {["video", "assignment"].map((t) => (
                                <button
                                  key={t}
                                  onClick={() =>
                                    setNewLesson({ ...newLesson, type: t })
                                  }
                                  className={`flex-1 py-3 rounded-xl text-xs font-semibold transition-all ${newLesson.type === t ? "bg-green-700 text-white" : "bg-gray-100 text-gray-600"}`}
                                >
                                  {t === "video" ? "🎥 Video" : "📝 Assignment"}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                              Lesson Title{" "}
                              <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="text"
                              value={newLesson.title}
                              onChange={(e) =>
                                setNewLesson({
                                  ...newLesson,
                                  title: e.target.value,
                                })
                              }
                              placeholder="e.g. Introduction to Naturopathy"
                              className={inputClass}
                            />
                          </div>
                          {newLesson.type === "video" && (
                            <>
                              <div>
                                <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                                  Video Source
                                </label>
                                <select
                                  value={newLesson.videoSource}
                                  onChange={(e) =>
                                    setNewLesson({
                                      ...newLesson,
                                      videoSource: e.target.value,
                                    })
                                  }
                                  className={inputClass}
                                >
                                  <option value="youtube">YouTube</option>
                                  <option value="googledrive">
                                    Google Drive
                                  </option>
                                  <option value="vimeo">Vimeo</option>
                                  <option value="direct">
                                    Direct MP4 Link
                                  </option>
                                </select>
                              </div>
                              <div>
                                <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                                  Video URL{" "}
                                  <span className="text-red-400">*</span>
                                </label>
                                <input
                                  type="text"
                                  value={newLesson.videoUrl}
                                  onChange={(e) =>
                                    setNewLesson({
                                      ...newLesson,
                                      videoUrl: e.target.value,
                                    })
                                  }
                                  placeholder={
                                    newLesson.videoSource === "youtube"
                                      ? "https://youtube.com/watch?v=..."
                                      : "Paste video URL here"
                                  }
                                  className={inputClass}
                                />
                              </div>
                              <div>
                                <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                                  Duration (optional)
                                </label>
                                <input
                                  type="text"
                                  value={newLesson.duration}
                                  onChange={(e) =>
                                    setNewLesson({
                                      ...newLesson,
                                      duration: e.target.value,
                                    })
                                  }
                                  placeholder="e.g. 08:29"
                                  className={inputClass}
                                />
                              </div>
                            </>
                          )}
                          {newLesson.type === "assignment" && (
                            <div>
                              <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                                File URL
                              </label>
                              <input
                                type="text"
                                value={newLesson.fileUrl}
                                onChange={(e) =>
                                  setNewLesson({
                                    ...newLesson,
                                    fileUrl: e.target.value,
                                  })
                                }
                                placeholder="https://drive.google.com/..."
                                className={inputClass}
                              />
                            </div>
                          )}
                          <div
                            className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 cursor-pointer"
                            onClick={() =>
                              setNewLesson({
                                ...newLesson,
                                preview: !newLesson.preview,
                              })
                            }
                          >
                            <div>
                              <p className="text-xs font-semibold text-gray-700">
                                Free Preview
                              </p>
                              <p className="text-xs text-gray-400">
                                Visible without enrollment
                              </p>
                            </div>
                            <div
                              className={`w-10 h-6 rounded-full transition-colors relative flex-shrink-0 ${newLesson.preview ? "bg-green-600" : "bg-gray-200"}`}
                            >
                              <span
                                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${newLesson.preview ? "left-5" : "left-1"}`}
                              />
                            </div>
                          </div>
                          <button
                            onClick={() => addLesson(selectedCourse.slug)}
                            className="w-full inline-flex items-center justify-center gap-2 bg-green-700 text-white font-bold text-sm py-3.5 rounded-xl"
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <line x1="12" y1="5" x2="12" y2="19" />
                              <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            Add to Course
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Current content */}
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-gray-900 text-sm">
                            Current Content
                          </h3>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {courseModules.length} modules ·{" "}
                            {courseModules.reduce(
                              (a, m) => a + (m.lessons?.length || 0),
                              0,
                            )}{" "}
                            lessons
                          </p>
                        </div>
                        <button
                          onClick={() => loadCourseModules(selectedCourse.slug)}
                          className="text-xs text-green-600 font-medium"
                        >
                          Refresh
                        </button>
                      </div>
                      {videoLoading ? (
                        <div className="p-10 flex flex-col items-center gap-2">
                          <Spinner />
                          <p className="text-gray-400 text-xs">Loading...</p>
                        </div>
                      ) : courseModules.length === 0 ? (
                        <div className="p-10 text-center">
                          <p className="text-gray-400 text-sm">
                            No content yet
                          </p>
                          <p className="text-gray-300 text-xs mt-1">
                            Add a module first.
                          </p>
                        </div>
                      ) : (
                        <div className="max-h-[520px] overflow-y-auto divide-y divide-gray-50">
                          {courseModules.map((module) => (
                            <div key={module._id} className="p-4">
                              <div className="flex items-center justify-between mb-2.5">
                                <p className="font-bold text-gray-800 text-sm">
                                  📁 {module.title}
                                </p>
                                <span className="text-xs text-gray-400">
                                  {module.lessons?.length || 0}
                                </span>
                              </div>
                              <div className="ml-4 flex flex-col">
                                {module.lessons?.map((lesson) => (
                                  <div
                                    key={lesson._id}
                                    className="flex items-center gap-2 py-2.5 border-b border-gray-50 last:border-0"
                                  >
                                    <span className="text-sm flex-shrink-0">
                                      {lesson.type === "video" ? "🎥" : "📝"}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-xs text-gray-700 font-medium leading-snug truncate">
                                        {lesson.title}
                                        {lesson.preview && (
                                          <span className="ml-1.5 text-green-500">
                                            (Preview)
                                          </span>
                                        )}
                                      </p>
                                      <p className="text-[10px] text-gray-400">
                                        {lesson.videoSource} ·{" "}
                                        {lesson.duration || "No duration"}
                                      </p>
                                    </div>
                                    <button
                                      onClick={() =>
                                        deleteLesson(
                                          selectedCourse.slug,
                                          module._id,
                                          lesson._id,
                                        )
                                      }
                                      className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-red-500 active:text-red-600 hover:bg-red-50 active:bg-red-100 rounded-lg transition-all flex-shrink-0"
                                    >
                                      <svg
                                        width="13"
                                        height="13"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                      >
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" />
                                      </svg>
                                    </button>
                                  </div>
                                ))}
                                {(!module.lessons ||
                                  module.lessons.length === 0) && (
                                  <p className="text-xs text-gray-300 py-1.5">
                                    No lessons yet
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/*  Blogs */}
            {tab === "blogs" && (
              <div className="flex flex-col gap-6">
                {/* Sub Tabs */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
                  {[
                    { key: "list", label: "📋 All Blogs" },
                    { key: "add", label: "✍️ Write Blog" },
                    { key: "bulk", label: "📦 Bulk Upload" },
                  ].map((t) => (
                    <button
                      key={t.key}
                      onClick={() => {
                        setBlogTab(t.key);
                        if (t.key === "list") loadAdminBlogs();
                      }}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap flex-shrink-0
                        ${
                          blogTab === t.key
                            ? "bg-green-700 text-white"
                            : "bg-white text-gray-600 border border-gray-200 hover:border-green-300"
                        }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* All Blogs List */}
                {blogTab === "list" && (
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex gap-3 items-center">
                      <input
                        type="text"
                        value={blogSearch}
                        onChange={(e) => setBlogSearch(e.target.value)}
                        placeholder="Search blogs..."
                        className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500"
                      />
                      <button
                        onClick={loadAdminBlogs}
                        className="bg-green-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl"
                      >
                        Search
                      </button>
                      <span className="text-xs text-gray-400 flex-shrink-0">
                        {blogTotal} total
                      </span>
                    </div>

                    {blogLoading ? (
                      <div className="p-10 text-center">
                        <p className="text-gray-400 text-sm">
                          ⏳ Loading blogs...
                        </p>
                      </div>
                    ) : adminBlogs.length === 0 ? (
                      <div className="p-10 text-center">
                        <p className="text-4xl mb-2">📭</p>
                        <p className="text-gray-400 text-sm">No blogs yet</p>
                        <button
                          onClick={() => setBlogTab("add")}
                          className="mt-3 text-green-600 text-xs hover:underline"
                        >
                          Write your first blog →
                        </button>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                              {[
                                "Title",
                                "Category",
                                "Language",
                                "Status",
                                "Views",
                                "Date",
                                "Action",
                              ].map((h) => (
                                <th
                                  key={h}
                                  className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase"
                                >
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {adminBlogs.map((blog) => (
                              <tr
                                key={blog._id}
                                className="border-b border-gray-50 hover:bg-gray-50"
                              >
                                <td className="px-4 py-3">
                                  <p className="text-sm font-medium text-gray-800 max-w-48 line-clamp-1">
                                    {blog.title}
                                  </p>
                                </td>
                                <td className="px-4 py-3 text-xs text-gray-600">
                                  {blog.category}
                                </td>
                                <td className="px-4 py-3 text-xs text-gray-600 capitalize">
                                  {blog.language}
                                </td>
                                <td className="px-4 py-3">
                                  <span
                                    className={`text-xs font-bold px-2 py-1 rounded-full
                                    ${
                                      blog.status === "published"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-gray-100 text-gray-600"
                                    }`}
                                  >
                                    {blog.status}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-xs text-gray-600">
                                  {blog.views || 0}
                                </td>
                                <td className="px-4 py-3 text-xs text-gray-400">
                                  {new Date(blog.createdAt).toLocaleDateString(
                                    "en-IN",
                                  )}
                                </td>
                                <td className="px-4 py-3">
                                  <button
                                    onClick={() => deleteBlog(blog._id)}
                                    className="text-red-400 hover:text-red-600 text-xs px-2 py-1 rounded hover:bg-red-50"
                                  >
                                    🗑️ Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* Write Blog */}
                {blogTab === "add" && (
                  <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <h3 className="font-bold text-gray-900 text-base mb-5">
                      ✍️ Write New Blog
                    </h3>
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-gray-500 block mb-1">
                            Title *
                          </label>
                          <input
                            type="text"
                            value={newBlog.title}
                            onChange={(e) =>
                              setNewBlog({ ...newBlog, title: e.target.value })
                            }
                            placeholder="Blog title"
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-500 block mb-1">
                            Category
                          </label>
                          <input
                            type="text"
                            value={newBlog.category}
                            onChange={(e) =>
                              setNewBlog({
                                ...newBlog,
                                category: e.target.value,
                              })
                            }
                            placeholder="e.g. Pain Relief, Diet, Yoga"
                            className={inputClass}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-gray-500 block mb-1">
                            Language
                          </label>
                          <select
                            value={newBlog.language}
                            onChange={(e) =>
                              setNewBlog({
                                ...newBlog,
                                language: e.target.value,
                              })
                            }
                            className={`${inputClass} cursor-pointer`}
                          >
                            <option value="hindi">Hindi</option>
                            <option value="english">English</option>
                            <option value="marathi">Marathi</option>
                            <option value="gujarati">Gujarati</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-500 block mb-1">
                            Icon
                          </label>
                          <select
                            value={newBlog.icon}
                            onChange={(e) =>
                              setNewBlog({ ...newBlog, icon: e.target.value })
                            }
                            className={`${inputClass} cursor-pointer`}
                          >
                            {iconOptions.map((icon) => (
                              <option key={icon} value={icon}>
                                {icon}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-500 block mb-1">
                            Status
                          </label>
                          <select
                            value={newBlog.status}
                            onChange={(e) =>
                              setNewBlog({ ...newBlog, status: e.target.value })
                            }
                            className={`${inputClass} cursor-pointer`}
                          >
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 block mb-1">
                          Tags (comma separated)
                        </label>
                        <input
                          type="text"
                          value={newBlog.tags}
                          onChange={(e) =>
                            setNewBlog({ ...newBlog, tags: e.target.value })
                          }
                          placeholder="health, yoga, diet, naturopathy"
                          className={inputClass}
                        />
                      </div>

                      {/* Cover Image */}
                      <div>
                        <label className="text-xs font-semibold text-gray-500 block mb-1">
                          Cover Image (Upload or URL)
                        </label>

                        {/* Upload Button */}
                        <div className="flex gap-2 mb-3">
                          <label className="flex-1 cursor-pointer">
                            <div className="bg-green-50 border-2 border-dashed border-green-300 rounded-xl px-4 py-6 text-center hover:bg-green-100 transition-colors">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="mx-auto text-green-600 mb-2"
                              >
                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                <polyline points="17 8 12 3 7 8" />
                                <line x1="12" y1="3" x2="12" y2="15" />
                              </svg>
                              <p className="text-xs font-semibold text-green-700">
                                {newBlog.image
                                  ? "✅ Image Selected"
                                  : "📸 Click to Upload"}
                              </p>
                              <p className="text-[10px] text-green-600 mt-1">
                                JPG, PNG (max 5MB)
                              </p>
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e)}
                              className="hidden"
                            />
                          </label>
                        </div>

                        {/* URL Input */}
                        <div>
                          <p className="text-xs text-gray-400 mb-2">
                            Or paste image URL:
                          </p>
                          <input
                            type="text"
                            value={newBlog.image}
                            onChange={(e) =>
                              setNewBlog({ ...newBlog, image: e.target.value })
                            }
                            placeholder="https://images.unsplash.com/... (optional)"
                            className={inputClass}
                          />
                        </div>

                        {/* Image Preview */}
                        {newBlog.image && (
                          <div className="mt-3 relative">
                            <img
                              src={newBlog.image}
                              alt="preview"
                              className="w-full h-40 object-cover rounded-xl border border-gray-100"
                              onError={(e) => (e.target.style.display = "none")}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setNewBlog({ ...newBlog, image: "" })
                              }
                              className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-lg hover:bg-red-600"
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                      {/* Image Caption */}
                      <div>
                        <label className="text-xs font-semibold text-gray-500 block mb-1">
                          Image Caption (optional)
                        </label>
                        <input
                          type="text"
                          value={newBlog.imageCaption}
                          onChange={(e) =>
                            setNewBlog({
                              ...newBlog,
                              imageCaption: e.target.value,
                            })
                          }
                          placeholder="Photo description or credit"
                          className={inputClass}
                        />
                      </div>
                      {/* Author */}
                      <div>
                        <label className="text-xs font-semibold text-gray-500 block mb-1">
                          Author Name
                        </label>
                        <input
                          type="text"
                          value={newBlog.author}
                          onChange={(e) =>
                            setNewBlog({ ...newBlog, author: e.target.value })
                          }
                          placeholder="Dr. Name or Saffron5 Institute"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 block mb-1">
                          Short Excerpt (optional — auto generated if empty)
                        </label>
                        <input
                          type="text"
                          value={newBlog.excerpt}
                          onChange={(e) =>
                            setNewBlog({ ...newBlog, excerpt: e.target.value })
                          }
                          placeholder="Brief description shown on blog listing..."
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 block mb-1">
                          Content * (paste full article here)
                        </label>
                        <textarea
                          value={newBlog.content}
                          onChange={(e) =>
                            setNewBlog({ ...newBlog, content: e.target.value })
                          }
                          rows={15}
                          placeholder="Paste your full blog article content here...

                            Works with Hindi, English, Marathi, Gujarati text.
                            Just copy paste from Word / WhatsApp / anywhere!"
                          className={`${inputClass} resize-none font-mono`}
                        />
                        <p className="text-xs text-gray-400 mt-1">
                          {newBlog.content.length} characters
                        </p>
                      </div>
                      <button
                        onClick={publishBlog}
                        className="w-full bg-green-700 hover:bg-green-800 text-white font-bold text-sm py-4 rounded-xl transition-colors"
                      >
                        🚀 Publish Blog
                      </button>
                    </div>
                  </div>
                )}

                {/* Bulk Upload */}
                {blogTab === "bulk" && (
                  <div className="flex flex-col gap-5">
                    {/* Instructions */}
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                      <h3 className="font-bold text-blue-900 text-sm mb-3">
                        📦 How to Bulk Upload 500 Blogs
                      </h3>
                      <div className="flex flex-col gap-2 text-xs text-blue-700">
                        <p>1. Format your blogs as JSON array below</p>
                        <p>
                          2. Each blog needs: title, content, category, language
                        </p>
                        <p>3. Paste the JSON and click "Upload All"</p>
                        <p>4. All blogs upload at once! ✅</p>
                      </div>
                      <div className="mt-3 bg-white rounded-xl p-3 border border-blue-100">
                        <p className="text-xs font-semibold text-gray-600 mb-2">
                          Example Format:
                        </p>
                        <pre className="text-xs text-gray-500 overflow-x-auto">{`[
                              {
                                "title": "गर्दन दर्द से राहत",
                                "content": "पूरा आर्टिकल यहाँ...",
                                "category": "Pain Relief",
                                "language": "hindi",
                                "icon": "💆‍♀️",
                                "tags": ["health", "pain", "yoga"]
                              },
                              {
                                "title": "Healthy Diet Tips",
                                "content": "Full article here...",
                                "category": "Diet",
                                "language": "english",
                                "icon": "🥗",
                                "tags": ["diet", "health"]
                              }
                            ]`}</pre>
                      </div>
                    </div>

                    {/* Bulk Upload Form */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-100">
                      <h3 className="font-bold text-gray-900 text-sm mb-4">
                        Paste Your Blog Data (JSON format)
                      </h3>
                      <textarea
                        value={bulkText}
                        onChange={(e) => setBulkText(e.target.value)}
                        rows={20}
                        placeholder='[
                        {
                          "title": "Your Blog Title",
                          "content": "Full article content...",
                          "category": "Health",
                          "language": "hindi"
                        }
                      ]'
                        className={`${inputClass} resize-none font-mono`}
                      />
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-xs text-gray-400">
                          {bulkText.length > 0
                            ? `${bulkText.length} characters pasted`
                            : "Paste JSON data above"}
                        </p>
                        <button
                          onClick={bulkUpload}
                          disabled={bulkLoading || !bulkText.trim()}
                          className={`font-bold text-sm px-6 py-3 rounded-xl transition-all text-white
                            ${
                              bulkLoading || !bulkText.trim()
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-700 hover:bg-green-800"
                            }`}
                        >
                          {bulkLoading
                            ? "⏳ Uploading..."
                            : "📦 Upload All Blogs"}
                        </button>
                      </div>
                    </div>

                    {/* CSV Helper Note */}
                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
                      <h3 className="font-bold text-amber-800 text-sm mb-2">
                        💡 Have data in Excel/Word/WhatsApp?
                      </h3>
                      <p className="text-amber-700 text-xs leading-relaxed">
                        Tell me what format your 500 blogs are in and I'll write
                        a script to convert them to JSON automatically! Just
                        share a sample of your data.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
