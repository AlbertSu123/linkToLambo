/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
	dest: 'public',
	register: true,
	skipWaiting: true,
	disable: process.env.NODE_ENV === 'development',
	disableDevLogs: true
})

module.exports = withPWA({
	reactStrictMode: true,
	images: {
		domains: ['images.unsplash.com', 'source.unsplash.com'],
	},
})
