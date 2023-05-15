import React from 'react'
import { Record } from '../../../types/clipboard'
import { Icon, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { CopyAllOutlined, DeleteRounded } from '@mui/icons-material'
import { deleteRecord } from '../../../apis/clipboard-api'

const icons = {
	text: 'short_text',
	file: 'insert_drive_file',
	folder: 'folder',
	diverse: 'file_copy'
}

export default (record: Record) => {
	const { content } = record

	const copyData = () => {
		window.electron.copy(record.id)
	}

	const deleteData = async () => {
		await deleteRecord(record.id)
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
				<IconButton onClick={copyData}>
					<CopyAllOutlined />
				</IconButton>
			</Tooltip>
			<Tooltip title="Delete">
				<IconButton onClick={deleteData}>
					<DeleteRounded />
				</IconButton>
			</Tooltip>
		</Stack>
	)
}
