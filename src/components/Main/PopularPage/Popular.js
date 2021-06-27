import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { getPopularMovies } from "../../../apiService/api";
import Pagination from "../PaginationComponent/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSol } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartReg } from "@fortawesome/free-regular-svg-icons";
import { FavouriteMoviesContext } from "../../Context/FavouriteMoviesState";
import SEO from ".././SEOComponent/SEO";
import LazyImageLoader from "../../Main/LazyImageLoaderComponent/LazyImageLoader";

function Popular() {
  const [popular, setPopular] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const { checkFavMovie, addFavMovie, removeFavMovie } = useContext(
    FavouriteMoviesContext
  );

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

  const showPopular =
    popular &&
    popular.slice(0, 16).map((movie) => {
      return (
        <Col className="mb-4" xs="6" md="3" sm="3" key={movie.id}>
          <Card>
            <div className="card-container">
              <Link to={`/movie/${movie.id}`}>
                <LazyImageLoader
                  src={movie.poster}
                  alt={movie.title}
                  cssClass={"img fluid rounded"}
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

  const wrapPopular = () => {
    return (
      <>
        <p className="font-weight-bold">POPULAR MOVIES</p>
        <Row className="mt-3">{showPopular || skeletonCard()}</Row>
      </>
    );
  };

  const generateMovieKeywords =
    popular &&
    popular
      .slice(0, 16)
      .map((movie, index) => movie.title)
      .join(",");

  const generateSeoTags = () => {
    return (
      <SEO
        title={`Muvee Stop | Popular`}
        description={`Search your favourite on Movie Stop by Popular`}
        keywords={generateMovieKeywords}
        ogTitle={"Muvee Stop | Popular"}
        ogDescription={`Search your favourite on Movie Stop by Popular`}
      />
    );
  };
  return (
    <>
      {generateSeoTags()}
      <div className="popular mt-4">
        {wrapPopular()}
        <Pagination
          pages={totalPages}
          currentPage={currentPage}
          setPage={setCurrentPage}
        />
      </div>
    </>
  );
}

export default Popular;
