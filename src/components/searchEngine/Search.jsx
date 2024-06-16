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
  Card,
  Button,
  Text,
  Image,SimpleGrid, Tag, TagLabel,Spinner
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import.meta.env;

const Search = () => {
  const [listMovie, setListMovie] = useState([]);
  const [quantity, setQuantity] = useState(10);
  const [nameSearch, setNameSearch] = useState("");
  const [clickButton, setClickButton] = useState(false);
  const [checkData, setCheckData] = useState(false);
  const navigate = useNavigate();

  const handleSearchMovie = async () => {
    setClickButton(true)
    setListMovie([]);
    setCheckData(true)
    if (quantity > 0 && nameSearch !== "") {
      try {
        const response = await fetch(`${import.meta.env.VITE_FAST_API_URL}/search`, {
          method: "POST",
          body: JSON.stringify({
            nameMovie: nameSearch,
            size: quantity,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const data = await response.json();
        setListMovie(data);
        setCheckData(data.length > 0);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        //setIsLoading(false);
      }
    } else {
      console.log("check", checkData);
      alert("Please type name or genres of movie");
      //setIsLoading(false);
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
            placeholder="title or genres of movie"
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
      {listMovie.length > 0 && checkData ==true ? (
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
                  <Heading 
                    //isTruncated
                    style={{height:"50px",overflow:"hidden", textOverflow:"ellipsis"}} size='md'
                  >
                    {movie.infor_movie.title ? movie.infor_movie.title : "NA"}
                  </Heading>
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
        //<div>Loading</div>
        <>{
          clickButton ? (
           checkData ? (
            <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
            marginLeft={500}
            marginTop={50}
            height={100}
            width={100}
          />
           ) : (
            <div>No data</div>
           )
        ) : (
          <div>
          </div>
        )}</>
      )}
    </React.Fragment>
  );
};

export default Search;
