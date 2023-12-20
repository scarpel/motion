import { join } from 'path';

export const ASSETS = join(__dirname, '..', 'assets');

export default {
  ASSETS: {
    BASE: ASSETS,
    VIDEOS: join(ASSETS, 'videos'),
    THUMBNAILS: join(ASSETS, 'thumbnails'),
  },
};
