import React, { useEffect, useState } from 'react'

const initial = {
	user: null
}

type Key = keyof typeof initial
type Store = {
	store: Record<Key, any>
	setValue: (key: Key, value: any) => Promise<void>
}

const StoreContext = React.createContext<Store>(null as any)

export const useStore = () => React.useContext(StoreContext)

export default ({ children }: any) => {
	const [store, setStore] = useState(initial)

	useEffect(() => {
		window.electron.onStoreChanged(updateValue)
		init()
	}, [])

	const init = async () => {
		for (const key in initial) {
			updateValue(key, await window.electron.getStoreData(key))
		}
	}

	const setValue = async (key: Key, value: any): Promise<void> => {
		updateValue(key, await window.electron.setStoreData(key, value))
	}

	const updateValue = (key: string, value: any) => {
		setStore({ ...store, ...{ [key]: value } })
	}

	return <StoreContext.Provider value={{ store, setValue }}>{children}</StoreContext.Provider>
}
