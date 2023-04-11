import React, { useEffect, useState, useMemo, useContext, createContext } from 'react'
import { Key } from '../../store'

type StoreProviderOptions = {
	children?: React.ReactNode
	initial: Record<Key, any>
}

type Store = {
	store: Record<Key, any>
	isLoading: boolean
	setValue: (key: Key, value: any) => Promise<void>
}

const StoreContext = createContext<Store>(null as any)

export const useStore = () => useContext(StoreContext)

export default ({ children, initial }: StoreProviderOptions) => {
	const [store, setStore] = useState(initial)
	const [isLoading, setLoading] = useState(true)

	useEffect(() => {
		loadStore()
		window.electron.onStoreChanged(updateValue)
	}, [])

	const loadStore = async () => {
		for (const key in initial) {
			const value = await window.electron.getStoreData(key)
			initial[key] = value as any
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
		console.log(store)
	}

	const value = useMemo(() => ({ store, isLoading, setValue }), [store, isLoading])

	return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
