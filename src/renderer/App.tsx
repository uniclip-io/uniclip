import React from 'react'
import { useStore } from './context/store-provider'
import Devices from './components/views/home/Devices'
import Login from './components/views/Login'

export default () => {
	const { store } = useStore()

	return store.user ? <Devices /> : <Login />
}
