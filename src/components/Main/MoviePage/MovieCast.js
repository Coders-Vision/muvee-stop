import { React, useState, useEffect } from "react";
import { Row, Col, Image } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { getMovieCast } from "../../../apiService/api";
import defaultProfile from "../default-profile.svg";
function MovieCast({ id }) {
  const [movieCast, setMovieCast] = useState(null);

  useEffect(() => {
    const fetchMovieCast = async () => {
      setMovieCast(null);
      setMovieCast(await getMovieCast(id));
    };
    fetchMovieCast();
  }, [id]);

  const skeletonMovieCast = () => {
    return Array(4)
      .fill()
      .map((skele, index) => {
        return (
          <Col xs={6} md={3} sm={4} className="text-center" key={index}>
            <div className="">
              <SkeletonTheme color="#243142" highlightColor="#364963">
                <Skeleton circle={true} height={155} width={150} />
              </SkeletonTheme>
            </div>
            <SkeletonTheme color="#243142" highlightColor="#364963">
              <Skeleton width={100} />
            </SkeletonTheme>
            <SkeletonTheme color="#243142" highlightColor="#364963">
              <Skeleton width={100} />
            </SkeletonTheme>
          </Col>
        );
      });
  };

  const showMovieCast =
    movieCast &&
    movieCast.slice(0, 8).map((cast, index) => {
      return (
        <Col xs={6} md={3} sm={4} key={index} className="text-center">
          <div className="img-container">
            <Link to={`/celebrity/${cast.id}`} onClick={window.scroll(0, 0)}>
              <Image
                className="cast-image mx-auto d-block"
                src={cast.img ? cast.img : defaultProfile}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultProfile;
                }}
              />
            </Link>
          </div>
          <p className="font-weight-bold text-center">{cast.name}</p>
          <p
            className="font-weight-light text-center"
            style={{ color: "#5a606b" }}
          >
            {cast.character}
          </p>
        </Col>
      );
    });

  return (
    <>
      <Row className="mt-3">
        <Col>
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>CASTS</p>
        </Col>
      </Row>
      <Row className="p-2 mt-3 shadow-lg ">
        {showMovieCast || skeletonMovieCast()}
      </Row>
    </>
  );
}

export default MovieCast;
