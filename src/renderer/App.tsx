import React from 'react'

export default () => {
	return (
		<div>
			<h3>Hello From Electron App</h3>
			<h4>Electron: {process.versions.electron}</h4>
			<h4>Chrome: {process.versions.chrome}</h4>
			<h4>Node: {process.versions.node}</h4>
		</div>
	)
}
