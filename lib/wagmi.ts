import { http, cookieStorage, createConfig, createStorage } from 'wagmi'
import { coinbaseWallet } from 'wagmi/connectors'
import { DEFAULT_CHAIN } from './constants'

export function getConfig() {
	return createConfig({
		chains: [DEFAULT_CHAIN],
		connectors: [
			coinbaseWallet({
				appName: 'OnchainKit',
				preference: 'smartWalletOnly',
				version: '4',
			}),
		],
		storage: createStorage({
			storage: cookieStorage,
		}),
		ssr: true,
		transports: {
			[DEFAULT_CHAIN.id]: http(),
		},
	})
}

export const config = getConfig()

declare module 'wagmi' {
	interface Register {
		config: ReturnType<typeof getConfig>
	}
}
