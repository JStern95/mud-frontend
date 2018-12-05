import React from 'react';
import Flash from 'react-reveal/Flash';
import { NavLink } from 'react-router-dom';

const Home = () => {
	return(
		<div className="home">
			<Flash>
	    	<h1><center><h1 className="eight-bit-font white-font">Don't Kill Them</h1></center></h1>
			</Flash>
			<NavLink to={"/lobby"}><button className="start-btn eight-bit-font">Start</button></NavLink>
		</div>
  )
}

export default Home
