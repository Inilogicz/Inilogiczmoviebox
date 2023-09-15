import React, { useEffect, useState } from "react";
import { useParams, NavLink, Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { BsCameraReels, BsCalendar3 } from "react-icons/bs";
import { MdOndemandVideo } from "react-icons/md";
import { GrLogout } from "react-icons/gr";
import { FaBars } from "react-icons/fa";
import Logo from "../assets/Logo-b.png";

const Movie = () => {
  let params = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [trailerId, setTrailerId] = useState(""); // Define trailerId state
  const [trailerUrl, setTrailerUrl] = useState(""); // Define trailerUrl state

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await fetchMovieDetails(params.id);
        setMovieDetails(movieData);

        // Fetch the trailer ID using the movie's title
        const trailerData = await fetchTrailerData(movieData.title);
        if (trailerData && trailerData.items && trailerData.items.length > 0) {
          setTrailerId(trailerData.items[0].id.videoId);

          // Set the trailer URL
          setTrailerUrl(`https://www.youtube.com/watch?v=${trailerData.items[0].id.videoId}`);
        }
      } catch (error) {
        console.error("Error fetching movie details", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [params.id]);

  // Function to fetch movie details
  const fetchMovieDetails = async (movieId) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=51622a92f8effebccf78ad57f65dc592`
    );
    return response.json();
  };

  // Function to fetch the trailer ID using the movie title
  const fetchTrailerData = async (movieTitle) => {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=id&q=${movieTitle} trailer&key=AIzaSyBkDQqlWGJBteT9QxdYJmY646hzekUNJeE`
    );
    return response.json();
  };

  if (isLoading) {
    return <h6 className="text-center">Loading...</h6>;
  }

  const release_date = movieDetails.release_date;

  // Check if release_date is a valid date before converting to ISO string
  const dateInLocalTime = release_date ? new Date(release_date) : null;

  // Check if dateInLocalTime is valid before converting to ISO string
  const release_date_in_utc = dateInLocalTime ? dateInLocalTime.toISOString() : '';


  return (
    <section id="movie" className="overflow-hidden relative">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden absolute top-4 right-4 text-white z-10"
      >
        <FaBars className="text-2xl" />
      </button>

      <div className="w-full flex md:flex-row">
        {/* Side Navigation */}
        <div
          className={`${
            mobileMenuOpen ? "md:w-[15%] md:flex" : "hidden md:block"
          } flex-col border border-[rgba(0,0,0,30%)] rounded-r-[45px]`}
        >
          <img src={Logo} alt="MovieBox Logo" className="m-8" />
          <div className="flex flex-col">
            <Link to="/" className="nav-link">
              <GoHome className="text-2xl" />
              <h5>Home</h5>
            </Link>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "nav-link bg-[rgba(190,18,60,10%)] text-[#BE123C] border-r-4 border-r-[#BE123C]"
                  : "nav-link"
              }
            >
              <BsCameraReels className="text-xl text-[#666666]" />
              <h5>Movies</h5>
            </NavLink>
            <NavLink className="nav-link">
              <MdOndemandVideo className="text-xl" />
              <h5>TV Series</h5>
            </NavLink>
            <NavLink className="nav-link">
              <BsCalendar3 className="text-xl" />
              <h5>Upcoming</h5>
            </NavLink>
          </div>
          <div className="m-4 border border-[rgba(190,18,60,70%)] rounded-2xl px-2 py-3 bg-[rgba(248,231,235,40%)] flex flex-col">
            <p className="text-[rgba(51,51,51,80%)]">
              Play movie quizzes and earn free tickets
            </p>
            <span className="text-xs text-[#666666]">
              50k people are playing now
            </span>
            <span className="text-xs text-[#BE123C] bg-[rgba(190,18,60,20%)] rounded-2xl my-2 py-2 text-center">
              Start playing
            </span>
          </div>
          <NavLink className="nav-link">
            <GrLogout className="text-xl" />
            <h5>Log out</h5>
          </NavLink>
        </div>
        <div className="md:w-[85%] w-full m-[3%]">
          {trailerUrl && (
            <iframe
            title="Movie Trailer"
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailerId}`}
            allowFullScreen={true}
            allow="fullscreen"
          ></iframe>

          )}
          <h4 data-testid="movie-title">{movieDetails.title}</h4>
          <h4 data-testid="movie-release-date">{release_date_in_utc}</h4>
          <h4 data-testid="movie-runtime">
            {movieDetails.runtime} minutes
          </h4>
          <h6 data-testid="movie-overview">{movieDetails.overview}</h6>
        </div>
      </div>
    </section>
  );
};

export default Movie;
