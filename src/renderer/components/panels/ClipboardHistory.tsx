import React, { useEffect, useRef } from 'react'
import { ClipboardLog } from '../../../types/clipboard'
import { useStore } from '../../context/store-provider'
import ClipboardWidget from '../widgets/ClipboardWidget'
import './ClipboardHistory.css'

export default () => {
	const listRef = useRef(null)
	const { store } = useStore()

	useEffect(() => {
		// @ts-ignore
		listRef.current.scrollTop = listRef.current.scrollHeight
	}, [store.clipboard])

	return (
		<div className="clipboard-histroy-container">
			<h2>Clipboard</h2>
			<div ref={listRef} className="clipboard-histroy-list">
				{store.clipboard.map((log: ClipboardLog) => (
					<ClipboardWidget key={Math.random()} {...log} />
				))}
			</div>
		</div>
	)
}
