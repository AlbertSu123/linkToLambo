import { Address } from 'viem'
export interface Token {
	address: Address
	amount: number
	name: string
}

export default function TokenDisplay({ address, amount, name }: Token) {
	return (
		<div className='flex justify-between items-center bg-white rounded-lg shadow-md p-4 my-4'>
			<div className='flex items-center'>
				<div className='w-10 h-10 bg-gray-200 rounded-full mr-3 flex items-center justify-center'>
					<span className='text-lg font-bold'>{name[0]}</span>
				</div>
				<div className='text-lg font-semibold text-gray-800'>{name}</div>
			</div>
			<div className='text-xl font-bold text-blue-600'>
				{amount.toLocaleString()}
			</div>
		</div>
	)
}
