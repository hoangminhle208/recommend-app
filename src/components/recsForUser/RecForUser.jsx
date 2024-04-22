import { useLocation, useParams } from "react-router-dom";
import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Card,
  CardBody,
  Heading,
  Image,
  SimpleGrid,
  SkeletonText,
  Box,
  Text
} from "@chakra-ui/react";

const RecForUser = () => {
  const [listMovieRecs, setListMovieRecs] = useState([]);
  const [listMovieUser, setListMovieUser] = useState([]);
  const [userId, setUserId] = useState(0);
  const [numLast, setNumLast] = useState(0);
  const [num, setNum] = useState(0);
  const [q, setQ] = useState("");


  const handleRecommend = async () => {
    if (userId > 0 && numLast > 0 && num > 0) {
      await fetch(
        `${import.meta.env.VITE_FAST_API_URL}/get-recommend-for-user`,
        {
          method: "POST",
          body: JSON.stringify({
            userId: userId,
            num: num,
            num_last: numLast,
            q: q,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setListMovieRecs(data.recs_movie);
          setListMovieUser(data.user_movie);
        });
      console.log(listMovieRecs)
    } else {
      alert("required");
    }
  };


  return (
    <React.Fragment>
      <FormControl isRequired marginTop={10} marginLeft={20}>
        <FormLabel>Recommend for user</FormLabel>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "50%",
          }}
        >
          <div style={{ width: "45%" }}>
            <Input
              placeholder="User ID"
              onChange={(e) => setUserId(e.target.value)}
            />
            <Input
              placeholder="Number of movies the user last rated highly"
              onChange={(e) => setNumLast(e.target.value)}
              marginTop={4}
            
            />
          </div>
          <div style={{ width: "45%" }}>
            <Input
              placeholder="Number of movies recommend"
              onChange={(e) => setNum(e.target.value)}

            />
            <Input
              placeholder="...q"
              onChange={(e) => setQ(e.target.value)}
              marginTop={4}
            />
          </div>
        </div>
        <Button
          colorScheme="facebook"
          onClick={() => handleRecommend()}
          marginTop={4}
        >
          Recommend
        </Button>
      </FormControl>
      {listMovieUser.length > 0 ? (
        <div style={{ marginTop: "20px" }}>
          <h3>The user has rated the following movies highly</h3>
          <div>
            <SimpleGrid
              spacing={5}
              templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            >
              {listMovieUser.map((movie, index) => (
                <div key={index}>
                  <Card height={350}>
                    <CardBody>
                      <Image
                        borderRadius="lg"
                        src={
                          movie.url == "NA"
                            ? "https://via.placeholder.com/150"
                            : movie.url
                        }
                        alt="Image of movie"
                        objectFit="cover"
                        height={250}
                        width={203}
                      />
                      <Heading size="md">
                        {movie.title ? movie.title : "NA"}
                      </Heading>
                    </CardBody>
                  </Card>
                </div>
              ))}
            </SimpleGrid>
          </div>
        </div>
      ) : (
        <Box padding="6" boxShadow="lg" bg="white">
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        </Box>
      )}

      {listMovieRecs.length > 0 ? (
        <div style={{ marginTop: "20px" }}>
          <h3>Recommended movies:</h3>
          <div>
            <SimpleGrid
              spacing={5}
              templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            >
              {listMovieRecs.map((movie, index) => (
                <div key={index}>
                  <Card height={350}>
                    <CardBody>
                      <Image
                        borderRadius="lg"
                        src={
                          movie.url == "NA"
                            ? "https://via.placeholder.com/150"
                            : movie.url
                        }
                        alt="Image of movie"
                        objectFit="cover"
                        height={250}
                        width={203}
                      />
                      <Heading size="md">
                        {movie.title ? movie.title : "NA"}
                      </Heading>
                      <Text>{movie.release_date ? movie.release_date : "NA"}</Text>
                    </CardBody>
                  </Card>
                </div>
              ))}
            </SimpleGrid>
          </div>
        </div>
      ) : (
        <Box padding="6" boxShadow="lg" bg="white">
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        </Box>
      )}
    </React.Fragment>
  );
};

export default RecForUser;
