import React from 'react'
import { createRoot } from 'react-dom/client'
import StoreProvider from './context/store-provider'
import { HashRouter } from 'react-router-dom'
import App from './App'

import 'material-icons/iconfont/material-icons.css'
import 'typeface-roboto/index.css'

createRoot(document.getElementById('app')!).render(
	<StoreProvider initial={{ user: null, clipboard: [] }}>
		<HashRouter>
			<App />
		</HashRouter>
	</StoreProvider>
)
