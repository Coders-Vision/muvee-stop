import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Image } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import GenreList from "./GenreList";
import { getGenre } from "../../../apiService/api";
import "../../../styles/Main/Genre.css";
import Pagination from "../PaginationComponent/Pagination";
import defaultPoster from "../default-poster.svg";
function Genre() {
  const [genreId, setGenreId] = useState(28);
  const [genre, setGenre] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchGenre = async () => {
      const fetchedData = await getGenre(genreId, currentPage);
      if (fetchedData) {
        setGenre(null);
        setTotalPages(0);
        setTotalPages(Math.floor(fetchedData[0].totalPages / 16));
        setGenre(fetchedData[1]);
      }
    };
    fetchGenre();
  }, [genreId, currentPage]);

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
      .map((times, index) => {
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

  const showGenre =
    genre &&
    genre.slice(0, 16).map((movie, index) => {
      return (
        <Col xs="6" md="3" sm="3" key={index} className="mb-4">
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

  const wrapMoviesByGenreList = () => {
    return (
      <>
        <p className="font-weight-bold">MOVIES BY GENRE</p>
        <Row className="mt-3">{showGenre || skeletonCard()}</Row>
      </>
    );
  };

  return (
    <div className="genre">
      <GenreList setGenreId={setGenreId} />
      {wrapMoviesByGenreList()}
      <Pagination
        pages={totalPages}
        currentPage={currentPage}
        setPage={setCurrentPage}
      />
    </div>
  );
}

export default Genre;
