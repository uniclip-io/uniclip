import type { Configuration } from 'webpack'

import { rules } from './webpack.rules'

export const mainConfig: Configuration = {
	entry: './src/main/index.ts',
	module: {
		rules
	},
	resolve: {
		extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json']
	},
	externals: {
		debug: 'debug',
		bufferutil: 'bufferutil',
		'utf-8-validate': 'utf-8-validate'
	}
}
