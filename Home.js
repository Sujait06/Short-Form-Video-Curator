import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const FEATURED_TAGS = [
  { id: "ai", label: "Artificial Intelligence", icon: "🤖", desc: "LLMs, neural nets, GenAI" },
  { id: "python", label: "Python", icon: "🐍", desc: "Scripting, data, automation" },
  { id: "cybersecurity", label: "Cybersecurity", icon: "🔐", desc: "Hacking, CTF, defense" },
  { id: "datascience", label: "Data Science", icon: "📊", desc: "Analytics, pandas, viz" },
  { id: "webdev", label: "Web Dev", icon: "🌐", desc: "React, CSS, HTML tips" },
  { id: "machinelearning", label: "Machine Learning", icon: "🧠", desc: "Models, training, math" },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero__glow hero__glow--yt" />
        <div className="hero__glow hero__glow--ig" />
        <div className="hero__inner">
          <div className="hero__badge">
            <span className="badge-dot" />
            YouTube Shorts + Instagram Reels
          </div>
          <h1 className="hero__title">
            Learn Tech in
            <br />
            <span className="gradient-text">60 Seconds</span>
          </h1>
          <p className="hero__sub">
            Curated short-form videos from YouTube &amp; Instagram — AI, Python,
            Cybersecurity, Data Science and more in one feed.
          </p>
          <div className="hero__actions">
            <button
              className="btn-primary"
              onClick={() => navigate("/feed/ai")}
            >
              Explore Feed →
            </button>
            <button
              className="btn-secondary"
              onClick={() => navigate("/feed")}
            >
              Browse All
            </button>
          </div>
          {/* Platform pills */}
          <div className="platform-pills">
            <div className="pill pill--yt">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
              </svg>
              YouTube Shorts
            </div>
            <div className="pill pill--ig">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
              Instagram Reels
            </div>
          </div>
        </div>
      </section>

      {/* Featured Topics */}
      <section className="topics">
        <div className="topics__inner">
          <div className="section-header">
            <h2 className="section-title">Trending Topics</h2>
            <button className="see-all" onClick={() => navigate("/feed")}>
              See all →
            </button>
          </div>
          <div className="topics__grid">
            {FEATURED_TAGS.map((t, i) => (
              <button
                key={t.id}
                className="topic-card"
                style={{ animationDelay: `${i * 80}ms` }}
                onClick={() => navigate(`/feed/${t.id}`)}
              >
                <span className="topic-icon">{t.icon}</span>
                <div>
                  <div className="topic-label">{t.label}</div>
                  <div className="topic-desc">{t.desc}</div>
                </div>
                <span className="topic-arrow">→</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how">
        <div className="how__inner">
          <h2 className="section-title" style={{ textAlign: "center", marginBottom: 48 }}>
            How It Works
          </h2>
          <div className="how__steps">
            {[
              { n: "01", title: "Pick a Topic", desc: "Choose from tags like AI, Python, Cybersecurity and more." },
              { n: "02", title: "We Fetch & Filter", desc: "Backend pulls videos from YouTube Data API & Instagram Reels API, then filters for tech relevance." },
              { n: "03", title: "Watch & Learn", desc: "Browse the curated card feed and click to watch on the original platform." },
            ].map((s) => (
              <div key={s.n} className="how__step">
                <div className="step-num">{s.n}</div>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
