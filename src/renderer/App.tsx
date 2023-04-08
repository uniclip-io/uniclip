import React from 'react'
import { useStore } from './context/store-provider'
import Devices from './views/home/Devices'
import Login from './views/Login'

export default () => {
	const { store } = useStore()

	return store.user ? <Devices /> : <Login />
}
