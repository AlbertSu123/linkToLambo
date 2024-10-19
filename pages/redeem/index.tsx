import Page from '@/components/page'
import Section from '@/components/section'
import RedeemButton from '@/components/transactions/RedeemButton'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export default function Redeem() {
	const [password, setPassword] = useState('')

	return (
		<Page>
			<Section className='max-w-3xl mx-auto px-4 py-8'>
				<Input
					placeholder='Password'
					type='text'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<RedeemButton password={password} />
			</Section>
		</Page>
	)
}
