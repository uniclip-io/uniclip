import React from 'react'
import { useStore } from './context/store-provider'
import Dashboard from './components/views/home/Dashboard'
import Login from './components/views/Login'
import Loading from './components/views/Loading'
import Header from './components/widgets/Header'
import './App.css'

export default () => {
	const { store, isLoading } = useStore()

	if (isLoading) {
		return <Loading />
	}
	return (
		<div className="container">
			<Header />
			{store?.user ? <Dashboard /> : <Login />}
		</div>
	)
}
