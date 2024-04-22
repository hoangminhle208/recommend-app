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
  CardBody,
  CardFooter,
  Heading,
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
    setListMovie([]);
    if(quantity > 0 && nameSearch != ""){
      await fetch(`${import.meta.env.VITE_FAST_API_URL}/search`, {
        method: "POST",
        body: JSON.stringify({
          "nameMovie":nameSearch,
          "size":quantity
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then(response => response.json())
      .then(data => {
        setListMovie(data)
      })
      // await handleAddUrlPoster()
      console.log(listMovie)
    } else {
      alert("not")
    }
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
