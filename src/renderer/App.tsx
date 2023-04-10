import React, { useEffect } from 'react'
import { useStore } from './context/store-provider'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Dashboard from './components/views/dashboard/Dashboard'
import Login from './components/views/Login'
import Splash from './components/views/Splash'

export default () => {
	const { store, isLoading } = useStore()
	const navigation = useNavigate()

	useEffect(() => {
		if (isLoading) {
			navigation('/')
		} else if (!store.user) {
			navigation('/login')
		} else {
			navigation('/dashboard')
		}
	}, [isLoading, store])

	return (
		<Routes>
			<Route path="/" element={<Splash />} />
			<Route path="/login" element={<Login />} />
			<Route path="/dashboard/*" element={<Dashboard />} />
		</Routes>
	)
}
