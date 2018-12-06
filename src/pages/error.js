import React, { Component } from 'react';
import { Redirect } from "react-router-dom"

const Error = () => {
	return(
		<>
    	<h1>404</h1>
			<Redirect to={"/"}/>
		</>
  )
}

export default Error
