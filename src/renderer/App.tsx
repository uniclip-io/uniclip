import React, { useEffect } from 'react'
import { useStore } from './context/store-provider'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './components/views/auth/Login'
import Splash from './components/views/Splash'
import Legal from './components/views/legal/Legal'
import Dashboard from './components/views/dashboard/Dashboard'

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
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="/legal/*" element={<Legal />} />
		</Routes>
	)
}
