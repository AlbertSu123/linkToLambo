module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: ['class', 'class'],
	plugins: [require('tailwindcss-safe-area'), require('tailwindcss-animate')],
	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			colors: {
				'custom-primary': '#70C145',
				'custom-accent': '#A9E689',
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
			boxShadow: {
				custom:
					'0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
			},
		},
	},
}
