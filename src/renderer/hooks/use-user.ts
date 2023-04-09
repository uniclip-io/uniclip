import { useEffect, useState } from 'react'
import { useStore } from '../context/store-provider'

export default () => {
	const [isLoggedIn, setLoggedIn] = useState(false)
	const { store } = useStore()

	useEffect(() => {
		setLoggedIn(true)
		console.log(store.user, isLoggedIn)
	}, [store.user])

	const login = () => {
		window.electron.login()
	}

	const logout = () => {
		window.electron.logout()
	}

	return { user: store.user, isLoggedIn, login, logout }
}
