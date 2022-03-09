import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Result from './Result'
import Redirect from './Redirect';

function App() {
	useEffect(() => {
		console.log(localStorage.getItem('roomId'));
	}, [])

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" exact element={<Result roomId={localStorage.getItem('roomId')} />} />
				<Route path="requesting-access/:roomId" element={<Redirect />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App;