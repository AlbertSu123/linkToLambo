import { USDCIcon } from '@/components/icons/USDCIcon'
import Page from '@/components/page'
import Section from '@/components/section'
import TokenDisplay, { Token } from '@/components/token-display'
import { usdcContractAddress, usdcContractAbi } from '@/lib/contracts/USDC'
import { isEthereumWallet } from '@dynamic-labs/ethereum'
import {
	DynamicWidget,
	useDynamicContext,
	useIsLoggedIn,
} from '@dynamic-labs/sdk-react-core'
import { useEffect, useState } from 'react'
import { Address } from 'viem'

const Index = () => {
	const isLoggedIn = useIsLoggedIn()
	const { primaryWallet } = useDynamicContext()
	const [tokenBalances, setTokenBalances] = useState<Token[]>([])

	useEffect(() => {
		const fetchTokenBalance = async () => {
			if (primaryWallet && isEthereumWallet(primaryWallet)) {
				const client = await primaryWallet.getPublicClient()
				const balance = await client.readContract({
					address: usdcContractAddress,
					abi: usdcContractAbi,
					functionName: 'balanceOf',
					args: [primaryWallet.address as Address],
				})
				const name = await client.readContract({
					address: usdcContractAddress,
					abi: usdcContractAbi,
					functionName: 'name',
				})
				console.log(balance)
				setTokenBalances([
					{
						address: usdcContractAddress,
						amount: Number(balance),
						name: name,
					},
				])
			}
		}
		fetchTokenBalance()
	}, [primaryWallet])

	if (!isLoggedIn) {
		return (
			<Page>
				<Section>
					<div className='container mx-auto px-4 flex flex-col items-center justify-center min-h-screen'>
						<h1 className='text-5xl font-extrabold text-center mb-6 text-black shadow-text'>
							Send Tokens to Anyone, Anywhere
						</h1>
						<h2 className='text-2xl text-center mb-8 text-black shadow-text'>
							Create a magical link and share the wealth
						</h2>
						<div className='flex justify-center'>
							<DynamicWidget
								variant='modal'
								buttonClassName='bg-white text-purple-600 font-bold py-3 px-6 rounded-full hover:bg-purple-100 transition duration-300 transform hover:scale-105'
							/>
						</div>
						<div className='mt-12'>
							<USDCIcon width={50} height={50} className='animate-bounce' />
						</div>
					</div>
				</Section>
			</Page>
		)
	}
	return (
		<Page>
			<Section>
				<div className='container mx-auto px-4 py-8'>
					<h1 className='text-3xl font-bold mb-4'>Your tokens</h1>
					{tokenBalances.map((tokenBalance) => (
						<TokenDisplay
							key={tokenBalance.address}
							address={tokenBalance.address}
							amount={tokenBalance.amount}
							name={tokenBalance.name}
						/>
					))}
				</div>
			</Section>
		</Page>
	)
}

export default Index
