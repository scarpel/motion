import { TVideo } from "@customTypes/videos";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  videos: TVideo[];
  selectedVideo?: TVideo | null;
  isPlayingVideo: boolean;
};

const initialState: TInitialState = {
  videos: [],
  isPlayingVideo: false,
};

const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    setVideos: (
      state,
      action: PayloadAction<{
        videos: TVideo[];
        replace?: boolean;
      }>
    ) => {
      const { videos, replace } = action.payload;

      state.videos = replace ? videos : [...state.videos, ...videos];
    },
    setSelectedVideo: (state, action: PayloadAction<TVideo | null>) => {
      state.selectedVideo = action.payload;
      state.isPlayingVideo = true;
    },
    setIsPlayingVideo: (state, action: PayloadAction<boolean>) => {
      state.isPlayingVideo = action.payload;
    },
  },
});

export const { setVideos, setSelectedVideo, setIsPlayingVideo } =
  videosSlice.actions;
export default videosSlice.reducer;
