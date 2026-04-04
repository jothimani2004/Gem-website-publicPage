"use client";
import { useRef, useState } from "react";
import styles from "./GemVideo.module.css";

export default function GemVideo({ src }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // ▶️ Play / Pause
  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // ⏱ Progress update
  const handleTimeUpdate = () => {
    const percent =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(percent);
  };

  // 🎯 Seek
  const handleSeek = (e) => {
    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percent = clickX / width;
    videoRef.current.currentTime =
      percent * videoRef.current.duration;
  };

  // 🖥 Fullscreen
  const handleFullscreen = () => {
    videoRef.current.requestFullscreen();
  };

  return (
    <div className={styles.videoCard}
     onClick={(e) => e.stopPropagation()}   // 🔥 IMPORTANT
  onMouseDown={(e) => e.stopPropagation()} // 🔥 IMPORTANT
    onPointerDown={(e) => e.stopPropagation()} // 🔥 BEST FIX
    >
      <video
        ref={videoRef}
        src={src}
        className={styles.video}
        onTimeUpdate={handleTimeUpdate}
        onClick={togglePlay}
      />

      {/* Overlay Controls */}
      <div className={styles.controls}>
        
        {/* Play Button */}
        <button onClick={togglePlay} className={styles.playBtn}>
          {isPlaying ? "❚❚" : "▶"}
        </button>

        {/* Progress Bar */}
        <div className={styles.progressBar} onClick={handleSeek}>
          <div
            className={styles.progress}
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Fullscreen */}
        <button onClick={handleFullscreen} className={styles.fullBtn}>
          ⛶
        </button>
      </div>
    </div>
  );
}