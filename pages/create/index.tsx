import Page from '@/components/page'
import { useEffect, useState } from 'react'
import { Address } from 'viem'
import Section from '@/components/section'
import { Input } from '@/components/ui/input'
import CreateLinkButton from '@/components/transactions/CreateLinkButton'
import { usdcContractAbi, usdcContractAddress } from '@/lib/contracts/USDC'
import { Button } from '@/components/ui/button'
import { APP_URL, DEFAULT_CHAIN } from '@/lib/constants'
import QRCode from 'react-qr-code'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { isEthereumWallet } from '@dynamic-labs/ethereum'
import { Card } from '@/components/ui/card'
import TokenDisplay from '@/components/token-display'
import { toast } from 'sonner'
import { linkToLamboAddress, linkToLamboAbi } from '@/lib/contracts/LinkToLambo'

export default function Create() {
	const [tokenAddress, setTokenAddress] = useState<Address | null>(
		usdcContractAddress,
	)
	const [tokenName, setTokenName] = useState<string | null>(null)
	const [tokenAmount, setTokenAmount] = useState<number | null>(null)
	const [password, setPassword] = useState<string | null>(null)
	const [created, setCreated] = useState<boolean>(false)
	const { primaryWallet } = useDynamicContext()
	const shareUrl = `${APP_URL}/redeem/${password}`

	useEffect(() => {
		if (tokenAddress) {
			const fetchTokenName = async () => {
				if (!primaryWallet || !isEthereumWallet(primaryWallet)) return
				const publicClient = await primaryWallet.getPublicClient()
				const name = await publicClient.readContract({
					address: tokenAddress,
					abi: usdcContractAbi,
					functionName: 'name',
				})
				setTokenName(name)
			}
			fetchTokenName()
		}
	}, [tokenAddress])

	const handleRedeem = async (password: string) => {
		if (primaryWallet && isEthereumWallet(primaryWallet)) {
			const loading = toast.loading('Redeeming link...')
			const client = await primaryWallet.getWalletClient(
				DEFAULT_CHAIN.id.toString(),
			)
			const redeemTx = await client.writeContract({
				address: linkToLamboAddress,
				abi: linkToLamboAbi,
				functionName: 'redeemLink',
				args: [password],
			})
			toast.dismiss(loading)
			toast.success('Link redeemed!')
		}
	}

	if (created) {
		return (
			<Page>
				<Section>
					<Card className='max-w-md mx-auto p-6'>
						<h2 className='text-2xl font-bold mb-4'>Share link</h2>
						<p className='text-gray-600 mb-4'>
							Your assets are ready to claim. Send the link via text or email.
							The token can be reclaimed in your transaction history.
						</p>

						<div className='flex justify-between items-center mb-4'>
							<div className='flex-1 flex flex-col items-center'>
								<p className='text-xs text-gray-500 mb-2'>{shareUrl}</p>
								<Button
									className='bg-black text-white px-4 py-2 rounded-full flex items-center'
									onClick={() => {
										navigator.clipboard.writeText(shareUrl)
										toast.success('Link copied to clipboard!')
									}}
								>
									<svg
										className='w-4 h-4 mr-2'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path d='M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z' />
									</svg>
									SHARE LINK
								</Button>
							</div>

							<div className='w-24 h-24'>
								<QRCode value={shareUrl} size={96} />
							</div>
						</div>
						<div className='flex justify-center mt-6'>
							<Button
								variant='outline'
								disabled={!password}
								onClick={() => {
									if (!password) return
									setCreated(false)
									handleRedeem(password)
								}}
							>
								Undo Share
							</Button>
						</div>
						<TokenDisplay
							address={tokenAddress ?? '0x'}
							amount={tokenAmount ?? 0}
							name={tokenName ?? ''}
						/>
					</Card>
					<div className='flex justify-center mt-6'>
						<Button
							variant='outline'
							onClick={() => {
								setCreated(false)
								setPassword(null)
								setTokenAddress(null)
								setTokenAmount(null)
								setTokenName(null)
							}}
						>
							Create Another Link
						</Button>
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
							placeholder='Token'
							type='text'
							value={tokenAddress ?? ''}
							onChange={(e) => setTokenAddress(e.target.value as Address)}
						/>
						<Input
							placeholder='Amount'
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
