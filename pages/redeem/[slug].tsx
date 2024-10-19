import Page from '@/components/page'
import Section from '@/components/section'
import RedeemButton from '@/components/transactions/RedeemButton'
import { usdcContractAddress, usdcContractAbi } from '@/lib/contracts/USDC'
import { isEthereumWallet } from '@dynamic-labs/ethereum'
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

export default function Redeem() {
	const router = useRouter()
	const password = router.query.slug as string
	const isLoggedIn = useIsLoggedIn()
	const { primaryWallet } = useDynamicContext()
	const [tokenBalances, setTokenBalances] = useState<Token>()

	useEffect(() => {
		const fetchTokenBalance = async () => {
			if (primaryWallet && isEthereumWallet(primaryWallet)) {
				const client = await primaryWallet.getPublicClient()
				const amount = await client.readContract({
					address: linkToLamboAddress,
					abi: linkToLamboAbi,
					functionName: 'tokenAmounts',
					args: [
						keccak256(encodeAbiParameters([{ type: 'string' }], [password])),
					],
				})
				const tokenAddress = (await client.readContract({
					address: linkToLamboAddress,
					abi: linkToLamboAbi,
					functionName: 'tokenAddresses',
					args: [
						keccak256(encodeAbiParameters([{ type: 'string' }], [password])),
					],
				})) as Address
				const name = await client.readContract({
					address: tokenAddress,
					abi: usdcContractAbi,
					functionName: 'name',
				})
				setTokenBalances({
					address: tokenAddress,
					amount: Number(amount),
					name: name,
				})
			}
		}
		fetchTokenBalance()
	}, [primaryWallet])

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
				{tokenBalances && (
					<TokenDisplay
						address={tokenBalances.address}
						amount={tokenBalances.amount}
						name={tokenBalances.name}
					/>
				)}
			</Section>
		</Page>
	)
}
