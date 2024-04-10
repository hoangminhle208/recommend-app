import React, { useState } from "react"
import Navbar from "./components/layout/Navbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'
import Home from "./components/Home"
import Similar from "./components/getSimilar/Similar"
import Search from "./components/searchEngine/Search"
import "bootstrap/dist/css/bootstrap.min.css"
import { ChakraProvider } from '@chakra-ui/react'

function App() {
	return (
		<ChakraProvider>
			<main className="container mt-5 mb-5">
				<Router>
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/get-similar-movie" element={<Similar/>} />
						<Route path="/search-movie" element={<Search />} />
					</Routes>
				</Router>
			</main>
		</ChakraProvider>
	)
}

export default App
