import Page from '@/components/page'
import Section from '@/components/section'
import RedeemButton from '@/components/transactions/RedeemButton'
import { usdcContractAbi } from '@/lib/contracts/USDC'
import {
	DynamicWidget,
	useDynamicContext,
	useIsLoggedIn,
} from '@dynamic-labs/sdk-react-core'
import { Address, encodeAbiParameters, keccak256 } from 'viem'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { linkToLamboAddress, linkToLamboAbi } from '@/lib/contracts/LinkToLambo'
import TokenDisplay, { Token } from '@/components/token-display'
import SendEthButton from '@/components/transactions/SendEthButton'
import { getPublicClient } from '@/lib/constants'

export default function Redeem() {
	const router = useRouter()
	const password = router.query.slug as string
	const isLoggedIn = useIsLoggedIn()
	const [tokenBalances, setTokenBalances] = useState<Token>()
	const { network } = useDynamicContext()

	useEffect(() => {
		const fetchTokenBalance = async () => {
			try {
				const publicClient = getPublicClient(Number(network))
				const amount = await publicClient.readContract({
					address: linkToLamboAddress[Number(network)],
					abi: linkToLamboAbi,
					functionName: 'tokenAmounts',
					args: [
						keccak256(encodeAbiParameters([{ type: 'string' }], [password])),
					],
				})
				const tokenAddress = (await publicClient.readContract({
					address: linkToLamboAddress[Number(network)],
					abi: linkToLamboAbi,
					functionName: 'tokenAddresses',
					args: [
						keccak256(encodeAbiParameters([{ type: 'string' }], [password])),
					],
				})) as Address

				const name = await publicClient.readContract({
					address: tokenAddress,
					abi: usdcContractAbi,
					functionName: 'name',
				})
				setTokenBalances({
					address: tokenAddress,
					amount: Number(amount),
					name: name,
				})
			} catch (error) {
				console.error(error)
			}
		}
		fetchTokenBalance()
	}, [password, network])

	return (
		<Page>
			<Section className='max-w-3xl mx-auto px-4 py-8'>
				<div className='bg-white rounded-lg shadow-md p-6'>
					<h1 className='text-2xl font-bold mb-2'>Claim this Stash!</h1>
					<p className='text-gray-600 mb-4'>
						Receive these assets by signing in or connecting a wallet.
					</p>
					<div className='flex space-x-4'>
						<RedeemButton password={password} />
						<SendEthButton />
					</div>
				</div>
				{tokenBalances && (
					<TokenDisplay
						address={tokenBalances.address}
						amount={tokenBalances.amount}
						name={tokenBalances.name}
					/>
				)}
				{!isLoggedIn && (
					<div className='flex justify-center mt-6'>
						<DynamicWidget variant='modal' />
					</div>
				)}
			</Section>
		</Page>
	)
}
