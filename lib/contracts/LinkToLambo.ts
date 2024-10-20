import { Address } from 'viem'

export const linkToLamboAddress: Record<number, Address> = {
	84532: '0x92D433526ab0112Caa640E0202C26C8A172b1f17', // Base Sepolia
	974399131: '0xAc3934f8cc641c83FAeD3c1b6123B68518A04649', // Skale
	1301: '0xC0eBF6f0dd14937Dd5606f4948D296593F7b1141', // Unichain
	1101: '0x4581ea49EF41e55FcE60cc43D5752F5955bf6AD1', // Polygon ZKEVM
	1513: '0x4581ea49EF41e55FcE60cc43D5752F5955bf6AD1', // Story Protocol
	22040: '0x20e11C584E5F30BB48cBF452B20aCB9E2D4A843C', // AirDAO
	100: '0xb18130AF620E1AcF51eEF5a191d08d6EfC47fFE0', // Gnosis Chain
	545: '0x4581ea49EF41e55FcE60cc43D5752F5955bf6AD1', // Flow Testnet
	296: '0x4581ea49EF41e55FcE60cc43D5752F5955bf6AD1', // Hedera
	48899: '0x4581ea49EF41e55FcE60cc43D5752F5955bf6AD1', // Zircuit
	2810: '0x4581ea49EF41e55FcE60cc43D5752F5955bf6AD1', // Morph
	80002: '0xb18130AF620E1AcF51eEF5a191d08d6EfC47fFE0', // Polygon zkEVM
}
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
