import React, { useEffect, useState } from "react";
import {
  Input,
  Stack,
  InputGroup,
  InputLeftAddon,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  CircularProgress,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Divider,
  ButtonGroup,
  Button,
  Text,
  Image,SimpleGrid, Tag, TagLabel
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import.meta.env;

const Search = () => {
  const [listMovie, setListMovie] = useState([]);
  const [quantity, setQuantity] = useState(10);
  const [nameSearch, setNameSearch] = useState("");
  const navigate = useNavigate();

  const handleSearchMovie = async () => {
    setListMovie([
      {
        ordinal_number: 0,
        infor_movie: {
          movieId: 6197,
          title: "Spider",
          release_date: "2002",
          genres: ["drama", "mystery"],
          tmdbId: 9613,
          id: 6197,
        },
        url_poster:
          "https://image.tmdb.org/t/p/w500/zvm4WuYxTiGkRagRqHUey0meRQL.jpg",
      },
      {
        ordinal_number: 1,
        infor_movie: {
          movieId: 5349,
          title: "Spider-Man",
          release_date: "2002",
          genres: ["action", "adventure", "sci-fi", "thriller"],
          tmdbId: 557,
          id: 5349,
        },
        url_poster:
          "https://image.tmdb.org/t/p/w500/gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg",
      },
      {
        ordinal_number: 2,
        infor_movie: {
          movieId: 8636,
          title: "Spider-Man 2",
          release_date: "2004",
          genres: ["action", "adventure", "sci-fi", "imax"],
          tmdbId: 558,
          id: 8636,
        },
        url_poster:
          "https://image.tmdb.org/t/p/w500/olxpyq9kJAZ2NU1siLshhhXEPR7.jpg",
      },
      {
        ordinal_number: 3,
        infor_movie: {
          movieId: 52722,
          title: "Spider-Man 3",
          release_date: "2007",
          genres: ["action", "adventure", "sci-fi", "thriller", "imax"],
          tmdbId: 559,
          id: 52722,
        },
        url_poster:
          "https://image.tmdb.org/t/p/w500/qFmwhVUoUSXjkKRmca5yGDEXBIj.jpg",
      },
      {
        ordinal_number: 4,
        infor_movie: {
          movieId: 122926,
          title: "Untitled Spider-Man Reboot",
          release_date: "2017",
          genres: ["action", "adventure", "fantasy"],
          tmdbId: 202249,
          id: 122926,
        },
        url_poster: "NA",
      },
      {
        ordinal_number: 5,
        infor_movie: {
          movieId: 4238,
          title: "Along Came a Spider",
          release_date: "2001",
          genres: ["action", "crime", "mystery", "thriller"],
          tmdbId: 2043,
          id: 4238,
        },
        url_poster:
          "https://image.tmdb.org/t/p/w500/1YtsND7vSNymylnOSzgg3DdVFMB.jpg",
      },
      {
        ordinal_number: 6,
        infor_movie: {
          movieId: 5356,
          title: "Giant Spider Invasion, The",
          release_date: "1975",
          genres: ["horror", "sci-fi"],
          tmdbId: 39154,
          id: 5356,
        },
        url_poster:
          "https://image.tmdb.org/t/p/w500/pdD0zSAiHpX2TEz4uuVdMB3KkGB.jpg",
      },
      {
        ordinal_number: 7,
        infor_movie: {
          movieId: 95510,
          title: "Amazing Spider-Man, The",
          release_date: "2012",
          genres: ["action", "adventure", "sci-fi", "imax"],
          tmdbId: 1930,
          id: 95510,
        },
        url_poster:
          "https://image.tmdb.org/t/p/w500/jIfkQNARYyERqRAq1p1c8xgePp4.jpg",
      },
      {
        ordinal_number: 8,
        infor_movie: {
          movieId: 6786,
          title: "Kiss of the Spider Woman",
          release_date: "1985",
          genres: ["drama"],
          tmdbId: 11703,
          id: 6786,
        },
        url_poster:
          "https://image.tmdb.org/t/p/w500/lbrn4gOjYKrLrINn3uUJRlV2NZO.jpg",
      },
      {
        ordinal_number: 9,
        infor_movie: {
          movieId: 110553,
          title: "The Amazing Spider-Man 2",
          release_date: "2014",
          genres: ["action", "sci-fi", "imax"],
          tmdbId: 102382,
          id: 110553,
        },
        url_poster:
          "https://image.tmdb.org/t/p/w500/c3e9e18SSlvFd1cQaGmUj5tqL5P.jpg",
      },
    ]);
    // if(quantity > 0 && nameSearch != ""){
    //   await fetch(`${import.meta.env.VITE_FAST_API_URL}/search`, {
    //     method: "POST",
    //     body: JSON.stringify({
    //       "nameMovie":nameSearch,
    //       "size":quantity
    //     }),
    //     headers: {
    //       "Content-type": "application/json; charset=UTF-8",
    //     },
    //   })
    //   .then(response => response.json())
    //   .then(data => {
    //     setListMovie(data)
    //   })
    //   // await handleAddUrlPoster()
    //   console.log(listMovie)
    // } else {
    //   alert("not")
    // }
  };

  const handleGetMovieInfor = (movie) => {
    navigate(`/info-movie/${movie.infor_movie.movieId}`,{ state: movie })
    console.log(movie)
  }

  return (
    <React.Fragment>
      <Stack spacing={4} style={{ margin: "30px" }}>
        <InputGroup>
          <InputLeftAddon>Name movie</InputLeftAddon>
          <Input
            type="text"
            placeholder="title of movie or something"
            onChange={(e) => {
              setNameSearch(e.target.value);
            }}
          />
          <IconButton
            onClick={handleSearchMovie}
            width={70}
            colorScheme="blue"
            aria-label="Search database"
            icon={<SearchIcon />}
          />
        </InputGroup>

        <InputGroup size="sm">
          <InputLeftAddon>Quantity</InputLeftAddon>
          <NumberInput
            defaultValue={10}
            min={1}
            max={20}
            width={1100}
            onChange={(valueString) => setQuantity(valueString)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </InputGroup>
      </Stack>
      {listMovie.length > 0 ? (
        <div>
          <SimpleGrid spacing={5} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
          {listMovie.map((movie,index) => (
            <div key={index}>
              <Card height={480}>
                <CardBody>
                  <Image
                    borderRadius='lg'
                    src={movie.url_poster == "NA" ? 'https://via.placeholder.com/150' : movie.url_poster}
                    alt='Image of movie'
                    objectFit='cover'
                    height={250}
                    width={203}
                  />
                  <Heading size='md'>{movie.infor_movie.title ? movie.infor_movie.title : "NA"}</Heading>
                  {movie.infor_movie.genres.length > 0 ? (
                    <div>{
                      movie.infor_movie.genres.map((genre,index)=>(
                        <Tag size='lg' colorScheme='red' borderRadius='full' key={index} >
                          <TagLabel>{genre}</TagLabel>
                        </Tag>
                      ))
                    }</div>
                  ): <Text>No genres</Text>}
                </CardBody>
                <CardFooter >
                  <Button onClick={()=>handleGetMovieInfor(movie)}>View here</Button>
                </CardFooter>
              </Card>
            </div>
          ))}
          </SimpleGrid>
        </div>
      ) : (
        <div>Loading</div>
        //<CircularProgress isIndeterminate color='green.300' />
      )}
    </React.Fragment>
  );
};

export default Search;
