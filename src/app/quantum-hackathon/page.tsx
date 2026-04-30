"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useState } from "react";

export default function QuantumHackathonPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    major: "",
    minor: "",
    year: "",
    linkedin: "",
    github: "",
    interest: "",
  });
  const [noLinkedin, setNoLinkedin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/register-hackathon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, noLinkedin }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          age: "",
          major: "",
          minor: "",
          year: "",
          linkedin: "",
          github: "",
          interest: "",
        });
        setNoLinkedin(false);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNoLinkedinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setNoLinkedin(checked);
    if (checked) {
      setFormData((prev) => ({ ...prev, linkedin: "" }));
    }
  };

  // Shared input/select class — uniform navy blue across all fields
  const fieldClass =
    "w-full bg-[#0d1b3e]/70 border border-white/20 rounded px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors";

  return (
    <main className="min-h-screen bg-black text-white font-[family-name:var(--font-inter)]">
      <Navbar darkText />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-32">
        {/* Back Link */}
        <Link
          href="/announcements"
          className="inline-block text-white/60 hover:text-white transition-colors mb-16 font-light"
        >
          ← Back to Announcements
        </Link>

        {/* Page Header */}
        <header className="mb-16">
          <h1 className="font-[family-name:var(--font-iceland)] font-normal text-[60px] md:text-[80px] lg:text-[100px] leading-none mb-4">
            Enotrium xx Do Quantum Hackathon
          </h1>
          <div className="h-px bg-white w-full"></div>
        </header>

        {/* Event Details */}
        <section className="max-w-4xl space-y-8">
          <div className="border-b border-white/20 pb-8">
            <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
            <div className="space-y-3 text-white/80">
              <p>
                <span className="text-white/60 block text-xs tracking-[0.05em] mb-1">DATE</span>
                Saturday, May 16, 2026
              </p>
              <p>
                <span className="text-white/60 block text-xs tracking-[0.05em] mb-1">TIME</span>
                1:00 PM
              </p>
            </div>
          </div>

          <div className="border-b border-white/20 pb-8">
            <h2 className="text-2xl font-semibold mb-4">About</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Join the Enotrium x DO Quantum Hackathon! This exciting event brings together developers, researchers,
              and quantum computing enthusiasts to collaborate on innovative projects at the intersection of quantum
              computing and AI.
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              Enotrium and DO Quantum are working together in solving humanity's most pressing technological and
              civilizational problems: edge AI, sustainability, biomaterials, sensor integration, edge device
              controllers, drone operations, and more.
            </p>
            <p className="text-white/80 leading-relaxed">
              We are excited to partner with DO Quantum for an epic hackathon! —The winner gets an on-the-spot offer
              to join Enotrium.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Registration</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs tracking-[0.05em] text-white/60 mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.05em] text-white/60 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className={fieldClass}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs tracking-[0.05em] text-white/60 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={fieldClass}
                />
              </div>

              {/* Age + Year */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs tracking-[0.05em] text-white/60 mb-2">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.05em] text-white/60 mb-2">Year</label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                    className={fieldClass}
                  >
                    <option value="">Select Year</option>
                    <option value="Freshman">Freshman</option>
                    <option value="Sophomore">Sophomore</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Major + Minor */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs tracking-[0.05em] text-white/60 mb-2">Major</label>
                  <input
                    type="text"
                    name="major"
                    value={formData.major}
                    onChange={handleChange}
                    required
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.05em] text-white/60 mb-2">Minor</label>
                  <input
                    type="text"
                    name="minor"
                    value={formData.minor}
                    onChange={handleChange}
                    required
                    className={fieldClass}
                  />
                </div>
              </div>

              {/* LinkedIn + GitHub */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs tracking-[0.05em] text-white/60 mb-2">LinkedIn</label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    required={!noLinkedin}
                    disabled={noLinkedin}
                    placeholder={noLinkedin ? "N/A" : "https://linkedin.com/in/..."}
                    className={`${fieldClass} disabled:opacity-40 disabled:cursor-not-allowed`}
                  />
                  {/* "No LinkedIn" checkbox */}
                  <label className="inline-flex items-center gap-2 mt-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={noLinkedin}
                      onChange={handleNoLinkedinChange}
                      className="w-4 h-4 rounded border border-white/30 bg-[#0d1b3e]/70 accent-white cursor-pointer"
                    />
                    <span className="text-xs text-white/50">I don't have a LinkedIn</span>
                  </label>
                </div>
                <div>
                  <label className="block text-xs tracking-[0.05em] text-white/60 mb-2">GitHub</label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    required
                    placeholder="https://github.com/..."
                    className={fieldClass}
                  />
                </div>
              </div>

              {/* Interest */}
              <div>
                <label className="block text-xs tracking-[0.05em] text-white/60 mb-2">
                  Are you interested in joining Enotrium or Do Quantum?
                </label>
                <select
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  required
                  className={fieldClass}
                >
                  <option value="">Select Option</option>
                  <option value="Enotrium">Enotrium</option>
                  <option value="Do Quantum">Do Quantum</option>
                  <option value="Both">Both</option>
                  <option value="Neither">Neither</option>
                </select>
              </div>

              {submitStatus === "success" && (
                <div className="bg-green-500/20 border border-green-500/40 rounded px-4 py-3 text-green-400 text-sm">
                  Registration successful! Check your email for confirmation.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="bg-red-500/20 border border-red-500/40 rounded px-4 py-3 text-red-400 text-sm">
                  Registration failed. Please try again.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black font-semibold px-6 py-3 rounded hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Register"}
              </button>
            </form>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
