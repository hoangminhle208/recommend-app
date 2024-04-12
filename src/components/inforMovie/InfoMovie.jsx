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
  StackDivider,
  Text,
  TagLabel,
  Tag,
} from "@chakra-ui/react";

const InfoMovie = () => {
  const location = useLocation();
  const [infoMovie, setInfoMovie] = useState(location.state);
  const [searchInput, setSearchInput] = useState("");
  const handleRecommend = () => {
    console.log(infoMovie);
  };

  const style = {
    position: "fixed",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    zIndex: -1,
    backgroundImage: `url(${infoMovie.url_poster})`,
    backgroundSize: "fit", /* Phóng to hoặc thu nhỏ ảnh để nó phủ toàn bộ phần tử */
    filter: "blur(3px)",

  }

  return (
    <React.Fragment>
      <div style={style}>
      </div>
      <Card marginTop={5}
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
            <CardBody style={{border:"1px solid red", width:"100vh"}}>
              <VStack
                divider={<StackDivider borderColor="gray.200" />}
                spacing={4}
                align="stretch"
              >
                <Box h="40px" bg="yellow.200">
                  1
                </Box>
                <Box h="40px" bg="tomato">
                  2
                </Box>
                <Box h="40px" bg="pink.100">
                  3
                </Box>
              </VStack>
            </CardBody>

            <CardFooter>
              <Button variant="solid" colorScheme="blue">
                Buy Latte
              </Button>
            </CardFooter>
          </Stack>
        </Card>
    </React.Fragment>
  );
};

export default InfoMovie;
