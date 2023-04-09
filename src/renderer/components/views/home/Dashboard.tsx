import React from 'react'
import ClipboardWidget from '../../widgets/ClipboardWidget'
import { useStore } from '../../../context/store-provider'
import { ClipboardLog } from '../../../../types/clipboard'

export default () => {
	const { store } = useStore()

	return (
		<div>
			<button onClick={() => window.electron.logout()}>logout</button>
			<h2>Clipboard</h2>
			{store.clipboard &&
				store.clipboard.map((log: ClipboardLog) => (
					<ClipboardWidget key={Math.random()} {...log} />
				))}
		</div>
	)
}
