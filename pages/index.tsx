import Page from '@/components/page'
import Section from '@/components/section'
import { usdcContractAddress, usdcContractAbi } from '@/lib/contracts/USDC'
import { isEthereumWallet } from '@dynamic-labs/ethereum'
import {
	DynamicWidget,
	useDynamicContext,
	useIsLoggedIn,
} from '@dynamic-labs/sdk-react-core'
import { useEffect, useState } from 'react'
import { Address } from 'viem'

type Token = {
	tokenAddress: Address
	tokenAmount: number
	tokenName: string
}

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
						tokenAddress: usdcContractAddress,
						tokenAmount: Number(balance),
						tokenName: name,
					},
				])
			}
		}
		fetchTokenBalance()
	}, [])

	if (!isLoggedIn) {
		return (
			<Page>
				<Section>
					<div className='container mx-auto px-4 py-8 flex flex-col items-center justify-center'>
						<h1 className='text-3xl font-bold text-center mb-4'>
							Send $DEGEN to anyone
						</h1>
						<h2 className='text-xl text-center mb-6'>
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
				<div className='container mx-auto px-4 py-8'>
					<h1 className='text-3xl font-bold mb-4'>Your tokens</h1>
					{tokenBalances.map((tokenBalance) => (
						<div key={tokenBalance.tokenAddress}>
							{tokenBalance.tokenAmount} {tokenBalance.tokenName}
						</div>
					))}
				</div>
			</Section>
		</Page>
	)
}

export default Index
