import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Image } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import GenreList from "./GenreList";
import { getGenre } from "../../../apiService/api";
import "../../../styles/Main/Genre.css";
import Pagination from "../PaginationComponent/Pagination";
import defaultPoster from "../default-poster.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSol } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartReg } from "@fortawesome/free-regular-svg-icons";
import { FavouriteMoviesContext } from "../../Context/FavouriteMoviesState";
import SEO from ".././SEOComponent/SEO";

function Genre() {
  const [genreId, setGenreId] = useState(28);
  const [genre, setGenre] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const { checkFavMovie, addFavMovie, removeFavMovie } = useContext(
    FavouriteMoviesContext
  );

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

  const showFavIcon = (mid) => {
    const check = checkFavMovie(mid);
    return check ? (
      <FontAwesomeIcon
        color={"crimson"}
        icon={faHeartSol}
        onClick={() => removeFavMovie(mid)}
      />
    ) : (
      <FontAwesomeIcon
        color={"crimson"}
        icon={faHeartReg}
        onClick={() => addFavMovie(mid)}
      />
    );
  };

  const showGenre =
    genre &&
    genre.slice(0, 16).map((movie, index) => {
      return (
        <Col xs="6" md="3" sm="3" key={index} className="mb-4">
          <Card>
            <div className="card-container">
              <Link to={`/movie/${movie.id}`}>
                <Image
                  className="rounded"
                  fluid
                  src={movie.poster}
                  alt={movie.title}
                />
              </Link>
              <div className="badge-corner badge-corner-base">
                <span>{showFavIcon(movie.id)}</span>
              </div>
            </div>
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

  const generateSeoTags = () => {
    // const movieTitles =
    //   genre &&
    //   genre
    //     .slice(0, 16)
    //     .map((movie) => movie.title)
    //     .join(",");
    return (
      <SEO
        title={`Muvee Stop | Genre`}
        description={`Search your favourite on Movie Stop by Genre`}
        //keywords={movieTitles}
        ogTitle={"Muvee Stop | Genre"}
        ogDescription={`Search your favourite on Movie Stop by Genre`}
      />
    );
  };

  return (
    <>
      {generateSeoTags()}
      <div className="genre">
        <GenreList setGenreId={setGenreId} />
        {wrapMoviesByGenreList()}
        <Pagination
          pages={totalPages}
          currentPage={currentPage}
          setPage={setCurrentPage}
        />
      </div>
    </>
  );
}

export default Genre;
