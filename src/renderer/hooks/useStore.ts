import { useEffect, useState } from 'react'
import { Schema } from '../../main/handler/store-handler'

export const useStore = <T>(key: keyof typeof Schema, initial?: T): [T | null, (value: T) => Promise<void>] => {
	const [getter, setValue] = useState<T | null>(null)

	useEffect(() => {
		window.electron.onStoreChanged((k, value) => k === key && setValue(value))
	}, [])

	useEffect(() => {
		init()
	}, [key])

	const init = async () => {
		const value = await window.electron.getStoreData<T>(key)

		if (value) {
			setValue(value)
		} else if (initial) {
			setter(initial)
		}
	}

	const setter = async (value: T) => {
		await window.electron.setStoreData(key, value)
	}

	return [getter, setter]
}
