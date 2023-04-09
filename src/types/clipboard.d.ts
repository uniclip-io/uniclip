import { clipboard } from 'electron'
import { Direction } from './message'

export default interface Clipboard {
	type: ClipboardType
	content: string | File
}

export type ClipboardType = 'text' | 'file' | 'folder'

export type File = {
	name: string
	blob: Blob
}

export type ClipboardLog = {
	clipboard: Clipboard
	direction: Direction
}
