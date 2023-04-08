import React, { useState } from 'react'

export default () => {
	const [view, setView] = useState<'devices' | 'settings'>('devices')

	return (
		<div>
			<h2>Devices</h2>
			<button onClick={() => window.electron.logout()}>logout</button>
		</div>
	)
}

const Header = () => {
	return <div className=""></div>
}
