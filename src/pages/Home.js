import React from 'react';
import Flash from 'react-reveal/Flash';
import { NavLink } from 'react-router-dom';

const Home = () => {
	return(
		<div className="home">
			<Flash>
	    	<h1 className="eight-bit-font white-font home-header">Don't Kill Them</h1>
			</Flash>
			<NavLink to={"/lobby"}>
				<svg width="100" height="100" className="start-btn">
					<text fill="black" x="16%" y="57%" className="eight-bit-font start-btn-text">Start</text>
				</svg>
			</NavLink>
		</div>
  )
}

export default Home
