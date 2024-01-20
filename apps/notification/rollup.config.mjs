import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'

export default [
	{
		input: 'src/index.ts',
		output: [
			{
				file: 'dist/index.js',
				format: 'cjs',
				sourcemap: true,
				name: 'notification'
			}
		],
		plugins: [typescript(), commonjs()]
	}
]
