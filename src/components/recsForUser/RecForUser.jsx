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
} from "@chakra-ui/react";

const RecForUser = () => {
  const [listMovieRecs, setListMovieRecs] = useState([]);
  const [listMovieUser, setListMovieUser] = useState([]);
  const [userId, setUserId] = useState(0);
  const [numLast, setNumLast] = useState(0);
  const [num, setNum] = useState(0);
  const [q, setQ] = useState("");

  // const data = {
  //   user_movie: [
  //     {
  //       title: "Seven (a.k.a. Se7en)",
  //       url: "https://image.tmdb.org/t/p/w500/6yoghtyTpznpBik8EngEmJskVUO.jpg",
  //     },
  //     {
  //       title: "Usual Suspects, The",
  //       url: "https://image.tmdb.org/t/p/w500/rWbsxdwF9qQzpTPCLmDfVnVqTK1.jpg",
  //     },
  //     {
  //       title: "Bottle Rocket",
  //       url: "https://image.tmdb.org/t/p/w500/6E7mJ5wpzTFbYFbJvTzzZ8Til9C.jpg",
  //     },
  //     {
  //       title: "Rob Roy",
  //       url: "https://image.tmdb.org/t/p/w500/4QuypgbNYmPECAAHnV3QY8qEpOz.jpg",
  //     },
  //     {
  //       title: "Canadian Bacon",
  //       url: "https://image.tmdb.org/t/p/w500/bzK2aQ8xUB67kwCR5LHTSY99HtT.jpg",
  //     },
  //     {
  //       title: "Desperado",
  //       url: "https://image.tmdb.org/t/p/w500/e3gwpBeXpvGZsxUya9zNym5QXrw.jpg",
  //     },
  //     {
  //       title: "Billy Madison",
  //       url: "https://image.tmdb.org/t/p/w500/iwk9pWR6MwTInEQc8Vw5vGHjeQ0.jpg",
  //     },
  //     {
  //       title: "Dumb & Dumber (Dumb and Dumber)",
  //       url: "https://image.tmdb.org/t/p/w500/4LdpBXiCyGKkR8FGHgjKlphrfUc.jpg",
  //     },
  //     {
  //       title: "Star Wars: Episode IV - A New Hope",
  //       url: "https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
  //     },
  //     {
  //       title: "Tommy Boy",
  //       url: "https://image.tmdb.org/t/p/w500/6m1xJqfViDkmNmKUKvTSJ5fo0k4.jpg",
  //     },
  //   ],
  //   recs_movie: [
  //     {
  //       title: "Four Rooms",
  //       score: 0.9866636,
  //       url: "https://image.tmdb.org/t/p/w500/75aHn1NOYXh4M7L5shoeQ6NGykP.jpg",
  //     },
  //     {
  //       title: "Crippled Avengers (Can que) (Return of the 5 Deadly Venoms)",
  //       score: 0.9861176,
  //       url: "https://image.tmdb.org/t/p/w500/s6snsNvb1UBKIqfvoKpB1p6D2NM.jpg",
  //     },
  //     {
  //       title: "Nine to Five (a.k.a. 9 to 5)",
  //       score: 0.9687842,
  //       url: "https://image.tmdb.org/t/p/w500/34cDJ8DMVb0RuIg5zDuotCGdNKb.jpg",
  //     },
  //     {
  //       title: "Fast Five (Fast and the Furious 5, The)",
  //       score: 0.9675164,
  //       url: "https://image.tmdb.org/t/p/w500/gEfQjjQwY7fh5bI4GlG0RrBu7Pz.jpg",
  //     },
  //     {
  //       title: "Father of the Bride Part II",
  //       score: 0.9645666,
  //       url: "https://image.tmdb.org/t/p/w500/rj4LBtwQ0uGrpBnCELr716Qo3mw.jpg",
  //     },
  //   ],
  // };

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
