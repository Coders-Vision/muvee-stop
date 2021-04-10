import axios from "axios";

const URL = "https://api.themoviedb.org/3";
const search = `${URL}/search/movie`;
const nowPlaying = `${URL}/movie/now_playing`;
const trending = `${URL}/trending/movie/day`;
const topRated = `${URL}/movie/top_rated`;
const popularMovies = `${URL}/movie/popular`;
const upcomingMovies = `${URL}/movie/upcoming`;
const movie = `${URL}/movie`;
const genre = `${URL}/genre/movie/list`;
const movies = `${URL}/discover/movie`;
const celebrity = `${URL}/person/`;
const poster = "https://image.tmdb.org/t/p/w300/";
const banner = "https://image.tmdb.org/t/p/original/";
export const getMoviesByQuery = async (queryVal) => {
  try {
    let cancelToken;
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel("Operation canceled due to new request.");
    }
    cancelToken = axios.CancelToken.source();
    const { data } = await axios.get(search, {
      cancelToken: cancelToken.token,
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
        query: queryVal,
      },
    });
    const modifiedData = await data["results"].map((movie) => ({
      id: movie["id"],
      title: movie["title"],
      poster: poster + movie["poster_path"],
      year: movie["release_date"].substr(0, 4),
    }));
    return modifiedData;
  } catch (err) {
    console.error(err);
  }
};

export const getMovieById = async (id) => {
  try {
    const { data } = await axios.get(`${movie}/${id}`, {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
        language: "en_US",
      },
    });
    const modifiedData = {
      id: data.id,
      title: data.title,
      tagline: data.tagline,
      poster: data.poster_path,
      banner: data.backdrop_path,
      genres: data.genres,
      overview: data.overview,
      year: data.release_date,
      voteAvg: data.vote_average,
      voteCount: data.vote_count,
      status: data.status,
      runtime: data.runtime,
      country: data.production_countries,
    };
    return modifiedData;
  } catch (err) {
    console.error(err);
  }
};

export const getMovieVideos = async (id) => {
  try {
    const { data } = await axios.get(`${movie}/${id}/videos`, {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
      },
    });
    return data["results"][0];
  } catch (err) {
    console.error(err);
  }
};

export const getNowPlaying = async () => {
  try {
    const { data } = await axios.get(nowPlaying, {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
        language: "en_US",
        page: 1,
      },
    });
    const modifiedData = data["results"].map((movie) => ({
      id: movie["id"],
      backPoster: banner + movie["backdrop_path"],
      popularity: movie["popularity"],
      title: movie["title"],
      year: movie["release_date"].substr(0, 4),
      overview: movie["overview"],
      rating: movie["vote_average"],
    }));
    return modifiedData;
  } catch (err) {
    console.error(err);
  }
};

export const getTrendingMovies = async (page) => {
  try {
    const { data } = await axios.get(trending, {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
        language: "en_US",
        page: page || 1,
      },
    });
    let modifiedData = [];
    modifiedData.push({ totalPages: data["total_results"] });
    modifiedData.push(
      data["results"].map((movie) => ({
        id: movie["id"],
        backPoster: poster + movie["backdrop_path"],
        popularity: movie["popularith"],
        title: movie["title"],
        poster: poster + movie["poster_path"],
        year: movie["release_date"].substr(0, 4),
        overview: movie["overview"],
        rating: movie["vote_average"],
      }))
    );
    return modifiedData;
  } catch (err) {
    console.error(err);
  }
};

export const getPopularMovies = async (page) => {
  try {
    const { data } = await axios.get(popularMovies, {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
        language: "en_US",
        page: page || 1,
      },
    });
    let modifiedData = [];
    modifiedData.push({ totalPages: data["total_results"] });
    modifiedData.push(
      data["results"].map((movie) => ({
        id: movie["id"],
        backPoster: poster + movie["backdrop_path"],
        popularity: movie["popularith"],
        title: movie["title"],
        poster: poster + movie["poster_path"],
        year: movie["release_date"].substr(0, 4),
        overview: movie["overview"],
        rating: movie["vote_average"],
      }))
    );
    return modifiedData;
  } catch (err) {
    console.error(err);
  }
};

