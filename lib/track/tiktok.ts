// TikTok videos shown under "Recent on TikTok" on /track. Add a video by pasting its
// link here; tracking parameters after "?" are ignored. A title is optional and shows
// under the frame.
export const TIKTOK_HANDLE = "yuhsondo";

const videos: { url: string; title?: string }[] = [
  { url: "https://www.tiktok.com/@yuhsondo/video/7700686577223224590" },
  { url: "https://www.tiktok.com/@yuhsondo/video/7700686882472004878" },
  { url: "https://www.tiktok.com/@yuhsondo/video/7700696024721018126" },
];

export const tiktokVideos = videos.flatMap(({ url, title }) => {
  const id = url.match(/video\/(\d+)/)?.[1];
  return id ? [{ id, title: title ?? "", href: `https://www.tiktok.com/@${TIKTOK_HANDLE}/video/${id}` }] : [];
});

// TikTok's embeddable player. Only requested once someone presses play.
export const tiktokPlayerSrc = (id: string) =>
  `https://www.tiktok.com/player/v1/${id}?autoplay=1&rel=0&music_info=0&description=0`;
