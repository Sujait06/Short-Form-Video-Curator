import React, { useState } from "react";
import "./VideoCard.css";

const PLATFORM_CONFIG = {
  youtube: {
    label: "YouTube Shorts",
    color: "#ff0000",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
        <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
      </svg>
    ),
  },
  instagram: {
    label: "Instagram",
    color: "#e1306c",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
};

export default function VideoCard({ video, index = 0 }) {
  const [imgError, setImgError] = useState(false);
  const platform = PLATFORM_CONFIG[video.platform] || PLATFORM_CONFIG.youtube;

  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 30) return `${days}d ago`;
    if (days < 365) return `${Math.floor(days / 30)}mo ago`;
    return `${Math.floor(days / 365)}y ago`;
  };

  return (
    <article
      className="video-card"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Thumbnail */}
      <div className="video-card__thumb">
        {!imgError ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="video-card__thumb-fallback">
            <span>▶</span>
          </div>
        )}

        {/* Play overlay */}
        <div className="video-card__overlay">
          <div className="play-btn">▶</div>
        </div>

        {/* Platform badge */}
        <div
          className="platform-badge"
          style={{ "--p-color": platform.color }}
        >
          {platform.icon}
          <span>{video.platform === "youtube" ? "Shorts" : "Reels"}</span>
        </div>

        {/* Mock badge */}
        {video.isMock && (
          <div className="mock-badge">Demo</div>
        )}
      </div>

      {/* Info */}
      <div className="video-card__info">
        <p className="video-card__title" title={video.title}>
          {video.title.length > 80
            ? video.title.slice(0, 77) + "…"
            : video.title}
        </p>
        <div className="video-card__meta">
          <span className="channel">@{video.channel?.replace(/\s+/g, "_").toLowerCase()}</span>
          <span className="dot">·</span>
          <span className="date">{timeAgo(video.publishedAt)}</span>
        </div>

        {/* Watch button */}
        <a
          href={video.watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="watch-btn"
          style={{ "--p-color": platform.color }}
        >
          {platform.icon}
          Watch on {platform.label}
        </a>
      </div>
    </article>
  );
}
