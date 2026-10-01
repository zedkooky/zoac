import { UTM, type Photo } from "@/lib/photos";

export default function Credit({ photo, className = "" }: { photo: Photo; className?: string }) {
  return (
    <span className={`credit ${className}`}>
      Photo by <a href={`https://unsplash.com/@${photo.handle}?${UTM}`} target="_blank" rel="noopener noreferrer">{photo.name}</a> on{" "}
      <a href={`https://unsplash.com/?${UTM}`} target="_blank" rel="noopener noreferrer">Unsplash</a>
    </span>
  );
}
