import React from 'react'
import { useStore } from './context/store-provider'
import Dashboard from './components/views/home/Dashboard'
import Login from './components/views/Login'

export default () => {
	const { store, isLoading } = useStore()

	if (isLoading) {
		return <h1>loading...</h1>
	}
	return store?.user ? <Dashboard /> : <Login />
}
