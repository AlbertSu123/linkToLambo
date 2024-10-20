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
	return supportedNetworks.find((chain) => chain.id == chainId)
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

export const skale = defineChain({
	id: 974399131,
	name: 'Skale Calypso Hub Testnet',
	rpcUrls: {
		default: {
			http: ['https://testnet.skalenodes.com/v1/giant-half-dual-testnet'],
		},
		public: {
			http: ['https://testnet.skalenodes.com/v1/giant-half-dual-testnet'],
		},
	},
	blockExplorers: {
		default: {
			name: 'Skale Explorer',
			url: 'https://giant-half-dual-testnet.explorer.testnet.skalenodes.com',
		},
	},
	nativeCurrency: {
		decimals: 18,
		name: 'sFuel',
		symbol: 'SFUEL',
	},
})

export const unichain = defineChain({
	id: 1301,
	name: 'Unichain Sepolia',
	rpcUrls: {
		default: { http: ['https://sepolia.unichain.org'] },
		public: { http: ['https://sepolia.unichain.org'] },
	},
	blockExplorers: {
		default: {
			name: 'Uniscan',
			url: 'https://sepolia.uniscan.xyz/',
		},
	},
	nativeCurrency: {
		decimals: 18,
		name: 'Ether',
		symbol: 'ETH',
	},
})
export const polygonZkEvm = defineChain({
	id: 1101,
	name: 'Polygon zkEVM',
	rpcUrls: {
		default: { http: ['https://zkevm-rpc.com'] },
		public: { http: ['https://zkevm-rpc.com'] },
	},
	blockExplorers: {
		default: {
			name: 'PolygonScan',
			url: 'https://cardona-zkevm.polygonscan.com/',
		},
	},
	nativeCurrency: {
		decimals: 18,
		name: 'Polygon',
		symbol: 'POL',
	},
})
export const storyPublic = defineChain({
	id: 1513,
	name: 'Story Public',
	rpcUrls: {
		default: { http: ['https://testnet.storyrpc.io/'] },
		public: { http: ['https://testnet.storyrpc.io/'] },
	},
	blockExplorers: {
		default: {
			name: 'StoryScan',
			url: 'https://testnet.storyscan.xyz/',
		},
	},
	nativeCurrency: {
		decimals: 18,
		name: 'Story',
		symbol: 'IP',
	},
})

export const airDAO = defineChain({
	id: 22040,
	name: 'AirDAO',
	rpcUrls: {
		default: { http: ['https://testnet-rpc.airdao.io/'] },
		public: { http: ['https://testnet-rpc.airdao.io/'] },
	},
	blockExplorers: {
		default: {
			name: 'AirDAO Explorer',
			url: 'https://testnet.airdao.io/explorer/',
		},
	},
	gasPrice: {
		multiplier: 1.2,
	},
	nativeCurrency: {
		decimals: 18,
		name: 'Ambrosus',
		symbol: 'AMB',
	},
})

export const flow = defineChain({
	id: 545,
	name: 'Flow',
	rpcUrls: {
		default: { http: ['https://testnet.evm.nodes.onflow.org/'] },
		public: { http: ['https://testnet.evm.nodes.onflow.org/'] },
	},
	blockExplorers: {
		default: {
			name: 'FlowDiver',
			url: 'https://testnet.flowdiver.io/',
		},
	},
	nativeCurrency: {
		decimals: 18,
		name: 'Flow',
		symbol: 'FLOW',
	},
})

export const hederaTestnet = defineChain({
	id: 296,
	name: 'Hedera EVM Testnet',
	rpcUrls: {
		default: { http: ['https://testnet.hashio.io/api'] },
		public: { http: ['https://testnet.hashio.io/api'] },
	},
	blockExplorers: {
		default: {
			name: 'HashScan',
			url: 'https://hashscan.io/testnet/',
		},
	},
	nativeCurrency: {
		decimals: 18,
		name: 'Hedera',
		symbol: 'HBAR',
	},
})

export const zircuitTestnet = defineChain({
	id: 48899,
	name: 'Zircuit Testnet',
	rpcUrls: {
		default: { http: ['https://zircuit1-testnet.p2pify.com'] },
		public: { http: ['https://zircuit1-testnet.p2pify.com'] },
	},
	blockExplorers: {
		default: {
			name: 'Zircuit Explorer',
			url: 'https://explorer.testnet.zircuit.com/',
		},
	},
	nativeCurrency: {
		decimals: 18,
		name: 'Ethereum',
		symbol: 'ETH',
	},
})
export const morphHoleskyTestnet = defineChain({
	id: 2810,
	name: 'Morph Holesky Testnet',
	rpcUrls: {
		default: { http: ['https://rpc-quicknode-holesky.morphl2.io/'] },
		public: { http: ['https://rpc-quicknode-holesky.morphl2.io/'] },
	},
	blockExplorers: {
		default: {
			name: 'Morph Explorer',
			url: 'https://explorer-holesky.morphl2.io/',
		},
	},
	nativeCurrency: {
		decimals: 18,
		name: 'Ethereum',
		symbol: 'ETH',
	},
})

export const fhenixTestnet = defineChain({
	id: 8008135,
	name: 'Fhenix',
	rpcUrls: {
		default: { http: ['https://api.helium.fhenix.zone/'] },
		public: { http: ['https://api.helium.fhenix.zone/'] },
	},
	blockExplorers: {
		default: {
			name: 'Fhenix Explorer',
			url: 'https://explorer.helium.fhenix.zone/',
		},
	},
	nativeCurrency: {
		decimals: 18,
		name: 'Test Fhenix',
		symbol: 'tFHE',
	},
})

const supportedNetworks = [
	baseSepolia,
	gnosis,
	skale,
	unichain,
	polygonZkEvm,
	storyPublic,
	airDAO,
	flow,
	hederaTestnet,
	zircuitTestnet,
	morphHoleskyTestnet,
	fhenixTestnet,
]

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
