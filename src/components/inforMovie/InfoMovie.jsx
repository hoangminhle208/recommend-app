import { useLocation, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  CardBody,
  Stack,
  CardFooter,
  Card,
  VStack,
  Box,
  Text,
  TagLabel,
  Tag,
  Heading,
  Input,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  NumberInput,
} from "@chakra-ui/react";
import MovieCard from "../movieCard/MovieCard";
import.meta.env;

const InfoMovie = () => {
  const location = useLocation();
  const [infoMovie, setInfoMovie] = useState(location.state);
  const [searchInput, setSearchInput] = useState("");
  const [listMovieRecs, setListMovieRecs] = useState([]);
  const [clickRecommend, setClickRecommend] = useState(false);
  const [num, setNum] = useState(5);

  useEffect(() => {
    setClickRecommend(false);
    setSearchInput("");
    setInfoMovie(location.state);
  }, [location.state]);

  const handleRecommend = async (id, input, num) => {
    setClickRecommend(true);
    await handleFetchMovieRecs(id, input, num);
  };

  const handleFetchMovieRecs = async (id, input, num) => {
    setListMovieRecs([]);
    await fetch(`${import.meta.env.VITE_FAST_API_URL}/recommend`, {
      method: "POST",
      body: JSON.stringify({
        movieId: id,
        inputSearch: input,
        num: num,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setListMovieRecs(data);
      });
    console.log(listMovieRecs);
  };

  const style = {
    position: "fixed",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    zIndex: -1,
    backgroundImage: `url(${infoMovie.url_poster})`,
    backgroundSize:"fit" /* Phóng to hoặc thu nhỏ ảnh để nó phủ toàn bộ phần tử */,
    filter: "blur(3px)",
  };

  return (
    <React.Fragment >
      <div style={style}></div>
      <Card
        marginTop={5}
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={infoMovie.url_poster}
          alt="Caffe Latte"
        />

        <Stack>
          <CardBody style={{ width: "100vh" }}>
            <VStack
              //divider={<StackDivider borderColor="gray.200" />}

              spacing={4}
              align="stretch"
            >
              <Box h="40px" marginBottom={5}>
                <Heading size="lg" fontSize="50px">
                  {infoMovie.infor_movie.title}
                </Heading>
              </Box>
              <Box h="40px">
                {infoMovie.infor_movie.genres.length > 0 ? (
                  <div>
                    {infoMovie.infor_movie.genres.map((genre, index) => (
                      <Tag
                        size="lg"
                        colorScheme="red"
                        borderRadius="full"
                        key={index}
                      >
                        <TagLabel>{genre}</TagLabel>
                      </Tag>
                    ))}
                  </div>
                ) : (
                  <Text>No genres</Text>
                )}
              </Box>
              <Box h="40px">
                <Text color="blue.600" fontSize="2xl">
                  Release date: {infoMovie.infor_movie.release_date}
                </Text>
              </Box>
              {/* <Box h="40px">
                <Input placeholder="Basic usage" />
              </Box> */}
            </VStack>
          </CardBody>

          <CardFooter>
            <div style={{ display: "flex" }}>
              <Input
                onChange={(e) => setSearchInput(e.target.value)}
                marginRight={5}
                width={300}
                placeholder="import sth"
              />
              <NumberInput
                size="md"
                maxW={24}
                defaultValue={5}
                min={1}
                marginRight={5}
                onChange={(value) => setNum(value)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Button
                variant="solid"
                colorScheme="blue"
                onClick={() =>
                  handleRecommend(infoMovie.infor_movie.id, searchInput, num)
                }
              >
                Recommend
              </Button>
            </div>
          </CardFooter>
        </Stack>
      </Card>
      {clickRecommend == true ? (
        <div style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
          <h1
            style={{
              color: "white",
              fontSize: "1.875rem", // tương đương với 3xl size
              paddingTop: "0.75rem", // tương đương với py-3
              paddingBottom: "0.75rem", // tương đương với py-3
            }}
          >
            People who liked this movie also liked these:
          </h1>
          <div className="no-scrollbar" style={{display: 'flex', overflowX: 'auto', cursor: 'pointer' }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {listMovieRecs.length > 0 ? (
                <>
                {listMovieRecs.map((movie) => (
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
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </React.Fragment>
  );
};

export default InfoMovie;
