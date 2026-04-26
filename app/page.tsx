"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SPECIALTIES = [
  {
    icon: "🫀",
    title: "Cardiology",
    desc: "Expert heart specialists for cardiac screenings, ECGs, and advanced cardiac care.",
  },
  {
    icon: "🧠",
    title: "Neurology",
    desc: "Comprehensive neurological care from epilepsy to stroke rehabilitation.",
  },
  {
    icon: "🦴",
    title: "Orthopaedics",
    desc: "Bone, joint and spine specialists for injuries, surgery, and physiotherapy.",
  },
  {
    icon: "👁️",
    title: "Ophthalmology",
    desc: "Eye care consultations, diagnostics, and surgical procedures.",
  },
  {
    icon: "🩺",
    title: "General Medicine",
    desc: "Primary care physicians for routine check-ups and chronic disease management.",
  },
  {
    icon: "🤰",
    title: "Gynaecology",
    desc: "Women's health specialists covering maternity, fertility, and wellness.",
  },
];

const STATS = [
  { value: "500+", label: "Verified Doctors" },
  { value: "10K+", label: "Happy Patients" },
  { value: "20+", label: "Specialties" },
  { value: "98%", label: "Satisfaction Rate" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold shadow">
              +
            </div>
            <span className="text-xl font-bold tracking-tight">MediBook</span>
          </div>

          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition shadow-sm"
          >
            Sign In
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/hospital-illustration.png"
          alt="Healthcare"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />

        {/* Gradient Accent */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/30 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-16 grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border border-border bg-card/60 backdrop-blur">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Trusted Healthcare Platform
            </div>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Your Health, <br /> Our Priority
            </h1>

            <p className="text-muted-foreground max-w-md mb-8">
              Book appointments with verified doctors in seconds. Fast, secure,
              and reliable healthcare at your fingertips.
            </p>

            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow hover:opacity-90 transition"
              >
                Get Started
              </Link>

              <a
                href="#specialties"
                className="text-sm font-medium hover:underline"
              >
                Browse Doctors
              </a>
            </div>

            <div className="flex items-center gap-6 mt-10">
              {[
                { icon: "✓", label: "Verified Doctors" },
                { icon: "🔒", label: "Secure & Private" },
                { icon: "⚡", label: "Instant Booking" },
              ].map((b) => (
                <div
                  key={b.label}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground"
                >
                  <span>{b.icon}</span>
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="hidden lg:block">
            <div className="bg-card/90 backdrop-blur rounded-2xl shadow-xl p-6 max-w-sm mx-auto border border-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  DR
                </div>
                <div>
                  <p className="font-semibold text-sm">Book an Appointment</p>
                  <p className="text-xs text-muted-foreground">
                    Find the right doctor
                  </p>
                </div>
              </div>

              <button className="w-full py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:opacity-90 transition">
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-primary text-primary-foreground py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-4xl font-bold mb-1">{s.value}</p>
                <p className="text-sm opacity-80">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIALTIES */}
      <section id="specialties" className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">Our Specialties</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Expert care across multiple medical fields.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPECIALTIES.map((s) => (
              <div
                key={s.title}
                className="bg-card rounded-2xl p-6 shadow-md border border-border hover:shadow-lg transition"
              >
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="font-bold mb-2 text-lg">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-card border-t border-border py-10 text-center text-sm text-muted-foreground">
        © 2025 MediBook. All rights reserved.
      </footer>
    </div>
  );
}
