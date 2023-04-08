import React from 'react'
import { useStore } from './hooks/useStore'

export default () => {
	// const [data, setData] = useStore('example', { mabite: true })
	// const [_data] = useStore('example')
	// const [dataToo, setDataToo] = useStore('example_too')

	const [user] = useStore('user', null)

	return (
		<div>
			<h3>Hello From Electron App</h3>
			{/* <button onClick={() => setData({ mabite: !data?.mabite })}>example</button>
			<p>{JSON.stringify(data, null, 2)}</p>
			<p>{JSON.stringify(_data, null, 2)}</p>
			<button onClick={() => setDataToo(Math.random().toString())}>example_too</button>
			<p>{JSON.stringify(dataToo, null, 2)}</p> */}

			<button onClick={() => window.electron.login()}>Login</button>
			<button onClick={() => window.electron.logout()}>logout</button>
			<p>{JSON.stringify(user, null, 2)}</p>
		</div>
	)
}
