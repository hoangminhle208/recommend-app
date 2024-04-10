import React, { useEffect, useState } from "react"
import { Input, Stack,InputGroup, InputLeftAddon,IconButton, NumberInput,
  NumberInputField,NumberInputStepper,NumberIncrementStepper,NumberDecrementStepper,
  CircularProgress,
  Card, CardBody, CardFooter, Heading, Divider, ButtonGroup , Button, Text , Image
  } from '@chakra-ui/react'
import {SearchIcon}  from '@chakra-ui/icons'
import.meta.env

const Search = () => {
  const [listMovie,setListMovie] = useState([])
  const [quantity,setQuantity] = useState(15)
  const [nameSearch,setNameSearch] = useState("")

  const handleSearchMovie = async () => {
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
        handleAddUrlPoster()
        console.log(listMovie)
      })
    } else {
      alert("not")
    }
  }
  const handleAddUrlPoster = async() => {
    for (const movie of listMovie) {
      let url = await handleGetUrlPoster(movie.infor_movie.tmdbId)
      movie['url_poster'] = url
    }
    console.log(listMovie)
  }
  const handleGetUrlPoster = async(id) => {
    let url_poster = ""
    let URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}&append_to_response=videos`
    await fetch(URL).then(response => response.json())
    .then(data => 
      url_poster = import.meta.env.VITE_URL_POSTER_TMDB + data.poster_path
    )
    .catch(error => console.error(error));
    //console.log(object)
    return url_poster
    // console.log(import.meta.env.VITE_API_KEY)
  } 

  return (
    <React.Fragment>
      <Stack spacing={4} style={{ margin: "30px" }}>
        <InputGroup >
          <InputLeftAddon>
            Name movie
          </InputLeftAddon>
          <Input type='text' placeholder='title of movie or something' onChange={(e)=>{setNameSearch(e.target.value)}}/>
          <IconButton
              onClick={handleSearchMovie}
              width={70}
              colorScheme='blue'
              aria-label='Search database'
              icon={<SearchIcon />}
            />
        </InputGroup>

  {/* If you add the size prop to `InputGroup`, it'll pass it to all its children. */}
        <InputGroup size='sm'>
          <InputLeftAddon>
            Quantity
          </InputLeftAddon>
          <NumberInput 
            defaultValue={15} min={10} max={20} width={1100}
            onChange={(valueString)=>{setQuantity(valueString)}}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </InputGroup>
      </Stack>
      {listMovie.length>0 ? 
        (<div>
          {listMovie.map(movie => (
              <div key={movie.ordinal_number}>
                <Card maxW='sm'>
                  <CardBody>
                    <Image
                      src={movie.url_poster}
                      alt='Green double couch with wooden legs'
                      borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                      <Heading size='md'>{movie.infor_movie.title}</Heading>
                      <Text>
                        {movie.infor_movie.genres}
                      </Text>
                      <Text color='blue.600' fontSize='2xl'>
                        Release year: 
                        {movie.infor_movie.release_date}
                      </Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing='2'>
                      <Button variant='solid' colorScheme='blue'>
                        Recommend 
                      </Button>
                      <Button variant='ghost' colorScheme='blue'>
                        Information
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              {/* <div key={movie.id}>{movie.title}</div> */}
              </div>
            ))}
        </div>) 
        : 
        ( <div>Loading</div>
        //<CircularProgress isIndeterminate color='green.300' />
      )
      }
    </React.Fragment>
  )
}

export default Search