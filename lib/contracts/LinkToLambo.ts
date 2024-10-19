import { Address } from 'viem'

export const linkToLamboAddress: Address =
	'0xF482D3C967A9Bf62eA3f799D98880e70dDAC7A73'
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
		inputs: [{ name: 'password', type: 'uint256', internalType: 'uint256' }],
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
