import React, { useState } from "react";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Similar from "./components/getSimilar/Similar";
import Search from "./components/searchEngine/Search";
import InfoMovie from "./components/inforMovie/InfoMovie";
import RecForUser from "./components/recsForUser/RecForUser";
import "bootstrap/dist/css/bootstrap.min.css";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <main className="container mt-5 mb-5">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/get-similar-movie" element={<Similar />} />
            <Route path="/search-movie" element={<Search />} />
            <Route path="/info-movie/:id" element={<InfoMovie />} />
            <Route path="/get-recs-for-user" element={<RecForUser />} />
          </Routes>
        </Router>
      </main>
    </ChakraProvider>
  );
}

export default App;
