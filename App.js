import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import VideoCard from "./VideoCard";
import "./App.css";

function App() {
  const [videos, setVideos] = useState([]);

  const searchVideos = async (tag) => {
    try {
      const res = await axios.get(`http://localhost:5000/videos/${tag}`);
      setVideos(res.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  return (
    <div className="app">
      <h1>Short-Form Video Curator</h1>

      <SearchBar onSearch={searchVideos} />

      <div className="video-grid">
        {videos.map((video, index) => (
          <VideoCard key={index} video={video} />
        ))}
      </div>
    </div>
  );
}

export default App;
