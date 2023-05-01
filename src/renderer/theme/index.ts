import { createTheme } from '@mui/material'

export default createTheme({
	components: {
		MuiTooltip: {
			defaultProps: {
				disableInteractive: true,
				arrow: true,
				placement: 'top'
			},
			styleOverrides: {
				tooltip: {
					fontSize: '13px',
					fontWeight: 400,
					backgroundColor: 'black'
				},
				arrow: {
					color: 'black'
				}
			}
		},
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true
			}
		}
	}
})
