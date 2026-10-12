"use client";
import { useState } from "react";
import { track } from "@/lib/track";

/** Click-to-play YouTube embed (privacy-enhanced). Nothing loads from YouTube until the visitor taps play. */
export default function YouTube({ id, title }: { id: string; title: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className="yt">
      {on ? (
        <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} title={title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
      ) : (
        <button type="button" onClick={() => { setOn(true); track("video_play", { id, page: location.pathname }); }} aria-label={`Play video: ${title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
          <span className="yt__play" aria-hidden="true" />
          <span className="yt__title">{title}</span>
        </button>
      )}
    </div>
  );
}
