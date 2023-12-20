export const BACKEND_URL = process.env.OUTER_BACKEND_URL;

export const BackendRoutes = {
  base: BACKEND_URL,
  videos: `${BACKEND_URL}/videos`,
  thumbnails: `${BACKEND_URL}/cdn/thumbnails`,
};

export const Routes = {
  home: "/",
  watch: "/watch",
  upload: "/upload",
};
