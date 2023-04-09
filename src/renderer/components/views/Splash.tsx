import React from 'react'
// @ts-ignore
import logo from '../../../../assets/logo.png'
import './Splash.css'

export default () => {
	return (
		<div className="loading-container">
			<img className="loading-logo" src={logo} alt="" />
			{/* <h1>Uniclip</h1> */}
		</div>
	)
}
