import React, { useEffect, useRef, useState } from 'react'
import { ClipboardType, Record } from '../../../types/clipboard'
import { useStore } from '../../context/store-provider'
import ClipboardWidget from '../widgets/ClipboardWidget'
import './ClipboardHistory.css'

const allFilters: ClipboardType[] = ['text', 'file', 'folder', 'diverse']

const icons = {
	text: 'short_text',
	file: 'insert_drive_file',
	folder: 'folder',
	diverse: 'file_copy'
}

export default () => {
	const bottom = useRef<HTMLDivElement>(null)
	const [filters, setFilters] = useState<ClipboardType[]>(allFilters)
	const { store } = useStore()

	useEffect(() => {
		bottom.current?.scrollIntoView({ behavior: 'smooth' })
	}, [store.clipboard])

	return (
		<div className="clipboard-histroy-container">
			<h2>Clipboard</h2>
			<div className="clipboard-histroy-filters">
				{allFilters.map(type => (
					<div
						className="clipboard-histroy-filter"
						style={{ opacity: filters.includes(type) ? 1 : 0.25 }}
						onClick={() =>
							filters.includes(type)
								? setFilters([...filters.filter(f => f != type)])
								: setFilters([...filters, type])
						}
					>
						<span className="material-icons-outlined">{icons[type]}</span>
					</div>
				))}
			</div>
			<div className="clipboard-histroy-list">
				{store.clipboard
					.filter((r: Record) => filters.includes(r.type))
					.map((record: Record) => (
						<ClipboardWidget key={Math.random()} {...record} />
					))}
				<div ref={bottom} />
			</div>
		</div>
	)
}
