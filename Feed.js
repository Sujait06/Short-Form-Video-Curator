import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import TagBar from "../components/TagBar";
import PlatformFilter from "../components/PlatformFilter";
import { fetchYouTubeVideos, fetchInstagramReels } from "../utils/api";
import "./Feed.css";

const SKELETON_COUNT = 12;

export default function Feed() {
  const { tag = "ai" } = useParams();
  const navigate = useNavigate();
  const [platform, setPlatform] = useState("all");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState({});

  const loadVideos = useCallback(async () => {
    setLoading(true);
    setError(null);
    setVideos([]);

    try {
      const results = [];

      if (platform === "all" || platform === "youtube") {
        const yt = await fetchYouTubeVideos(tag, 12);
        results.push(...(yt.data || []));
      }
      if (platform === "all" || platform === "instagram") {
        const ig = await fetchInstagramReels(tag, 9);
        results.push(...(ig.data || []));
      }

      // interleave by platform for "all"
      let final = results;
      if (platform === "all") {
        const yt = results.filter((v) => v.platform === "youtube");
        const ig = results.filter((v) => v.platform === "instagram");
        final = [];
        const max = Math.max(yt.length, ig.length);
        for (let i = 0; i < max; i++) {
          if (yt[i]) final.push(yt[i]);
          if (ig[i]) final.push(ig[i]);
        }
      }

      setVideos(final);
      setMeta({
        youtube: results.filter((v) => v.platform === "youtube").length,
        instagram: results.filter((v) => v.platform === "instagram").length,
      });
    } catch (err) {
      setError(err.message || "Failed to load videos.");
    } finally {
      setLoading(false);
    }
  }, [tag, platform]);

  useEffect(() => {
    loadVideos();
  }, [loadVideos]);

  const ytCount = videos.filter((v) => v.platform === "youtube").length;
  const igCount = videos.filter((v) => v.platform === "instagram").length;

  return (
    <div className="feed-page">
      <TagBar />

      <div className="feed-container">
        {/* Header */}
        <div className="feed-header">
          <div className="feed-title-row">
            <h1 className="feed-title">
              <span className="tag-hash">#</span>
              {tag.toUpperCase()}
            </h1>
            {!loading && videos.length > 0 && (
              <div className="feed-counts">
                {ytCount > 0 && (
                  <span className="count-badge count-badge--yt">
                    ▶ {ytCount} Shorts
                  </span>
                )}
                {igCount > 0 && (
                  <span className="count-badge count-badge--ig">
                    ◈ {igCount} Reels
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="feed-controls">
            <PlatformFilter active={platform} onChange={setPlatform} />
            <button className="refresh-btn" onClick={loadVideos} disabled={loading}>
              {loading ? "⟳" : "↻ Refresh"}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="feed-error">
            <span>⚠️ {error}</span>
            <button onClick={loadVideos}>Try again</button>
          </div>
        )}

        {/* Grid */}
        <div className="video-grid">
          {loading
            ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <div key={i} className="skeleton video-skeleton" />
              ))
            : videos.map((v, i) => (
                <VideoCard key={`${v.platform}-${v.id}`} video={v} index={i} />
              ))}
        </div>

        {/* Empty state */}
        {!loading && !error && videos.length === 0 && (
          <div className="feed-empty">
            <div className="empty-icon">📭</div>
            <h3>No videos found</h3>
            <p>Try a different tag or check your API keys in the backend <code>.env</code> file.</p>
            <button className="btn-primary" onClick={() => navigate("/feed/ai")}>
              Try #AI
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
