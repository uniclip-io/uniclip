import React from 'react'
import { useStore } from './context/store-provider'
import Dashboard from './components/views/home/Dashboard'
import Login from './components/views/Login'

export default () => {
	const { store } = useStore()

	return store.user ? <Dashboard /> : <Login />
}
