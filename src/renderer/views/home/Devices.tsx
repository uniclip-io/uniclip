import React from 'react'

export default () => {
	return (
		<div>
			<h2>Devices</h2>
			<button onClick={() => window.electron.logout()}>logout</button>
		</div>
	)
}
