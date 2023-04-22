import React from 'react'
import { Record } from '../../../types/clipboard'
import './ClipboardWidget.css'

const icons = {
	text: 'short_text',
	file: 'insert_drive_file',
	folder: 'folder',
	diverse: 'file_copy'
}

export default (record: Record) => {
	const { content } = record

	const copyRecord = () => {
		window.electron.copy(record.id)
	}

	return (
		<div className="clipboard-container">
			<div className="clipboard-icon clipboard-icon-type">
				<span className="material-icons-outlined">{icons[record.type]}</span>
			</div>
			<div className="clipboard-content-container">
				<div className="clipboard-content">
					{typeof content === 'string' ? content : content.name}
				</div>
			</div>
			<div className="clipboard-icon clipboard-icon-copy" onClick={copyRecord}>
				<span className="material-icons-outlined">copy_all</span>
			</div>
		</div>
	)
}
