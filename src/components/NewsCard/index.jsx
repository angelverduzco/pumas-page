import { useState } from "react";
import VideoPlayer from "../VideoPlayer";
import "./NewsCard.css";

export default function NewsCard({ news }) {
  const [videoId, setVideoId] = useState(news.video ? news.video.normal : null);

  const handleAdClick = () => {
    setVideoId(
      videoId === news.video.normal ? news.video.ad : news.video.normal,
    );
  };

  return (
    <article key={news.id} className="news-card">
      {news.video ? (
        <>
          <VideoPlayer
            videoId={videoId}
            onClick={handleAdClick}
            title={news.title}
          />
        </>
      ) : (
        <img src={news.image} alt="" className="news-img" />
      )}

      <div className="news-body">
        <h3 className="news-heading">{news.title}</h3>
        <p className="news-date">
          {new Date(news.date).toLocaleDateString("es-MX", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="news-excerpt">{news.excerpt}</p>
      </div>
    </article>
  );
}
