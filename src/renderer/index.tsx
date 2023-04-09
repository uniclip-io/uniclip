import React from 'react'
import { createRoot } from 'react-dom/client'
import StoreProvider from './context/store-provider'
import App from './App'
import { HashRouter } from 'react-router-dom'

import 'material-icons/iconfont/material-icons.css'
import 'typeface-roboto/index.css'

createRoot(document.getElementById('app')!).render(
	<StoreProvider>
		<HashRouter>
			<App />
		</HashRouter>
	</StoreProvider>
)
