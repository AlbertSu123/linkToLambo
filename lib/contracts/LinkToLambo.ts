import { Address } from 'viem'

export const linkToLamboAddress: Address =
	'0x01a3473184cc6ffC6Bd4D9c907B0E9Bd6129989d'
export const linkToLamboAbi = [
	{
		type: 'function',
		name: 'createLink',
		inputs: [
			{
				name: 'tokenAddress',
				type: 'address',
				internalType: 'address',
			},
			{ name: 'tokenAmount', type: 'uint256', internalType: 'uint256' },
			{
				name: 'hashedPassword',
				type: 'bytes32',
				internalType: 'bytes32',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'redeemLink',
		inputs: [{ name: 'password', type: 'string', internalType: 'string' }],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'tokenAddresses',
		inputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
		outputs: [{ name: '', type: 'address', internalType: 'address' }],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'tokenAmounts',
		inputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
		outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
		stateMutability: 'view',
	},
]
