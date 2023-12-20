import Homepage from "@screens/Homepage";
import { getVideos } from "@src/utils/videos";

export default async function Home() {
  const videos = await getVideos();

  // Render
  return <Homepage videos={videos} />;
}
