import Page from '@/components/page'
import Section from '@/components/section'
import RedeemButton from '@/components/transactions/RedeemButton'
import { DynamicWidget, useIsLoggedIn } from '@dynamic-labs/sdk-react-core'
import { useRouter } from 'next/router'

export default function Redeem() {
	const router = useRouter()
	const password = router.query.slug as string
	const isLoggedIn = useIsLoggedIn()

	return (
		<Page>
			<Section className='max-w-3xl mx-auto px-4 py-8'>
				<div className='bg-white rounded-lg shadow-md p-6'>
					<h1 className='text-2xl font-bold mb-2'>Claim this Stash!</h1>
					<p className='text-gray-600 mb-4'>
						Receive these assets by signing in or connecting a wallet.
					</p>
					<RedeemButton password={password} />
				</div>
				{!isLoggedIn && (
					<div className='flex justify-center mt-6'>
						<DynamicWidget variant='modal' />
					</div>
				)}
			</Section>
		</Page>
	)
}
