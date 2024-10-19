import { Address } from 'viem'
export interface Token {
	address: Address
	amount: number
	name: string
}

export default function TokenDisplay({ address, amount, name }: Token) {
	return (
		<div className='flex justify-between items-center bg-white rounded-xl shadow-md p-6 my-6 hover:shadow-lg transition-shadow duration-300'>
			<div className='flex items-center space-x-4'>
				<div className='w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center'>
					<span className='text-xl font-bold text-white'>{name[0]}</span>
				</div>
				<div className='text-xl font-semibold text-gray-800'>{name}</div>
			</div>
			<div className='text-2xl font-bold text-blue-600'>
				{amount.toLocaleString()}
			</div>
		</div>
	)
}
