import { baseSepolia } from 'viem/chains'
import { createPublicClient, defineChain, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

export const DEFAULT_CHAIN = baseSepolia
export const APP_URL = 'https://link-to-lambo.vercel.app'

export const account = privateKeyToAccount(
	'0x706a53a82bb959329274f028b19239ccc00cb040f13df41c0ce530560aae1996',
)

export const getPublicClient = (chainId: number) => {
	return createPublicClient({ chain: getChain(chainId), transport: http() })
}

export const getChain = (chainId: number) => {
	return supportedNetworks.find((chain) => chain.id === chainId)
}

export const gnosis = defineChain({
	id: 100,
	name: 'Gnosis',
	rpcUrls: {
		default: { http: ['https://rpc.gnosischain.com'] },
		public: { http: ['https://rpc.gnosischain.com'] },
	},
	nativeCurrency: {
		decimals: 18,
		name: 'Gnosis',
		symbol: 'XDAI',
	},
})

const supportedNetworks = [baseSepolia, gnosis]

// Gnosis - Mainnet
// Rootstock - Mainnet
// Base - Sepolia Testnet
// Neon EVM - Testnet
// Zircuit - Testnet
// Skale - Calypso Testnet
// Unichain - Sepolia Testnet
// Story - Testnet
// Morph - Holesky Testnet
// Fhenix - Testnet
// Polygon zkEVM - Mainnet
export const evmNetworks = supportedNetworks.map((chain) => ({
	blockExplorerUrls: [chain.blockExplorers?.default?.url!],
	chainId: chain.id,
	chainName: chain.name,
	iconUrls: ['https://app.dynamic.xyz/assets/networks/eth.svg'],
	name: chain.name,
	nativeCurrency: chain.nativeCurrency,
	networkId: chain.id,
	rpcUrls: [chain.rpcUrls.default.http[0]],
}))
