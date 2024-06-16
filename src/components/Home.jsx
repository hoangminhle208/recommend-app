import React, {useEffect, useState} from "react";
import BackGround from "./layout/BackGround";
import { Heading } from '@chakra-ui/react'
import MovieCard from "./movieCard/MovieCard";

const Home = () => {
  const [listMovie, setListMovie] = useState([]);
  const [hasFetchedData, setHasFetchedData] = useState(false);

  useEffect(() => {
    if(listMovie.length == 0 && hasFetchedData == false){
      handleFetchMovie()
    }
  }, []);

  const handleFetchMovie = async () => {
    //setListMovie([]);
    const genres = getRandomGenres();
    try {
      const response = await fetch(`${import.meta.env.VITE_FAST_API_URL}/search`, {
        method: "POST",
        body: JSON.stringify({
          nameMovie: genres,
          size: 21
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      
      const data = await response.json();
      setListMovie(data);
      setHasFetchedData(true);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const getRandomGenres = () => {
    const randomGenres = ["Drama", "Crime", "Children", "Comedy", "Romance", "Sci-Fi", "Mystery", "Thriller", "Action", "Adventure", "Fantasy", "Musical", "Horror"];
    const clonedGenres = [...randomGenres];
    const randomSelection = [];
    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(Math.random() * clonedGenres.length);
      randomSelection.push(clonedGenres[randomIndex]);
      clonedGenres.splice(randomIndex, 1);
    }
    const genresString = `genres:"${randomSelection.join('","')}"`;
    return genresString
  }

  return (
    <React.Fragment>
      <BackGround/>
      <Heading color="white" as='h1' size='4xl' noOfLines={1} colorScheme='green' ml="100px" mt='100px'>
        Welcome to Recommend App
      </Heading>
      <div  style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gridGap: '5px' }}>
      {hasFetchedData && listMovie.length > 0 ? (
                <>
                {listMovie.map((movie) => (
                  <MovieCard
                    movie={movie}
                    key={movie.infor_movie.movieId}
                    movieId={movie.infor_movie.movieId}
                    url={movie.url_poster}
                  />
                ))}
              </>
            ) : (
              <div></div>
            )}
      </div>
      
    </React.Fragment>
)
};

export default Home;
