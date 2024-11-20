export const isValidUrl = (url?: string) => {
  if (!url) return true;
  try {
    const validUrl = new URL(url);
    return validUrl.hostname === window.location.hostname;
  } catch {
    return false;
  }
};
