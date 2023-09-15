import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import imdb from "../assets/imdb.png";
import tom from "../assets/tom.png";

const Card = ({ movie }) => {
  const [liked, setLiked] = useState(false);

  function toggleLike() {
    setLiked(!liked);
  }

  return (
    <div
      data-testid="movie-card"
      className="relative w-full transition transform hover:scale-104 hover:shadow-lg"
    >
      <div
        className="absolute top-2 right-3 p-2 rounded-full bg-[rgba(243,244,246,50%)]"
        onClick={toggleLike}
      >
        <AiFillHeart
          className={`${liked ? "text-rose-700" : "text-gray-300"}`}
        />
      </div>
      <Link to={"/movies/" + movie.id}>
        <img
          src={`https://image.tmdb.org/t/p/original//${movie.poster_path}`}
          alt={movie.title}
          className="max-w-full"
          data-testid="movie-poster"
        />
        <p className="mb-2" data-testid="movie-release-date">
          {movie.release_date}
        </p>
        <h6 className="font-bold my-2" data-testid="movie-title">
          {movie.title}
        </h6>
        <div className="text-sm flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-2">
            <img src={imdb} alt="" />
            {movie.vote_average * 10} / 100
          </div>
          <div className="flex flex-row items-center gap-1">
            <img src={tom} alt="" />
            {movie.vote_average * 10}
          </div>
        </div>
        <p className="mb-2 my-2" data-testid="movie-genre">
          {movie.genre} {/* Display the movie genre */}
        </p>
      </Link>
    </div>
  );
};

export default Card;
