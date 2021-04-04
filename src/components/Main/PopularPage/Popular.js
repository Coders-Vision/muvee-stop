import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Image } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { getPopularMovies } from "../../../apiService/api";
import defaultPoster from "../default-poster.svg";
import Pagination from "../PaginationComponent/Pagination";
function Popular() {
  const [popular, setPopular] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchPopular = async () => {
      const fetchedData = await getPopularMovies(currentPage);
      if (fetchedData) {
        setTotalPages(0);
        setPopular(null);
        setTotalPages(Math.floor(fetchedData[0].totalPages / 16));
        setPopular(fetchedData[1]);
      }
    };
    fetchPopular();
  }, [currentPage]);

  const skeletonCardImage = () => {
    return (
      <SkeletonTheme color="#243142" highlightColor="#364963">
        <Skeleton height={`50vh`} width={"100%"} />
      </SkeletonTheme>
    );
  };

  const skeletonCard = () => {
    return Array(8)
      .fill()
      .map((times,index) => {
        return (
          <Col xs="6" md="3" sm="3" key={index}>
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

  const showPopular =
    popular &&
    popular.slice(0, 16).map((movie) => {
      return (
        <Col className="mb-4" xs="6" md="3" sm="3" key={movie.id}>
          <Card>
            <Link to={`/movie/${movie.id}`} onClick={() => window.scroll(0, 0)}>
              <Image
                className="rounded"
                fluid
                src={movie.poster}
                alt={movie.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultPoster;
                }}
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

  const wrapPopular = () => {
    return (
      <>
        <p className="font-weight-bold">POPULAR MOVIES</p>
        <Row className="mt-3">{showPopular || skeletonCard()}</Row>
      </>
    );
  };

  return (
    <div className="popular mt-4">
      {wrapPopular()}
      <Pagination
        pages={totalPages}
        currentPage={currentPage}
        setPage={setCurrentPage}
      />
    </div>
  );
}

export default Popular;
