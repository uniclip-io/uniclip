import React, { useEffect, useState, useMemo } from 'react'

const initial = {
	user: null,
	clipboard: []
}

type Key = keyof typeof initial

type Store = {
	store: Record<Key, any>
	isLoading: boolean
	setValue: (key: Key, value: any) => Promise<void>
}

const StoreContext = React.createContext<Store>(null as any)

export const useStore = () => React.useContext(StoreContext)

export default ({ children }: any) => {
	const [store, setStore] = useState(initial)
	const [isLoading, setLoading] = useState(true)

	useEffect(() => {
		loadStore()
		window.electron.onStoreChanged(updateValue)
	}, [])

	const loadStore = async () => {
		for (const key in initial) {
			const defaultValue = initial[key as Key]
			const value = await window.electron.getStoreData(key)
			initial[key as Key] = (value as never) ?? defaultValue
		}
		setStore(initial)
		setLoading(false)
	}

	const setValue = async (key: Key, value: any): Promise<void> => {
		await window.electron.setStoreData(key, value)
		updateValue(key, value)
	}

	const updateValue = (key: Key, value: any) => {
		setStore({ ...store, [key]: value })
	}

	const value = useMemo(() => ({ store, isLoading, setValue }), [store, isLoading])

	return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
