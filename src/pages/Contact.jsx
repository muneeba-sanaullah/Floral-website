import React, { useState } from "react";
import Reveal from "../components/Reveal";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate a successful form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setForm({ name: "", email: "", message: "" });
      
      // Optional: Professional success alert
      alert(" Thank you! Your inquiry has been received. We will be in touch shortly.");
    }, 1500);
  };

  return (
    <div className="w-full mt-20 overflow-hidden bg-[#fffdfc]">

      {/* HERO */}
      <div className="relative px-6 py-20 md:py-28 text-center">
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
                { title: "Business Inquiries", text: "Custom floral arrangements for birthdays, weddings, luxury events, and intimate celebrations." },
                { title: "Response Time", text: "We usually reply within 24 hours during business days." },
                { title: "Email", text: "hello@bloomandblossom.com" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white/70 backdrop-blur-xl border border-[#f1e7e7] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <h3 className="text-[#805374] font-medium mb-2 text-lg">{item.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            {/* CONTACT FORM (RIGHT) */}
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

              {submitStatus === "success" && (
                <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl text-sm font-medium">
                   Inquiry sent beautifully! We will connect with you soon.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#805374] text-white py-3 cursor-pointer rounded-2xl font-medium hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
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
        </section>
      </Reveal>
    </div>
  );
}

export default Contact;