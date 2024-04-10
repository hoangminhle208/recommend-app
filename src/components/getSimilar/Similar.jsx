import React, { useEffect, useState } from "react";

const Similar = () => {
  const listIdMovieBanner = [297762, 238]; //tim id movie co belongto khac null bo vo

  var listMovieBanner = [];

  useEffect(() => {
    // fetchListMovie()
    fetchListMovie();
  }, []);

  const fetchOneMovie = async (id) => {
    let name,
      url_poster = "";
    let URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}&append_to_response=videos`;
    await fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        name = data.original_title != null ? data.original_title : "";
        url_poster = import.meta.env.VITE_URL_POSTER_TMDB + data.poster_path;
      })
      .catch((error) => console.error(error));
    let object = {
      title: name,
      url_poster: url_poster,
    };
    //console.log(object)
    return object;
  };

  const fetchListMovie = async () => {
    var randomIdListMovie = randomArray(listIdMovieBanner);
    for (let i = 0; i < randomIdListMovie.length; i++) {
      let movie = await fetchOneMovie(randomIdListMovie[i]);
      console.log(movie);
      listMovieBanner.push(movie);
    }
    //console.log(listMovieBanner)
  };

  const randomArray = (arrayInput) => {
    //6 id movie k trung nhau
    let randomIdListMovie = [];
    while (randomIdListMovie.length < 6 && arrayInput.length > 0) {
      var randomIndex = Math.floor(Math.random() * arrayInput.length);
      var randomElement = arrayInput[randomIndex];
      // Kiểm tra xem phần tử đã tồn tại trong mảng chưa và không trùng nhau
      if (!randomIdListMovie.includes(randomElement)) {
        randomIdListMovie.push(randomElement);
      }
      // Xóa phần tử đã chọn khỏi mảng numbers
      arrayInput.splice(randomIndex, 1);
    }
    return randomIdListMovie;
  };

  const buildInforMovie = (arrayInput) => {
    // 1 array 6 id movie => return object chua title, url_poster, imdb
  };

  return (
    <React.Fragment>
      <div>hello from similar</div>
    </React.Fragment>
  );
};

export default Similar;
