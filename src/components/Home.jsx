import React from "react";
import BackGround from "./layout/BackGround";
import { Heading } from '@chakra-ui/react'

const Home = () => {
  
  return (
    <React.Fragment>
      <BackGround/>
      <Heading color="white" as='h1' size='4xl' noOfLines={1} colorScheme='green' ml="100px" mt='100px'>
        Welcome to Recommend App
      </Heading>
    </React.Fragment>
)
};

export default Home;
