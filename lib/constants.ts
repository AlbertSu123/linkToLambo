import { baseSepolia } from 'viem/chains'
import { createPublicClient, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

export const DEFAULT_CHAIN = baseSepolia
export const APP_URL = 'localhost:3000'

export const account = privateKeyToAccount(
	'0xb11a79008e0603ef09711ba4941a5d66d8e7003b519991d494ec83b2852b6f30',
)
export const publicClient = createPublicClient({
	chain: DEFAULT_CHAIN,
	transport: http(),
})
export const adminWalletClient = createWalletClient({
	account,
	chain: DEFAULT_CHAIN,
	transport: http(),
})
