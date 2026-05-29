import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import emailConfig from "../data/config";
import courses from "../data/courses";

const qualifications = [
  "10th Pass (SSC)",
  "12th Pass (HSC)",
  "Graduate (Any Stream)",
  "Post Graduate",
  "Doctorate (PhD)",
  "Other",
];

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Outside India",
];

const steps = ["Personal Info", "Course Selection", "Review & Submit"];

// ─── Reusable bottom-sheet select ────────────────────────────────────────────
function MobileSelect({ value, onChange, options, placeholder, searchable = true }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = searchable
    ? options.filter((o) => o.toLowerCase().includes(query.toLowerCase()))
    : options;

  const handlePick = (opt) => {
    onChange(opt);
    setQuery("");
    setSheetOpen(false);
  };

  const handleClose = () => {
    setQuery("");
    setSheetOpen(false);
  };

  const baseInput =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-colors bg-white";

  return (
    <div>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setSheetOpen(true)}
        className={`${baseInput} flex items-center justify-between text-left ${
          value ? "text-gray-900" : "text-gray-400"
        }`}
      >
        <span className="truncate pr-2">{value || placeholder}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${sheetOpen ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* ── Mobile bottom sheet ── */}
      {sheetOpen && (
        <div className="sm:hidden">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/40 z-40" onClick={handleClose} />

          {/* Sheet */}
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl max-h-[72vh] flex flex-col shadow-2xl">
            {/* Handle */}
            <div className="w-9 h-1 bg-gray-200 rounded-full mx-auto mt-3 flex-shrink-0" />

            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-3 pb-2 flex-shrink-0">
              <span className="font-bold text-gray-900 text-base">{placeholder}</span>
              <button
                type="button"
                onClick={handleClose}
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xl leading-none hover:bg-gray-200 transition-colors"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Search (only if searchable) */}
            {searchable && (
              <div className="px-4 pb-2 flex-shrink-0 relative">
                <svg
                  className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                  className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 bg-gray-50 transition-all"
                />
              </div>
            )}

            {/* Options */}
            <div className="overflow-y-auto flex-1 px-2 pb-6">
              {filtered.length === 0 ? (
                <p className="text-center text-gray-400 text-sm py-8">No results found</p>
              ) : (
                filtered.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handlePick(opt)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm flex items-center justify-between gap-3 transition-colors active:scale-[0.99]
                      ${value === opt
                        ? "bg-green-50 text-green-700 font-semibold"
                        : "text-gray-700 hover:bg-gray-50 active:bg-green-50"
                      }`}
                  >
                    <span>{opt}</span>
                    {value === opt && (
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="text-green-600 flex-shrink-0"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Desktop dropdown ── */}
      {sheetOpen && (
        <div className="hidden sm:block relative z-30">
          {/* Click-away */}
          <div className="fixed inset-0" onClick={handleClose} />

          <div className="absolute top-1 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-30">
            {searchable && (
              <div className="p-2 border-b border-gray-100 relative">
                <svg
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                  className="w-full border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-green-500 bg-gray-50"
                />
              </div>
            )}
            <div className="max-h-56 overflow-y-auto py-1">
              {filtered.length === 0 ? (
                <p className="text-center text-gray-400 text-sm py-4">No results found</p>
              ) : (
                filtered.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handlePick(opt)}
                    className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between gap-3 transition-colors
                      ${value === opt
                        ? "bg-green-50 text-green-700 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    <span>{opt}</span>
                    {value === opt && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="text-green-600 flex-shrink-0"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

function Apply() {
  const formRef = useRef();
  const [currentStep, setCurrentStep] = useState(0);
  const [status, setStatus] = useState("idle");

  const [form, setForm] = useState({
    applicant_name: "",
    applicant_phone: "",
    applicant_email: "",
    applicant_state: "",
    applicant_city: "",
    applicant_qualification: "",
    applicant_course: "",
    applicant_fee: "",
    applicant_message: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "applicant_course") {
      const selected = courses.find((c) => c.title === e.target.value);
      setForm({
        ...form,
        applicant_course: e.target.value,
        applicant_fee: selected ? selected.fee : "",
      });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const isStep0Valid =
    form.applicant_name && form.applicant_phone && form.applicant_state;
  const isStep1Valid = form.applicant_course && form.applicant_qualification;

  const handleNext = () => {
    if (currentStep === 0 && !isStep0Valid) {
      alert("Please fill Name, Phone and State to continue.");
      return;
    }
    if (currentStep === 1 && !isStep1Valid) {
      alert("Please select a Course and Qualification to continue.");
      return;
    }
    setCurrentStep((s) => s + 1);
  };

  const handleBack = () => setCurrentStep((s) => s - 1);

  const handleSubmit = async () => {
    setStatus("sending");
    try {
      await emailjs.sendForm(
        emailConfig.serviceId,
        emailConfig.applyTemplateId,
        formRef.current,
        emailConfig.publicKey,
      );
      setStatus("success");
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  // SUCCESS SCREEN
  if (status === "success") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-sm max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <span className="text-4xl">🎉</span>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
            Application Submitted!
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-2">
            Thank you{" "}
            <span className="font-bold text-green-700">{form.applicant_name}</span>! Your application for
          </p>
          <p className="text-green-700 font-bold text-sm mb-1">{form.applicant_course}</p>
          <p className="text-amber-600 font-bold text-sm mb-4">Course Fee: {form.applicant_fee}</p>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            has been received. Our admission team will call you on
            <span className="font-bold text-gray-700"> {form.applicant_phone} </span>
            within 24 hours.
          </p>

          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-5 text-left">
            <p className="text-xs font-bold text-amber-800 mb-2">💳 Payment Details</p>
            <div className="text-xs text-amber-700 flex flex-col gap-1">
              <p>📱 PhonePe / GPay: <strong>7218315876</strong></p>
              <p>🏦 Bank of Baroda</p>
              <p>A/C: 94450100017137</p>
              <p>IFSC: BARBODBCDUR</p>
              <p className="mt-1 font-semibold">⚠️ Send payment screenshot on WhatsApp after payment!</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <p className="text-xs font-bold text-gray-700 mb-3">What happens next:</p>
            {[
              "📞 Our team calls you within 24 hours",
              "📋 We explain course details & fees",
              "💳 You complete payment",
              "🎓 You get instant course access",
            ].map((item) => (
              <p key={item} className="text-xs text-gray-600 mb-1.5">{item}</p>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <a
              href="https://wa.me/917218315876"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-bold text-sm py-3 rounded-xl transition-colors"
            >
              💬 Send Payment Screenshot on WhatsApp
            </a>
            <Link
              to="/"
              className="border border-gray-200 text-gray-600 font-semibold text-sm py-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <div className="bg-green-800 py-12 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-700 rounded-full opacity-20 translate-x-20 -translate-y-20 pointer-events-none" />
        <div className="relative max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs px-4 py-1.5 rounded-full mb-4">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            Admissions Open 2026
          </span>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-2">
            Apply for a Course
          </h1>
          <p className="text-green-100 text-sm">
            Takes 2 minutes. Our team will call you within 24 hours.
          </p>
        </div>
      </div>

      {/* Form Area */}
      <div className="bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all
                    ${
                      i < currentStep
                        ? "bg-green-700 text-white"
                        : i === currentStep
                          ? "bg-green-700 text-white ring-4 ring-green-100"
                          : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {i < currentStep ? "✓" : i + 1}
                  </div>
                  <span
                    className={`text-xs mt-1.5 font-medium hidden sm:block
                    ${i === currentStep ? "text-green-700" : "text-gray-400"}`}
                  >
                    {step}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 transition-all
                    ${i < currentStep ? "bg-green-700" : "bg-gray-200"}`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            {/* Hidden form for EmailJS */}
            <form ref={formRef} className="hidden">
              {Object.entries(form).map(([key, value]) => (
                <input key={key} type="hidden" name={key} defaultValue={value} />
              ))}
            </form>

            {/* STEP 0 — Personal Info */}
            {currentStep === 0 && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-1">Personal Information</h2>
                <p className="text-gray-400 text-xs mb-6">Tell us a bit about yourself</p>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="applicant_name"
                      value={form.applicant_name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="applicant_phone"
                        value={form.applicant_phone}
                        onChange={handleChange}
                        placeholder="+91 00000 00000"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="applicant_email"
                        value={form.applicant_email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* ── State — bottom sheet on mobile ── */}
                    <div>
                      <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                        State *
                      </label>
                      <MobileSelect
                        value={form.applicant_state}
                        onChange={(val) => setForm({ ...form, applicant_state: val })}
                        options={states}
                        placeholder="Select your state"
                        searchable={true}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                        City
                      </label>
                      <input
                        type="text"
                        name="applicant_city"
                        value={form.applicant_city}
                        onChange={handleChange}
                        placeholder="Your city"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 1 — Course Selection */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-1">Course Selection</h2>
                <p className="text-gray-400 text-xs mb-6">
                  Choose your program — fee is shown automatically
                </p>
                <div className="flex flex-col gap-4">
                  {/* Course Radio Cards */}
                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-2">
                      Select Course *
                    </label>
                    <div className="flex flex-col gap-2 max-h-80 overflow-y-auto pr-1">
                      {courses.map((course) => (
                        <label
                          key={course.id}
                          className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all
                            ${
                              form.applicant_course === course.title
                                ? "border-green-500 bg-green-50"
                                : "border-gray-200 hover:border-green-200 hover:bg-gray-50"
                            }`}
                        >
                          <input
                            type="radio"
                            name="applicant_course"
                            value={course.title}
                            checked={form.applicant_course === course.title}
                            onChange={handleChange}
                            className="mt-0.5 accent-green-700"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-800">{course.title}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <p className="text-xs text-gray-400">{course.duration}</p>
                              <span className="text-gray-300">·</span>
                              <p className="text-xs text-green-600 font-bold">{course.fee}</p>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Auto fee display */}
                  {form.applicant_fee && (
                    <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Selected Course Fee</p>
                        <p className="text-xl font-extrabold text-green-700">{form.applicant_fee}</p>
                      </div>
                      <span className="text-2xl">💰</span>
                    </div>
                  )}

                  {/* ── Qualification — bottom sheet on mobile ── */}
                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                      Highest Qualification *
                    </label>
                    <MobileSelect
                      value={form.applicant_qualification}
                      onChange={(val) => setForm({ ...form, applicant_qualification: val })}
                      options={qualifications}
                      placeholder="Select qualification"
                      searchable={false}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                      Any Questions or Message?
                    </label>
                    <textarea
                      name="applicant_message"
                      value={form.applicant_message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Ask anything about the course, fees, schedule..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 — Review */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-1">Review Your Application</h2>
                <p className="text-gray-400 text-xs mb-6">Confirm your details before submitting</p>

                <div className="flex flex-col gap-2 mb-5">
                  {[
                    { label: "Full Name", value: form.applicant_name },
                    { label: "Phone", value: form.applicant_phone },
                    { label: "Email", value: form.applicant_email || "Not provided" },
                    {
                      label: "Location",
                      value: `${form.applicant_city ? form.applicant_city + ", " : ""}${form.applicant_state}`,
                    },
                    { label: "Course Applied", value: form.applicant_course },
                    { label: "Course Fee", value: form.applicant_fee },
                    { label: "Qualification", value: form.applicant_qualification },
                    { label: "Message", value: form.applicant_message || "None" },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-3 py-2.5 border-b border-gray-50">
                      <span className="text-xs text-gray-400 w-28 flex-shrink-0 pt-0.5 font-medium">
                        {item.label}
                      </span>
                      <span
                        className={`text-sm font-semibold ${
                          item.label === "Course Fee" ? "text-green-700" : "text-gray-800"
                        }`}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-4">
                  <p className="text-xs font-bold text-amber-800 mb-2">💳 After Submitting — Pay Here:</p>
                  <div className="text-xs text-amber-700 flex flex-col gap-1">
                    <p>📱 PhonePe / GPay: <strong>7218315876</strong></p>
                    <p>🏦 Bank of Baroda A/C: <strong>94450100017137</strong></p>
                    <p>IFSC: <strong>BARBODBCDUR</strong></p>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-4">
                  <p className="text-green-800 text-xs leading-relaxed">
                    ✅ By submitting, you confirm that all details are correct. Our team will call you on{" "}
                    <strong>{form.applicant_phone}</strong> within 24 hours.
                  </p>
                </div>

                {status === "error" && (
                  <div className="bg-red-50 border border-red-100 rounded-xl p-3 mb-4 text-red-600 text-xs">
                    ⚠️ Something went wrong. Please try WhatsApp instead.
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-8">
              {currentStep > 0 && (
                <button
                  onClick={handleBack}
                  className="flex-1 border border-gray-200 text-gray-600 font-semibold text-sm py-3.5 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  ← Back
                </button>
              )}
              {currentStep < 2 && (
                <button
                  onClick={handleNext}
                  className="flex-1 bg-green-700 hover:bg-green-800 text-white font-bold text-sm py-3.5 rounded-xl transition-colors"
                >
                  Continue →
                </button>
              )}
              {currentStep === 2 && (
                <button
                  onClick={handleSubmit}
                  disabled={status === "sending"}
                  className={`flex-1 font-bold text-sm py-3.5 rounded-xl transition-all text-white
                    ${
                      status === "sending"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-700 hover:bg-green-800"
                    }`}
                >
                  {status === "sending" ? "⏳ Submitting..." : "🎓 Submit Application"}
                </button>
              )}
            </div>
          </div>

          {/* Bottom reassurance */}
          <div className="text-center mt-6">
            <p className="text-xs text-gray-400">🔒 Your information is safe and never shared.</p>
            <p className="text-xs text-gray-400 mt-1">
              Prefer to talk directly?{" "}
              <a
                href="https://wa.me/917218315876"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 font-semibold hover:underline"
              >
                Chat on WhatsApp →
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Apply;