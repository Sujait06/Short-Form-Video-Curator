import axios from "axios";

const BASE = process.env.REACT_APP_API_URL || "/api";

const api = axios.create({ baseURL: BASE, timeout: 15000 });

export const fetchYouTubeVideos = (tag, maxResults = 12) =>
  api.get("/videos/youtube", { params: { tag, maxResults } }).then((r) => r.data);

export const fetchInstagramReels = (tag, count = 9) =>
  api.get("/videos/instagram", { params: { tag, count } }).then((r) => r.data);

export const fetchAllVideos = (tag, maxResults = 12) =>
  api.get("/videos/all", { params: { tag, maxResults } }).then((r) => r.data);

export const fetchTags = () =>
  api.get("/videos/tags").then((r) => r.data);

export default api;
