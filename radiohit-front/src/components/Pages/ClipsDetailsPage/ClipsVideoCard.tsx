const ClipsVideoCard = ({ youTubeVideoID }) => {
  return (
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${youTubeVideoID}?showinfo=0&color=white&rel=0&theme=light`}
          title="video"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; fullscreen;"
          allowFullScreen
          frameBorder="0"
        ></iframe>
  );
};
export default ClipsVideoCard;
