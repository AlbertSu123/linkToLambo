import Page from '@/components/page'
import Section from '@/components/section'
import { DynamicWidget, useIsLoggedIn } from '@dynamic-labs/sdk-react-core'

const Index = () => {
	const isLoggedIn = useIsLoggedIn()
	if (!isLoggedIn) {
		return (
			<Page>
				<Section>
					<div className='container mx-auto px-4 py-8 flex flex-col items-center justify-center'>
						<h1 className='text-3xl font-bold text-center mb-4'>
							Send $DEGEN to anyone
						</h1>
						<h2 className='text-lg text-center mb-6'>
							Make a link and share it
						</h2>
						<div className='flex justify-center'>
							<DynamicWidget variant='modal' />
						</div>
					</div>
				</Section>
			</Page>
		)
	}
	return (
		<Page>
			<Section>
				<div className='container mx-auto px-4 py-8'></div>
			</Section>
		</Page>
	)
}

export default Index
