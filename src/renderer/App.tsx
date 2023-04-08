import React from 'react'
import { useStore } from './hooks/useStore'

export default () => {
	const [data, setData] = useStore('example', { mabite: true })
	const [_data] = useStore('example')
	const [dataToo, setDataToo] = useStore('example_too')

	return (
		<div>
			<h3>Hello From Electron App</h3>
			<button onClick={() => setData({ mabite: !data?.mabite })}>login</button>
			<p>{JSON.stringify(data, null, 2)}</p>
			<p>{JSON.stringify(_data, null, 2)}</p>
			<button onClick={() => setDataToo(Math.random().toString())}>login</button>
			<p>{JSON.stringify(dataToo, null, 2)}</p>
		</div>
	)
}
