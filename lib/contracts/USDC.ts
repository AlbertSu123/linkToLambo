import { Address } from 'viem'

export const usdcContractAddress: Record<number, Address> = {
	84532: '0xFC033C2A76EF29F9264deeC78fd18172e3dCFF6f', // Base Sepolia
	974399131: '0xC0eBF6f0dd14937Dd5606f4948D296593F7b1141', // Skale
	1301: '0xb18130AF620E1AcF51eEF5a191d08d6EfC47fFE0', // Unichain
	1101: '0x20e11C584E5F30BB48cBF452B20aCB9E2D4A843C', // Polygon ZKEVM
	1513: '0x20e11C584E5F30BB48cBF452B20aCB9E2D4A843C', // Story Protocol
	22040: '0x4581ea49EF41e55FcE60cc43D5752F5955bf6AD1', // AirDAO
	100: '0x20e11C584E5F30BB48cBF452B20aCB9E2D4A843C', // Gnosis Chain
	545: '0x20e11C584E5F30BB48cBF452B20aCB9E2D4A843C', // Flow Testnet
	296: '0x20e11C584E5F30BB48cBF452B20aCB9E2D4A843C', // Hedera
	48899: '0x20e11C584E5F30BB48cBF452B20aCB9E2D4A843C', // Zircuit
	2810: '0x20e11C584E5F30BB48cBF452B20aCB9E2D4A843C', // Morph
	80002: '0xC0eBF6f0dd14937Dd5606f4948D296593F7b1141', // Polygon zkEVM
}

export const usdcContractAbi = [
	{ type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
	{
		type: 'function',
		name: 'DOMAIN_SEPARATOR',
		inputs: [],
		outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'allowance',
		inputs: [
			{ name: '', type: 'address', internalType: 'address' },
			{ name: '', type: 'address', internalType: 'address' },
		],
		outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'approve',
		inputs: [
			{ name: 'spender', type: 'address', internalType: 'address' },
			{ name: 'amount', type: 'uint256', internalType: 'uint256' },
		],
		outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'balanceOf',
		inputs: [{ name: '', type: 'address', internalType: 'address' }],
		outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'burn',
		inputs: [
			{ name: 'from', type: 'address', internalType: 'address' },
			{ name: 'amount', type: 'uint256', internalType: 'uint256' },
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'decimals',
		inputs: [],
		outputs: [{ name: '', type: 'uint8', internalType: 'uint8' }],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'mint',
		inputs: [
			{ name: 'to', type: 'address', internalType: 'address' },
			{ name: 'amount', type: 'uint256', internalType: 'uint256' },
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'name',
		inputs: [],
		outputs: [{ name: '', type: 'string', internalType: 'string' }],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'nonces',
		inputs: [{ name: '', type: 'address', internalType: 'address' }],
		outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'permit',
		inputs: [
			{ name: 'owner', type: 'address', internalType: 'address' },
			{ name: 'spender', type: 'address', internalType: 'address' },
			{ name: 'value', type: 'uint256', internalType: 'uint256' },
			{ name: 'deadline', type: 'uint256', internalType: 'uint256' },
			{ name: 'v', type: 'uint8', internalType: 'uint8' },
			{ name: 'r', type: 'bytes32', internalType: 'bytes32' },
			{ name: 's', type: 'bytes32', internalType: 'bytes32' },
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'symbol',
		inputs: [],
		outputs: [{ name: '', type: 'string', internalType: 'string' }],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'totalSupply',
		inputs: [],
		outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'transfer',
		inputs: [
			{ name: 'to', type: 'address', internalType: 'address' },
			{ name: 'amount', type: 'uint256', internalType: 'uint256' },
		],
		outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'transferFrom',
		inputs: [
			{ name: 'from', type: 'address', internalType: 'address' },
			{ name: 'to', type: 'address', internalType: 'address' },
			{ name: 'amount', type: 'uint256', internalType: 'uint256' },
		],
		outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
		stateMutability: 'nonpayable',
	},
	{
		type: 'event',
		name: 'Approval',
		inputs: [
			{
				name: 'owner',
				type: 'address',
				indexed: true,
				internalType: 'address',
			},
			{
				name: 'spender',
				type: 'address',
				indexed: true,
				internalType: 'address',
			},
			{
				name: 'amount',
				type: 'uint256',
				indexed: false,
				internalType: 'uint256',
			},
		],
		anonymous: false,
	},
	{
		type: 'event',
		name: 'Transfer',
		inputs: [
			{
				name: 'from',
				type: 'address',
				indexed: true,
				internalType: 'address',
			},
			{
				name: 'to',
				type: 'address',
				indexed: true,
				internalType: 'address',
			},
			{
				name: 'amount',
				type: 'uint256',
				indexed: false,
				internalType: 'uint256',
			},
		],
		anonymous: false,
	},
] as const
