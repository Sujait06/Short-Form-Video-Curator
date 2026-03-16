import React from "react";

function VideoCard({ video }) {
  const videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;

  return (
    <div className="video-card">
      <img
        src={video.snippet.thumbnails.medium.url}
        alt={video.snippet.title}
      />

      <h3>{video.snippet.title}</h3>

      <a href={videoUrl} target="_blank" rel="noreferrer">
        Watch Video
      </a>
    </div>
  );
}

export default VideoCard;