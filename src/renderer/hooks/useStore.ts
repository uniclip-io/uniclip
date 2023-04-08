import { useEffect, useState } from 'react'
import { Schema } from '../../main/handler/store-handler'

export const useStore = <T>(key: keyof typeof Schema, initial?: T): [T | null, (value: T) => Promise<void>] => {
	const [getter, setValue] = useState<T | null>(null)

	useEffect(() => {
		window.electron.onStoreChanged((k, value) => k === key && setValue(value))

		if (initial) {
			setter(initial)
		} else {
			fetch()
		}
	}, [key])

	const fetch = async () => {
		setValue(await window.electron.getStoreData<T>(key))
	}

	const setter = async (value: T) => {
		await window.electron.setStoreData(key, value)
	}

	return [getter, setter]
}
