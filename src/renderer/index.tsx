import React from 'react'
import { createRoot } from 'react-dom/client'
import StoreProvider from './context/store-provider'
import App from './App'

createRoot(document.getElementById('app')!).render(
	<StoreProvider>
		<App />
	</StoreProvider>
)
