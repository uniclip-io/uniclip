import React from 'react'
import { ClipboardLog } from '../../../types/clipboard'
import { useStore } from '../../context/store-provider'
import ClipboardWidget from './ClipboardWidget'
import './ClipboardHistory.css'

export default () => {
	const { store } = useStore()

	return (
		<div>
			<h2>Clipboard</h2>
			{store.clipboard.map((log: ClipboardLog) => (
				<ClipboardWidget key={Math.random()} {...log} />
			))}
		</div>
	)
}
