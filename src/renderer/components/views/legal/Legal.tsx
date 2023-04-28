import React from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import TermsAndConditions from './TermsAndConditions'
import PrivacyPolicy from './PrivacyPolicy'
import './Legal.css'

export default () => {
	const navigation = useNavigate()

	return (
		<div className="legal-container">
			<div className="legal-header">
				<Link to="/legal/terms-and-conditions">
					<div className="legal-header-title">Terms & Conditions</div>
				</Link>
				<Link to="/legal/privacy-policy">
					<div className="legal-header-title">Privacy Policy</div>
				</Link>
			</div>
			<Routes>
				<Route path="/terms-and-conditions" element={<TermsAndConditions />} />
				<Route path="/privacy-policy" element={<PrivacyPolicy />} />
			</Routes>
			<div className="back-button" onClick={() => navigation('/login')}>
				Done
			</div>
		</div>
	)
}
