import React, { useEffect, useState } from "react";
import {
  SimpleGrid,
  Card,
  CardBody,
  Text,
  Heading,
  Stack,
  Skeleton,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { MdLocalMovies } from "react-icons/md";
import { IoMdStar, IoIosAttach, IoIosFolder } from "react-icons/io";
const Visualize = () => {
  const [totalMovies, setTotalMovies] = useState(-1);
  const [imgMovieCountByYear, setImgMovieCountByYear] = useState("");
  const [top10MovieByVote, setTop10MovieByVote] = useState("");
  const [popularGenres, setPopularGenres] = useState("");
  const [highRateMovie, setHighRateMovie] = useState("");
  const [yearFrom, setYearFrom] = useState(0);
  const [yearTo, setYearTo] = useState(0);

  
  useEffect(() => {

  }, []);

  const getTotalMovie = async () => {
    await fetch(
      `${import.meta.env.VITE_FAST_API_URL}/api/total_movies`,
      {
        method: "GET",
        body:{},
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setTotalMovies(data.total_movies);
      });
    console.log(totalMovies)
  };
  
  const getChart = async() => {
    await fetch(
      `${import.meta.env.VITE_FAST_API_URL}/movies_year`,
      {
        method: "GET",
        body:{},
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        //setTotalMovies(data.total_movies);
      });
    //console.log(listMovieRecs)
  }

  return (
    <React.Fragment>
      <div>
        {/* <img src={`data:image/jpeg;base64,${data}`} /> */}
        {totalMovies >= 0 ? (
          <SimpleGrid
            marginTop={5}
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
          >
            <Card style={{ borderLeft: "5px solid green" }}>
              <CardBody>
                <Heading size="md">
                  {" "}
                  Total movies{" "}
                  <Icon as={MdLocalMovies} w={8} h={8} color="red.500" />
                </Heading>
                <Text fontSize="30px" fontWeight={700} color="tomato">
                  500
                </Text>
              </CardBody>
            </Card>
            <Card style={{ borderLeft: "5px solid #1E90FF" }}>
              <CardBody>
                <Heading size="md">
                  {" "}
                  Total rating{" "}
                  <Icon as={IoMdStar} w={8} h={8} color="red.500" />
                </Heading>
                <Text fontSize="30px" fontWeight={700} color="tomato">
                  500
                </Text>
              </CardBody>
            </Card>
            <Card style={{ borderLeft: "5px solid #8B0000" }}>
              <CardBody>
                <Heading size="md">
                  {" "}
                  Data....
                  <Icon as={IoIosAttach} w={8} h={8} color="red.500" />
                </Heading>
                <Text fontSize="30px" fontWeight={700} color="tomato">
                  500
                </Text>
              </CardBody>
            </Card>
            <Card style={{ borderLeft: "5px solid #FFA500" }}>
              <CardBody>
                <Heading size="md">
                  Data...
                  <Icon as={IoIosFolder} w={8} h={8} color="red.500" />
                </Heading>
                <Text fontSize="30px" fontWeight={700} color="tomato">
                  500
                </Text>
              </CardBody>
            </Card>
          </SimpleGrid>
        ) : (
          <div>
            <Stack marginTop={10}>
              <Skeleton height="20px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
            </Stack>
          </div>
        )}
        {/* <div style={{display:"flex", marginTop:"30px"}}>
          <img src={`data:image/jpeg;base64,${chart2}`} />
          <img style={{marginRight:"30px"}} src={`data:image/jpeg;base64,${chart5}`} />
        </div>

        <img src={`data:image/jpeg;base64,${chart3}`} />
        <img src={`data:image/jpeg;base64,${chart4}`} /> */}
      </div>
    </React.Fragment>
  );
};

export default Visualize;
