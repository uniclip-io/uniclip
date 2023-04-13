import React from 'react'
// @ts-ignore
import logo from '../../../../assets/logo.png'
// @ts-ignore
import google from '../../../../assets/icons/google.png'
// @ts-ignore
import microsoft from '../../../../assets/icons/microsoft.png'
import './Login.css'

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
			<div>
				<button className="login-button" onClick={() => window.electron.login('google')}>
					<img className="login-button-icon" src={google} alt="" />
					Google
				</button>
				<button className="login-button" onClick={() => window.electron.login('microsoft')}>
					<img className="login-button-icon" src={microsoft} alt="" />
					Microsoft
				</button>
			</div>
		</div>
	)
}
