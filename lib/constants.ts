import { baseSepolia } from 'viem/chains'
import { createPublicClient, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

export const DEFAULT_CHAIN = baseSepolia
export const APP_URL = 'https://link-to-lambo.vercel.app'

export const account = privateKeyToAccount(
	'0xb11a79008e0603ef09711ba4941a5d66d8e7003b519991d494ec83b2852b6f30',
)

export const getPublicClient = (chainId: number) => {
	if (chainId === 84532)
		return createPublicClient({ chain: baseSepolia, transport: http() })
	return createPublicClient({ chain: DEFAULT_CHAIN, transport: http() })
}

export const getChain = (chainId: number) => {
	if (chainId === 84532) return baseSepolia
	return DEFAULT_CHAIN
}
