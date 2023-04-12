import React from 'react'
import { useStore } from '../../../context/store-provider'

export default () => {
	const { store } = useStore()

	return (
		<div>
			<h2>Settings</h2>
			<button onClick={() => window.electron.logout()}>logout</button>
			<div>{JSON.stringify(store.user)}</div>
		</div>
	)
}
