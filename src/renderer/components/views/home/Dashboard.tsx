import React from 'react'
import ClipboardHistory from '../../widgets/ClipboardHistory'

export default () => {
	return (
		<div>
			<button onClick={() => window.electron.logout()}>logout</button>
			<ClipboardHistory />
		</div>
	)
}
