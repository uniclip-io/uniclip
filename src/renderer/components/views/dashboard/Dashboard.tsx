import React from 'react'
import { Routes, Route, Link, useRoutes } from 'react-router-dom'
import Clipboard from './Clipboard'
import Devices from './Devices'
import Settings from './Settings'

export default () => {
	return (
		<div>
			<div>
				<Link to="/dashboard/">clipboard</Link>
				<Link to="/dashboard/devices">devices</Link>
				<Link to="/dashboard/settings">settings</Link>
			</div>
			<Routes>
				<Route path="/" element={<Clipboard />} />
				<Route path="/devices" element={<Devices />} />
				<Route path="/settings" element={<Settings />} />
			</Routes>
		</div>
	)
}
