import React, { useState } from "react";
import Reveal from "../components/Reveal";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 🔒 SECURITY CHECK: Strip out empty leading or trailing characters
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // 🚀 FULL-STACK UPGRADE: Dispatches message information direct to your unified Express API route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      console.error("Inquiry pipeline failure:", err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full mt-20 overflow-hidden bg-[#fffdfc]">

      {/* HERO */}
      <div className="relative px-6 py-20 md:py-28 text-center">
        {/* 🐛 BUG FIX: Swapped out non-standard Tailwind sizing indicators for secure styling fractions */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#805374]/10 rounded-full blur-3xl opacity-60 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-medium text-[#805374] tracking-tight">
            Let’s create something beautiful
          </h1>
          <p className="text-gray-500 mt-6 text-base md:text-lg leading-relaxed">
            Whether it’s an intimate celebration or a grand occasion,
            Bloom & Blossom is here to craft floral experiences filled
            with elegance, warmth, and emotion.
          </p>
        </div>
      </div>

      {/* CONTACT SECTION */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-10 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">

            {/* INFO CARDS (LEFT) */}
            <div className="space-y-6">
              {[
                {
                  title: "Business Inquiries",
                  text: "Custom floral arrangements for birthdays, weddings, luxury events, and intimate celebrations.",
                },
                {
                  title: "Response Time",
                  text: "We usually reply within 24 hours during business days.",
                },
                {
                  title: "Email",
                  text: "hello@bloomandblossom.com",
                },
              ].map((item) => (
                <div
                  key={item.title} // 🚀 DEPLOYMENT FIX: Used stable unique values instead of generic index integers
                  className="bg-white/70 backdrop-blur-xl border border-[#f1e7e7] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <h3 className="text-[#805374] font-medium mb-2 text-lg">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* CONTACT FORM LAYER (RIGHT) */}
            <form
              onSubmit={handleSubmit}
              className="bg-white/70 backdrop-blur-xl border border-[#f1e7e7] shadow-sm rounded-3xl p-6 md:p-8 space-y-5"
            >
              <div>
                <label className="text-sm font-medium text-gray-600">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full mt-2 px-4 py-3 rounded-2xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#805374]/20 focus:border-[#805374] transition"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full mt-2 px-4 py-3 rounded-2xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#805374]/20 focus:border-[#805374] transition"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Tell us about your event..."
                  className="w-full mt-2 px-4 py-3 rounded-2xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#805374]/20 focus:border-[#805374] transition resize-none"
                />
              </div>

              {/* ⭐ PRESENTATION STATUS LAYOUT BAR */}
              {submitStatus === "success" && (
                <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl text-sm font-medium animate-fade-in">
                  🌸 Inquiry sent beautifully! We will connect with you soon.
                </div>
              )}
              {submitStatus === "error" && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm font-medium">
                  ⚠️ Connection anomaly encountered. Please try dispatching again.
                </div>
              )}

              {/* ⚡ PERFORMANCE BUTTON ENGINE */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#805374] text-white py-3 rounded-2xl font-medium hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  "Send Inquiry"
                )}
              </button>
            </form>

          </div>

          {/* DYNAMIC MAP EMBED */}
          <Reveal>
            <div className="mt-20">
              <div className="text-center mb-6">
                <h3 className="text-[#805374] text-xl font-medium">Our Location</h3>
                <p className="text-gray-500 text-sm mt-2">
                  Visit our studio workshop or send your floral inquiries online
                </p>
              </div>

              {/* 📱 RESPONSIVE TOUCH INTERACTION CONTAINER FIX */}
              <div className="rounded-3xl overflow-hidden shadow-sm border border-[#eadede] relative group">
                <iframe
                  title="Bloom & Blossom Location Workspace"
                  /* 🚀 DEPLOYMENT FIX: Set to a structural placeholder coordinates layout */
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2157071649653!2d-73.98566442342571!3d40.75807983483489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25859a6d4e589%3A0x8a1c35c60205b3c3!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  className="w-full h-72 md:h-105 transition-all duration-300 pointer-events-none group-focus:pointer-events-auto group-click:pointer-events-auto"
                  loading="lazy"
                ></iframe>
                {/* Visual click overlay indicator enabling safe mobile device document scrolling */}
                <div className="absolute inset-0 bg-transparent pointer-events-none block md:hidden group-focus:hidden" />
              </div>
            </div>
          </Reveal>

        </section>
      </Reveal>
    </div>
  );
}

export default Contact;