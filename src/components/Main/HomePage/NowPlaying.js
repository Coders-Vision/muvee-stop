import { React, useState, useEffect } from "react";
import { Row, Col, Carousel } from "react-bootstrap";
import { getNowPlaying } from "../../../apiService/api";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import SEO from ".././SEOComponent/SEO";

function NowPlaying() {
  const [nowPlaying, setNowPlaying] = useState(null);

  useEffect(() => {
    const fetchGetNowPlaying = async () => {
      setNowPlaying(await getNowPlaying());
    };
    fetchGetNowPlaying();
  }, []);

  const showNowPlaying =
    nowPlaying &&
    nowPlaying.slice(0, 8).map((movie, index) => {
      return (
        <Carousel.Item key={index}>
          <Link to={`/movie/${movie.id}`}>
            <div className="hero-poster">
              <img
                className="img-fluid w-100"
                src={movie.backPoster}
                alt={movie.title}
              />
            </div>
          </Link>
          <Col>
            <Carousel.Caption>
              <Row className="w-100">
                <Col>
                  <h1 className="text-center"> {movie.title}</h1>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FontAwesomeIcon icon={faStar} />
                  {` ${movie.rating}`}
                </Col>
                <Col className="text-white-50 ">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  {` ${movie.year}`}
                </Col>
              </Row>
              <Row className="d-none d-md-block text-white-50">
                <Col>{movie.overview}</Col>
              </Row>
            </Carousel.Caption>
          </Col>
        </Carousel.Item>
      );
    });

  const skeletonCarousel = () => {
    return (
      <Carousel.Item>
        <SkeletonTheme color="#243142" highlightColor="#364963">
          <Skeleton height={`40vh`} />
        </SkeletonTheme>
        <Carousel.Caption>
          <SkeletonTheme color="#243142" highlightColor="#364963">
            <Skeleton width={100} />
          </SkeletonTheme>
        </Carousel.Caption>
      </Carousel.Item>
    );
  };

  return (
    <>
      <Row className="mt-2">
        <Col>
          <Carousel>{showNowPlaying || skeletonCarousel()}</Carousel>
        </Col>
      </Row>
    </>
  );
}

export default NowPlaying;
