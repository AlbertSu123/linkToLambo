import { Address } from 'viem'
export interface Token {
	address: Address
	amount: number
	name: string
}

export default function TokenDisplay({ address, amount, name }: Token) {
	return (
		<div className="flex justify-between items-center">
			<div>{name}</div>
			<div>{amount}</div>
		</div>
	)
}
