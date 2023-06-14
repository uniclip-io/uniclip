import React from 'react'
import ClipboardHistory from '../../panels/ClipboardHistory'
import { useStore } from '../../../context/store-provider'

export default () => {
	const { store } = useStore()

	return (
		<div>
			<div>{store.user?.name}</div>
			<div>{store.user?.id}</div>
			<button onClick={() => window.electron.logout()}>logout</button>
			<ClipboardHistory />
		</div>
	)
}
