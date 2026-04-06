const axios = require("axios");
const NodeCache = require("node-cache");

// Cache results for 10 minutes
const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

const POPULAR_TAGS = [
  { id: "ai", label: "Artificial Intelligence", icon: "🤖" },
  { id: "python", label: "Python", icon: "🐍" },
  { id: "cybersecurity", label: "Cybersecurity", icon: "🔐" },
  { id: "datascience", label: "Data Science", icon: "📊" },
  { id: "webdev", label: "Web Dev", icon: "🌐" },
  { id: "flutter", label: "Flutter", icon: "💙" },
  { id: "machinelearning", label: "Machine Learning", icon: "🧠" },
  { id: "javascript", label: "JavaScript", icon: "⚡" },
  { id: "reactjs", label: "React", icon: "⚛️" },
  { id: "devops", label: "DevOps", icon: "⚙️" },
];

// ─────────────────────────────────────────────────────────
// YouTube Videos
// ─────────────────────────────────────────────────────────
exports.getYouTubeVideos = async (req, res) => {
  try {
    const { tag = "AI", maxResults = 12 } = req.query;
    const cacheKey = `yt_${tag}_${maxResults}`;

    const cached = cache.get(cacheKey);
    if (cached) return res.json({ source: "cache", data: cached });

    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "YouTube API key not configured." });
    }

    // Search for Shorts — add #Shorts to query to bias results
    const searchRes = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: `${tag} #Shorts programming tutorial`,
          type: "video",
          videoDuration: "short", // under 4 minutes (Shorts)
          maxResults: parseInt(maxResults),
          order: "relevance",
          relevanceLanguage: "en",
          key: apiKey,
        },
      }
    );

    const videos = searchRes.data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail:
        item.snippet.thumbnails.high?.url ||
        item.snippet.thumbnails.medium?.url ||
        item.snippet.thumbnails.default?.url,
      channel: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
      watchUrl: `https://www.youtube.com/shorts/${item.id.videoId}`,
      embedUrl: `https://www.youtube.com/embed/${item.id.videoId}`,
      platform: "youtube",
      tag,
    }));

    // Keyword filter — keep only tech-relevant
    const filtered = filterTechVideos(videos, tag);

    cache.set(cacheKey, filtered);
    res.json({ source: "api", data: filtered });
  } catch (err) {
    console.error("YouTube API error:", err.response?.data || err.message);
    res
      .status(500)
      .json({ error: "Failed to fetch YouTube videos.", detail: err.message });
  }
};

// ─────────────────────────────────────────────────────────
// Instagram Reels  (via RapidAPI proxy)
// ─────────────────────────────────────────────────────────
exports.getInstagramReels = async (req, res) => {
  try {
    const { tag = "python", count = 9 } = req.query;
    const cacheKey = `ig_${tag}_${count}`;

    const cached = cache.get(cacheKey);
    if (cached) return res.json({ source: "cache", data: cached });

    const rapidKey = process.env.RAPIDAPI_KEY;
    if (!rapidKey) {
      // Return curated mock data when API key is absent (demo mode)
      const mock = getMockInstagramReels(tag, parseInt(count));
      return res.json({ source: "mock", data: mock });
    }

    // Using the "Instagram Scraper" API on RapidAPI
    const response = await axios.get(
      "https://instagram-scraper-api2.p.rapidapi.com/v1/hashtag",
      {
        params: { hashtag: tag },
        headers: {
          "X-RapidAPI-Key": rapidKey,
          "X-RapidAPI-Host": "instagram-scraper-api2.p.rapidapi.com",
        },
      }
    );

    const items = response.data?.data?.items || [];
    const reels = items
      .filter((item) => item.media_type === 2) // 2 = video
      .slice(0, parseInt(count))
      .map((item) => ({
        id: item.id,
        title:
          item.caption?.text?.slice(0, 120) || `#${tag} Reel`,
        thumbnail:
          item.image_versions2?.candidates?.[0]?.url ||
          item.carousel_media?.[0]?.image_versions2?.candidates?.[0]?.url ||
          "",
        channel: item.user?.username || "Instagram",
        publishedAt: new Date(item.taken_at * 1000).toISOString(),
        watchUrl: `https://www.instagram.com/reel/${item.code}/`,
        platform: "instagram",
        tag,
      }));

    cache.set(cacheKey, reels);
    res.json({ source: "api", data: reels });
  } catch (err) {
    console.error("Instagram API error:", err.response?.data || err.message);
    // Graceful fallback to mock data
    const mock = getMockInstagramReels(req.query.tag || "python", 9);
    res.json({ source: "mock", data: mock });
  }
};

// ─────────────────────────────────────────────────────────
// Combined: YouTube + Instagram
// ─────────────────────────────────────────────────────────
exports.getAllVideos = async (req, res) => {
  try {
    const { tag = "AI", maxResults = 8 } = req.query;

    const [ytResult, igResult] = await Promise.allSettled([
      axios.get(`http://localhost:${process.env.PORT || 5000}/api/videos/youtube`, {
        params: { tag, maxResults },
      }),
      axios.get(`http://localhost:${process.env.PORT || 5000}/api/videos/instagram`, {
        params: { tag, count: Math.ceil(maxResults / 2) },
      }),
    ]);

    const ytVideos =
      ytResult.status === "fulfilled" ? ytResult.value.data.data : [];
    const igVideos =
      igResult.status === "fulfilled" ? igResult.value.data.data : [];

    const combined = interleave(ytVideos, igVideos);

    res.json({
      data: combined,
      meta: {
        youtube: ytVideos.length,
        instagram: igVideos.length,
        total: combined.length,
        tag,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch combined videos." });
  }
};

// ─────────────────────────────────────────────────────────
// Popular Tags
// ─────────────────────────────────────────────────────────
exports.getPopularTags = (req, res) => {
  res.json({ data: POPULAR_TAGS });
};

// ─────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────
const TECH_KEYWORDS = [
  "python", "javascript", "react", "node", "api", "code", "coding",
  "programming", "developer", "software", "ai", "machine learning",
  "deep learning", "data", "cyber", "security", "hack", "flutter",
  "android", "ios", "web", "backend", "frontend", "database", "sql",
  "linux", "git", "github", "docker", "cloud", "aws", "devops", "tutorial",
  "learn", "tip", "trick", "shorts", "tech", "computer", "algorithm",
];

function filterTechVideos(videos, tag) {
  return videos.filter((v) => {
    const text = `${v.title} ${v.description}`.toLowerCase();
    return (
      text.includes(tag.toLowerCase()) ||
      TECH_KEYWORDS.some((kw) => text.includes(kw))
    );
  });
}

function interleave(arr1, arr2) {
  const result = [];
  const max = Math.max(arr1.length, arr2.length);
  for (let i = 0; i < max; i++) {
    if (arr1[i]) result.push(arr1[i]);
    if (arr2[i]) result.push(arr2[i]);
  }
  return result;
}

function getMockInstagramReels(tag, count) {
  const reels = [];
  for (let i = 1; i <= count; i++) {
    reels.push({
      id: `mock_${tag}_${i}`,
      title: `${tag} tip #${i} — Quick coding insight for developers 🚀 #${tag} #coding #dev`,
      thumbnail: `https://picsum.photos/seed/${tag}${i}/400/700`,
      channel: `dev_creator_${i}`,
      publishedAt: new Date(Date.now() - i * 86400000).toISOString(),
      watchUrl: `https://www.instagram.com/explore/tags/${tag}/`,
      platform: "instagram",
      tag,
      isMock: true,
    });
  }
  return reels;
}
