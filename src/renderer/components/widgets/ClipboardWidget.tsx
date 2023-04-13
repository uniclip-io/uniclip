import React from 'react'
import { Record } from '../../../types/clipboard'
import './ClipboardWidget.css'

const icons = {
	inbound: 'arrow_circle_down',
	outbound: 'arrow_circle_up',
	text: 'short_text',
	file: 'insert_drive_file',
	folder: 'folder',
	diverse: 'file_copy'
}

export default (record: Record) => {
	const { content } = record
	const text = typeof content === 'string' ? content : content.name

	return (
		<div className="clipboard-container">
			<div className="clipboard-icon">
				<span className="material-icons-outlined">{icons[record.type]}</span>
			</div>
			<h4>{text}</h4>
		</div>
	)
}
