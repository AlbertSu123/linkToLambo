import Page from '@/components/page'
import { useState } from 'react'
import { Address } from 'viem'
import Section from '@/components/section'
import { Input } from '@/components/ui/input'
import CreateLinkButton from '@/components/transactions/CreateLinkButton'
import { usdcContractAddress } from '@/lib/contracts/USDC'
import { Button } from '@/components/ui/button'
import { BASE_URL } from '@/lib/constants'

export default function Create() {
	const [tokenAddress, setTokenAddress] = useState<Address | null>(
		usdcContractAddress,
	)
	const [tokenAmount, setTokenAmount] = useState<number | null>(null)
	const [password, setPassword] = useState<string | null>(null)
	const [created, setCreated] = useState<boolean>(false)

	if (created) {
		return (
			<Page>
				<Section>
					<div className='container mx-auto px-4 py-8'>
						<h2 className='text-2xl font-bold text-custom-primary mb-6'>
							Link Created
						</h2>
						<Button
							onClick={() => {
								navigator.clipboard.writeText(`${BASE_URL}/redeem/${password}`)
							}}
						>
							Share Link
						</Button>
						
						<Button onClick={() => setCreated(false)}>Create Another</Button>
					</div>
				</Section>
			</Page>
		)
	}

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
							onCreated={() => setCreated(true)}
						/>
					</h2>
				</div>
			</Section>
		</Page>
	)
}
