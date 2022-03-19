import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Result from './Result'
import Redirect from './Redirect';
import io from 'socket.io-client';

const Port = process.env.PORT || 3001;
const socket = io.connect("192.168.1.6:3001");

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" exact element={<Result roomId={localStorage.getItem('roomId')} socket={socket} io={io} />} />
				<Route path="requesting-access/:roomId" element={<Redirect />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;