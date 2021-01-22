import svelte from 'rollup-plugin-svelte';
import replace from '@rollup/plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import typescript from 'rollup-plugin-typescript2';
import tscompile from 'typescript';
import autoPreprocess from 'svelte-preprocess';
import rootImport from 'rollup-plugin-root-import';
import css from 'rollup-plugin-css-only';

const dev = Boolean(process.env.ROLLUP_WATCH);

const packs = ['user', 'operator'];

export default () => {
	const configuration = pack => {
		return {
			input: `src/${pack}/index.ts`,
			output: {
				name: "app",
				format: "iife",
				sourcemap: true,
				dir: `public/${pack}`,
			},
			preserveEntrySignatures: false,
			plugins: [
				rootImport({
					root: `${__dirname}/src`,
					useInput: 'entry',
					extensions: ['.ts', '.svelte'],
				}),
				css({ 
					output: 'bundle.css' 
				}),
				svelte({ 
					preprocess: autoPreprocess()
				}),
				resolve({
					browser: true,
					dedupe: ["svelte", "ts", "js", '.css'],
					extensions: [".ts", ".js", ".json", ".svelte", 'css'],
				}),
				commonjs(),
				replace({ "process.env.NODE_ENV": JSON.stringify(dev ? "development" : "production") }),
				typescript({ 
					sourceMap: dev,
					typescript: tscompile 
				}),
				livereload('public'),
			],
			watch: {
				clearScreen: false
			}
		}
	}
	
	return packs.map(configuration);

};
