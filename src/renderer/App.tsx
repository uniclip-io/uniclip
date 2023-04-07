import React from 'react'
import { useStore } from './hooks/useStore'

export default () => {
	const [data, setData] = useStore<{ mabite: boolean }>('example')

	return (
		<div>
			<h3>Hello From Electron App</h3>
			<button onClick={() => setData({ mabite: !data?.mabite })}>login</button>
			<p>{JSON.stringify(data, null, 2)}</p>
		</div>
	)
}
