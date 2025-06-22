import YouTube, { YouTubeProps } from 'react-youtube';

function extractVideoId(url: string): string {
  const match = url.match(/(?:youtube\.com.*[?&]v=|youtu\.be\/)([\w-]+)/);
  return match ? match[1] : url; // fallback nếu truyền sẵn id
}

export default function VideoComponent({ src, className = 'w-full max-w-full' }: { src: string; className?: string }) {
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  };

  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      controls: 1,
      showinfo: 1,
      rel: 0,
      modestbranding: 1,
      disablekb: 1,
      fs: 1
    }
  };

  return <YouTube videoId={extractVideoId(src)} opts={opts} onReady={onPlayerReady} className={className} />;
}
