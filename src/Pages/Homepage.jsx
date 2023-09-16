import React, { useEffect, useState } from "react";
import Logo from "../assets/Logo.png";
import imdb from "../assets/imdb.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faGreaterThan,
} from "@fortawesome/free-solid-svg-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import Card from "../Components/Card";
import SearchPage from "./searchpage";

const Homepage = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hero, setHero] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated?api_key=51622a92f8effebccf78ad57f65dc592"
        );
        const responseData = await response.json();
        setMoviesList(responseData.results);

        // Set the hero movie
        const top10Movies = responseData.results.slice(0, 10);
        const randomIndex = Math.floor(Math.random() * 10);
        setHero(top10Movies[randomIndex]);
      } catch (error) {
        console.error("Error fetching movies data", error);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, []);

  // Function to handle search and update search results
  const handleSearch = async (query) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=51622a92f8effebccf78ad57f65dc592&query=${encodeURIComponent(
          query
        )}`
      );
      const responseData = await response.json();
      setSearchResults(responseData.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div id="home" className="lg:flex lg:flex-col">
      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original//${hero?.backdrop_path})`,
        }}
        className="lg:px-8 lg:py-3 px-5 py-2 text-white min-h-screen bg-[rgba(0,0,0,50%)] bg-blend-overlay bg-cover bg-center bg-no-repeat"
      >
        <nav className="flex md:flex-row flex-col md:justify-between items-center">
          <img src={Logo} alt="MovieBox" className="w-40" />
          <div className="relative w-full md:w-auto md:max-w-md">
            <input
              type="text"
              placeholder="What do you want to watch? "
              className="border border-gray-300 outline-none rounded-md px-3 py-2 w-full md:w-[400px] bg-transparent text-white placeholder-text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FontAwesomeIcon
              className="absolute top-[50%] translate-y-[-50%] right-4 cursor-pointer"
              icon={faSearch}
              onClick={() => handleSearch(searchQuery)}
            />
          </div>
          <div className="hidden md:flex flex-row items-center gap-6">
            <p>Sign In</p>
            <div className="bg-rose-700 px-2 py-1 rounded-full">
              <FontAwesomeIcon icon={faBars} />
            </div>
          </div>
        </nav>
        {isLoading ? (
          <h6 className="text-center">Loading your page.....</h6>
        ) : (
          <div className="mt-20 md:w-[35%] w-full gap-4 flex flex-col">
            <h1 className="text-3xl">{hero?.title}</h1>
            <span className="text-sm flex flex-row items-center gap-2">
              <img src={imdb} alt="" />
              {hero?.vote_average * 10} / 100
            </span>
            <p className="text-sm">{hero?.overview}</p>
            <button className="flex w-fit rounded-md flex-row items-center gap-2 px-4 py-2 bg-rose-700">
              <AiFillPlayCircle />
              <span className="text-sm uppercase font-medium">
                Watch trailer
              </span>
            </button>
          </div>
        )}
      </div>
      <div className="lg:px-8 lg:py-3 px-5 py-2">
        <div className="flex flex-row items-center justify-between mt-5 bg-white">
          <h2>Featured Movie</h2>
          <div className="flex flex-row items-center gap-2 text-rose-700">
            <h6>See More </h6>
            <FontAwesomeIcon icon={faGreaterThan} />
          </div>
        </div>
        {searchResults.length > 0 ? (
          <div className="grid md:grid-cols-4 grid-cols-1 gap-8 my-4 place-items-center">
            {searchResults.map((movie) => (
              <Card key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-4 grid-cols-1 gap-8 my-4 place-items-center">
            {moviesList.slice(0, 10).map((movie) => (
              <Card key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
