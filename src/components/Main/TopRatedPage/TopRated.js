import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Image } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { getTopRatedMovies } from "../../../apiService/api";
import defaultPoster from "../default-poster.svg";
import Pagination from "../PaginationComponent/Pagination";
function TopRated() {
  const [topRated, setTopRated] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchTopRated = async () => {
      const fetchedData = await getTopRatedMovies(currentPage);
      if (fetchedData) {
        setTotalPages(0);
        setTopRated(null);
        setTotalPages(Math.floor(fetchedData[0].totalPages / 16));
        setTopRated(fetchedData[1]);
      }
    };
    fetchTopRated();
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

  const showTopRated =
    topRated &&
    topRated.slice(0, 16).map((movie) => {
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

  const wrapTopRated = () => {
    return (
      <>
        <p className="font-weight-bold">TOP RATED MOVIES</p>
        <Row className="mt-3">{showTopRated || skeletonCard()}</Row>
      </>
    );
  };

  return (
    <div className="top-rated mt-4">
      {wrapTopRated()}
      <Pagination
        pages={totalPages}
        currentPage={currentPage}
        setPage={setCurrentPage}
      />
    </div>
  );
}

export default TopRated;
