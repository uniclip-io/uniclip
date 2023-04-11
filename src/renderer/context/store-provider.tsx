import React, { useEffect, useState, useMemo } from 'react'

type StoreProviderOptions = {
	children?: React.ReactNode
	initial: Record<string, any>
}
  
type Store = {
	store: Record<string, any>
	isLoading: boolean
	setValue: (key: string, value: any) => Promise<void>
}

const StoreContext = React.createContext<Store>(null as any)

export const useStore = () => React.useContext(StoreContext)

export default ({ children, initial }: StoreProviderOptions) => {
	const [store, setStore] = useState(initial)
	const [isLoading, setLoading] = useState(true)

	useEffect(() => {
		loadStore()
		window.electron.onStoreChanged(updateValue)
	}, [])

	const loadStore = async () => {
		for (const key in initial) {
			const defaultValue = initial[key]
			const value = await window.electron.getStoreData(key)
			initial[key] = (value as never) ?? defaultValue
		}
		setStore(initial)
		setLoading(false)
	}

	const setValue = async (key: string, value: any): Promise<void> => {
		await window.electron.setStoreData(key, value)
		updateValue(key, value)
	}

	const updateValue = (key: string, value: any) => {
		setStore({ ...store, [key]: value })
	}

	const value = useMemo(() => ({ store, isLoading, setValue }), [store, isLoading])

	return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
