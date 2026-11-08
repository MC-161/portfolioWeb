import { track } from '@vercel/analytics';

// Counts CV downloads in Vercel Analytics. Does nothing when not deployed on Vercel.
export const trackCv = (where: string) => {
  try { track('CV download', { where }); } catch { /* analytics unavailable */ }
};
