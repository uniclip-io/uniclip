import React from 'react'
import './Login.css'
// @ts-ignore
import logo from '../../../../assets/logo.png'

export default () => {
	return (
		<div className="login-container">
			<img className="login-logo" src={logo} alt="" />
			<div>
				<div className="login-title">
					<span className="material-icons-round">login</span>
					<h2>Login</h2>
				</div>
				<p className="login-subtitle">Login and connect devices together.</p>
			</div>
			<button className="login-button" onClick={() => window.electron.login()}>
				Login with Google
			</button>
		</div>
	)
}
