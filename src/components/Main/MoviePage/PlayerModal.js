import { React, useState, useEffect } from "react";
import { Container, Modal } from "react-bootstrap";
import ReactPlayer from "react-player";
import { getMovieVideos } from "../../../apiService/api";
function PlayerModal({ show, onHide, title, movieId }) {
  const videoURL = "https://www.youtube.com/watch?v=";
  const [urlKey, setUrlKey] = useState("");

  useEffect(() => {
    const fetchMovieVideo = async () => {
      const result = await getMovieVideos(movieId);
      const key = result ? result.key : "";
      setUrlKey(key);
    };
    fetchMovieVideo();
  }, [movieId]);

  const showVideoPlayer = () => {
    return (
      <ReactPlayer
        url={`${videoURL}${urlKey}`}
        playing
        width="100%"
      ></ReactPlayer>
    );
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header
        style={{ backgroundColor: "#202b3a", color: "#ffffff" }}
        closeButton
      >
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#000000" }}>
        <Container fluid>
          {urlKey.length > 0 ? showVideoPlayer() : "No Video Source found"}
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default PlayerModal;
