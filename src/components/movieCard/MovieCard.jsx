import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ url, movieId , movie}) => {
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate(`/info-movie/${movieId}`,{ state: movie })
    console.log(movie)
  };

  return (
    <div
      style={{
        width: "12rem", // tương đương với w-48
        paddingRight: "0.5rem", // tương đương với pr-2
      }}
      onClick={()=>handleOpen()}
    >
      <img src={url != 'NA' ? url : 'https://via.placeholder.com/150'} alt="movie-banner" />
    </div>
  );
};

export default MovieCard;
