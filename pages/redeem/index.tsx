import Page from '@/components/page'
import Section from '@/components/section'
import RedeemButton from '@/components/transactions/RedeemButton'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export default function Redeem() {
	const [password, setPassword] = useState('')

	return (
		<Page>
			<Section className='max-w-md mx-auto px-4 py-12'>
				<div className='bg-white rounded-lg shadow-md p-8'>
					<h1 className='text-2xl font-bold mb-6 text-center'>
						Redeem Your Password
					</h1>
					<div className='space-y-6'>
						<Input
							placeholder='Enter Password'
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className='w-full'
						/>
						<RedeemButton password={password} />
					</div>
				</div>
			</Section>
		</Page>
	)
}
