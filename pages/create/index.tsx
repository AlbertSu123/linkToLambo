import Page from '@/components/page'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Address } from 'viem'
import Section from '@/components/section'
import { Input } from '@/components/ui/input'
import CreateLinkButton from '@/components/transactions/CreateLinkButton'

export default function Lend() {
	const [tokenAddress, setTokenAddress] = useState<Address | null>(null)
	const [tokenAmount, setTokenAmount] = useState<number | null>(null)
	const [password, setPassword] = useState<string | null>(null)

	return (
		<Page>
			<Section>
				<div className='container mx-auto px-4 py-8'>
					<h2 className='text-2xl font-bold text-custom-primary mb-6'>
						Create Link
						<Input
							placeholder='Token Address'
							type='text'
							value={tokenAddress ?? ''}
							onChange={(e) => setTokenAddress(e.target.value as Address)}
						/>
						<Input
							placeholder='Token Amount'
							type='number'
							value={tokenAmount ?? ''}
							onChange={(e) => setTokenAmount(Number(e.target.value))}
						/>
						<Input
							placeholder='Password'
							type='text'
							value={password ?? ''}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<CreateLinkButton
							tokenAddress={tokenAddress}
							tokenAmount={tokenAmount}
							password={password}
						/>
					</h2>
				</div>
			</Section>
		</Page>
	)
}
