import { Direction } from './message'

export default interface Clipboard {
	type: ClipboardType
	content: string | File
}

export type ClipboardType = 'text' | 'file' | 'folder' | 'diverse'

export type File = {
	contentId?: string
	name: string
	blob?: Blob
}

export type ClipboardLog = {
	clipboard: Clipboard
	direction: Direction
}
