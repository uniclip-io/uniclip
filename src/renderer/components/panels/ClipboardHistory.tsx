import React, { useEffect, useRef } from 'react'
import { RecordLog } from '../../../types/clipboard'
import { useStore } from '../../context/store-provider'
import ClipboardWidget from '../widgets/ClipboardWidget'
import './ClipboardHistory.css'

export default () => {
	const bottom = useRef<HTMLDivElement>(null)
	const { store } = useStore()

	useEffect(() => {
		bottom.current?.scrollIntoView({ behavior: 'smooth' })
	}, [store.clipboard])

	return (
		<div className="clipboard-histroy-container">
			<h2>Clipboard</h2>
			<div className="clipboard-histroy-list">
				{store.clipboard.map((log: RecordLog) => (
					<ClipboardWidget key={Math.random()} {...log} />
				))}
				<div ref={bottom} />
			</div>
		</div>
	)
}
