import { Direction } from './message'

export default interface Clipboard {
	type: ClipboardType
	content: string | File
}

export type FileType = 'file' | 'folder' | 'diverse'

export type ClipboardType = FileType | 'text'

export type File = {
	contentId?: string
	name: string
	blob?: Blob
}

export type Record = {
	id: string
	date: string
	type: ClipboardType
	content: string | File
}
