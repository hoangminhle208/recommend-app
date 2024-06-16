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
import { DatePicker, Space, Button } from 'antd';


const Visualize = () => {
  const [totalMovies, setTotalMovies] = useState(-1);
  const [imgMovieCountByYear, setImgMovieCountByYear] = useState("");
  const [top10MovieByVote, setTop10MovieByVote] = useState("");
  const [popularGenres, setPopularGenres] = useState("");
  const [highRateMovie, setHighRateMovie] = useState("");
  const [yearFrom, setYearFrom] = useState(1990);
  const [yearTo, setYearTo] = useState(2010);
  const { RangePicker } = DatePicker;

  useEffect(() => {
    getTotalMovie()
    getChart()
  }, []);

  const handleReloadImg = () => {
    console.log(yearFrom);
    console.log(yearTo);
    getChart()
  }
  const getTotalMovie = async () => {
    await fetch(
      `${import.meta.env.VITE_FAST_API_URL}/api/total_movies`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setTotalMovies(data.total_movies);
      });
    //console.log(totalMovies)
  };
  
  const getChart = async() => {
    await fetch(
      `${import.meta.env.VITE_FAST_API_URL}/movies_year`,
      {
        method: "POST",
        body: JSON.stringify({
          "start_date":yearFrom,
          "end_date":yearTo
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setImgMovieCountByYear(data)
      });
    //console.log(imgMovieCountByYear)
    await fetch(
      `${import.meta.env.VITE_FAST_API_URL}/top_10_movies_vote`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setTop10MovieByVote(data)
      });
      //console.log(top10MovieByVote)
      await fetch(
        `${import.meta.env.VITE_FAST_API_URL}/popularity_of_genres`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setPopularGenres(data)
        });
        await fetch(
          `${import.meta.env.VITE_FAST_API_URL}/highest_rated_movie`,
          {
            method: "POST",
            body: JSON.stringify({
              "start_date":yearFrom,
              "end_date":yearTo
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            setHighRateMovie(data)
          });
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
                  {totalMovies}
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
                  .....
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
                  .....
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
        
        <div style={{display:"flex", marginTop:"30px"}}>

        <img src={`data:image/jpeg;base64,${imgMovieCountByYear}`} />
        <img src={`data:image/jpeg;base64,${highRateMovie}`} />

        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Space direction="vertical" size={12}>
            <RangePicker
            picker="year"
            placeholder={['Start Year:1990','End Year:2010']}
            onChange={(value) => {
              setYearFrom(value[0].$y)
              setYearTo(value[1].$y)
              
            }}
            id={{
              start: BigInt,
              end: BigInt,
            }}
            
          />
          </Space>
          <Button type="primary" onClick={()=>handleReloadImg()}>Reload</Button>
        </div>
        <img style={{marginRight:"30px"}} src={`data:image/jpeg;base64,${top10MovieByVote}`} />
        <img src={`data:image/jpeg;base64,${popularGenres}`} />
        
      </div>
    </React.Fragment>
  );
};

export default Visualize;
