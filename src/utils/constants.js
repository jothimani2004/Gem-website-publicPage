export const CLOUDFRONT_URL = import.meta.env.VITE_CLOUDFRONT_URL || "https://d274ar2m6kp8vg.cloudfront.net";

export const getCloudFrontUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("/")) {
    return path;
  }
  return `${CLOUDFRONT_URL}/${path}`;
};
