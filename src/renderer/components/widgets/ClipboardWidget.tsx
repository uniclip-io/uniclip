import React from 'react'
import { Record } from '../../../types/clipboard'
import { Icon, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { CopyAllOutlined, DeleteRounded } from '@mui/icons-material'

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

	const deleteRecord = () => {
		console.log(record.id) // TODO
	}

	return (
		<Stack
			display="flex"
			margin={['10px', '20px']}
			gap="20px"
			alignItems="center"
			justifyContent="space-between"
			flexDirection="row"
		>
			<Icon>{icons[record.type]}</Icon>
			<div style={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
				<Typography noWrap>{typeof content === 'string' ? content : content.name}</Typography>
			</div>
			<Tooltip title="Copy">
				<IconButton onClick={copyRecord}>
					<CopyAllOutlined />
				</IconButton>
			</Tooltip>
			<Tooltip title="Delete">
				<IconButton onClick={deleteRecord}>
					<DeleteRounded />
				</IconButton>
			</Tooltip>
		</Stack>
	)
}