export const getTopRatedMovies = async (page) => {
  try {
    const { data } = await axios.get(topRated, {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
        language: "en_US",
        page: page || 1,
      },
    });

    let modifiedData = [];
    modifiedData.push({ totalPages: data["total_results"] });
    modifiedData.push(
      data["results"].map((movie) => ({
        id: movie["id"],
        backPoster: poster + movie["backdrop_path"],
        popularity: movie["popularith"],
        title: movie["title"],
        poster: poster + movie["poster_path"],
        year: movie["release_date"].substr(0, 4),
        overview: movie["overview"],
        rating: movie["vote_average"],
      }))
    );
    return modifiedData;
  } catch (err) {
    console.error(err);
  }
};

export const getUpcomingMovies = async (page) => {
  try {
    const { data } = await axios.get(upcomingMovies, {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
        language: "en_US",
        page: page || 1,
      },
    });

    let modifiedData = [];
    modifiedData.push({ totalPages: data["total_results"] });
    modifiedData.push(
      data["results"].map((movie) => ({
        id: movie["id"],
        backPoster: poster + movie["backdrop_path"],
        popularity: movie["popularith"],
        title: movie["title"],
        poster: poster + movie["poster_path"],
        year: movie["release_date"].substr(0, 4),
        overview: movie["overview"],
        rating: movie["vote_average"],
      }))
    );
    return modifiedData;
  } catch (err) {
    console.error(err);
  }
};

export const getGenreList = async () => {
  try {
    const { data } = await axios.get(genre, {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
        language: "en_US",
        page: 1,
      },
    });
    const modifiedData = data["genres"].map((genre) => ({
      id: genre["id"],
      name: genre["name"],
    }));
    return modifiedData;
  } catch (err) {
    console.error(err);
  }
};

export const getGenre = async (genre_id, page) => {
  try {
    const { data } = await axios.get(movies, {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
        language: "en_US",
        page: page || 1,
        with_genres: genre_id,
      },
    });
    let modifiedData = [];
    modifiedData.push({ totalPages: data["total_results"] });
    modifiedData.push(
      data["results"].map((movie) => ({
        id: movie["id"],
        backPoster: poster + movie["backdrop_path"],
        popularity: movie["popularith"],
        title: movie["title"],
        poster: poster + movie["poster_path"],
        year: movie["release_date"].substr(0, 4),
        overview: movie["overview"],
        rating: movie["vote_average"],
      }))
    );
    return modifiedData;
  } catch (err) {
    console.error(err);
  }
};
export const getMovieCast = async (id) => {
  try {
    const { data } = await axios.get(`${movie}/${id}/credits`, {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
      },
    });
    const modifiedData = data["cast"].map((cast) => ({
      id: cast["id"],
      character: cast["character"],
      name: cast["name"],
      img: "https://image.tmdb.org/t/p/w200" + cast["profile_path"],
    }));

    return modifiedData;
  } catch (err) {
    console.error(err);
  }
};

export const getCelebrity = async (id) => {
  try {
    const { data } = await axios.get(`${celebrity}/${id}`, {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
      },
    });
    const modifiedData = {
      id: data.id,
      name: data.name,
      otherNames: data.also_known_as,
      birthPlace: data.place_of_birth,
      birthday: data.birthday,
      deathday: data.deathday,
      gender: data.gender,
      profileImage: `${data.profile_path}`,
      knownFor: data.known_for_department,
      biography: data.biography,
    };

    return modifiedData;
  } catch (err) {
    console.error(err);
  }
};

export const getCelebrityMovies = async (celebID) => {
  try {
    const { data } = await axios.get(movies, {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
        sort_by: "release_date.desc",
        page: 1,
        with_cast: celebID,
      },
    });
    let modifiedData = [];
    modifiedData.push({ totalPages: data["total_results"] });
    modifiedData.push(
      data["results"].map((movie) => ({
        id: movie["id"],
        backPoster: poster + movie["backdrop_path"],
        popularity: movie["popularity"],
        title: movie["title"],
        poster: poster + movie["poster_path"],
        year: movie["release_date"].substr(0, 4),
        overview: movie["overview"],
        rating: movie["vote_average"],
      }))
    );
    return modifiedData;
  } catch (err) {
    console.error(err);
  }
};

export const getSimilarMovies = async (id) => {
  try {
    const { data } = await axios.get(`${movie}/${id}/similar`, {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
        language: "en_US",
      },
    });
    const modifiedData = data["results"].map((movie) => ({
      id: movie["id"],
      backPoster: poster + movie["backdrop_path"],
      popularity: movie["popularith"],
      title: movie["title"],
      poster: poster + movie["poster_path"],
      year: movie["release_date"].substr(0, 4),
      overview: movie["overview"],
      rating: movie["vote_average"],
    }));

    return modifiedData;
  } catch (err) {
    console.error(err);
  }
};
