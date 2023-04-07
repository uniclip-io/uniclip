import { useEffect, useState } from 'react'

export const useStore = <T>(key: string): [T | null, (value: T) => Promise<void>] => {
	// @ts-ignore
	const [getter, setValue] = useState<T>(null)

	useEffect(() => {
		fetch()
	}, [key])

	const fetch = async () => {
		const value = await window.electron.getStoreData<T>(key)
		setValue(value)
	}

	const setter = async (value: T) => {
		await window.electron.setStoreData(key, value)
		setValue(value)
	}

	return [getter, setter]
}
