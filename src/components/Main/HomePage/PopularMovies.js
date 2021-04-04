import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Row, Col, Card, Image } from "react-bootstrap";
import { getPopularMovies } from "../../../apiService/api";

function PopularMovies() {
  const [popularMovies, setPopularMovies] = useState(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const fetchedData = await getPopularMovies(1);
      if (fetchedData) {
        setPopularMovies(fetchedData[1]);
      }
    };
    fetchPopularMovies();
  }, []);

  const skeletonCardImage = () => {
    return (
      <SkeletonTheme color="#243142" highlightColor="#364963">
        <Skeleton height={`50vh`} width={"100%"} />
      </SkeletonTheme>
    );
  };

  const skeletonCard = () => {
    return [1, 2, 3, 4].map((times) => {
      return (
        <Col xs="6" md="3" sm="3" key={times}>
          <Card>{skeletonCardImage()}</Card>
          <div className="mt-3">
            <div className="text-center">
              <SkeletonTheme color="#243142" highlightColor="#364963">
                <Skeleton width={100} />
              </SkeletonTheme>
            </div>
            <div className="text-center text-white-50">
              <SkeletonTheme color="#243142" highlightColor="#364963">
                <Skeleton width={100} />
              </SkeletonTheme>
            </div>
          </div>
        </Col>
      );
    });
  };

  const showPopularMovies =
    popularMovies &&
    popularMovies.slice(0, 8).map((movie, index) => {
      return (
        <Col xs="6" md="3" sm="3" key={index} className="mb-4">
          <Card>
            <Link to={`/movie/${movie.id}`}>
              <Image
                className="rounded"
                fluid
                src={movie.poster}
                alt={movie.title}
              />
            </Link>
          </Card>
          <div className="mt-3">
            <div className="text-center">{movie.title}</div>
            <div className="text-center text-white-50">{movie.year}</div>
          </div>
        </Col>
      );
    });

  return (
    <>
      <Row className="mt-3">
        <Col>
          <p className="font-weight-bold">POPULAR MOVIES</p>
        </Col>
      </Row>
      <Row className="mt-3">{showPopularMovies || skeletonCard()}</Row>
    </>
  );
}

export default PopularMovies;
