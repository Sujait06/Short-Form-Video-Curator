import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./TagBar.css";

const DEFAULT_TAGS = [
  { id: "ai", label: "AI", icon: "🤖" },
  { id: "python", label: "Python", icon: "🐍" },
  { id: "cybersecurity", label: "Cybersecurity", icon: "🔐" },
  { id: "datascience", label: "Data Science", icon: "📊" },
  { id: "webdev", label: "Web Dev", icon: "🌐" },
  { id: "flutter", label: "Flutter", icon: "💙" },
  { id: "machinelearning", label: "ML", icon: "🧠" },
  { id: "javascript", label: "JavaScript", icon: "⚡" },
  { id: "reactjs", label: "React", icon: "⚛️" },
  { id: "devops", label: "DevOps", icon: "⚙️" },
];

export default function TagBar({ tags = DEFAULT_TAGS }) {
  const navigate = useNavigate();
  const { tag: activeTag } = useParams();

  return (
    <div className="tagbar">
      <div className="tagbar__scroll">
        {tags.map((t) => (
          <button
            key={t.id}
            className={`tag-chip ${activeTag === t.id ? "tag-chip--active" : ""}`}
            onClick={() => navigate(`/feed/${t.id}`)}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
