import React from 'react'
import { ClipboardLog } from '../../../types/clipboard'
import './ClipboardWidget.css'

const icons = {
	inbound: 'arrow_circle_down',
	outbound: 'arrow_circle_up',
	text: 'short_text',
	file: 'insert_drive_file',
	folder: 'folder'
}

export default (log: ClipboardLog) => {
	const { clipboard } = log
	const { content } = clipboard
	const text = typeof content === 'string' ? content : content.name

	return (
		<div className="clipboard-container">
			<div className="clipboard-icon">
				<span className="material-icons-outlined">{icons[clipboard.type]}</span>
			</div>
			<h4>{text}</h4>
			<span className="material-icons-outlined">{icons[log.direction]}</span>
		</div>
	)
}
