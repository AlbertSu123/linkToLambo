import React from 'react'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { isEthereumWallet } from '@dynamic-labs/ethereum'
import { Address, encodeAbiParameters, keccak256 } from 'viem'
import { Button } from '../ui/button'
import { usdcContractAbi, usdcContractAddress } from '@/lib/contracts/USDC'
import { linkToLamboAbi, linkToLamboAddress } from '@/lib/contracts/LinkToLambo'
import { DEFAULT_CHAIN } from '@/lib/constants'
import { toast } from 'sonner'

export default function CreateLinkButton({
	tokenAddress,
	tokenAmount,
	password,
	onCreated,
}: {
	tokenAddress: Address | null
	tokenAmount: number | null
	password: string | null
	onCreated: () => void
}) {
	const { primaryWallet } = useDynamicContext()

	const handleTransaction = async () => {
		if (!password || !tokenAddress || !tokenAmount) {
			return
		}
		const loadingToastId = toast.loading('Creating link...')
		if (primaryWallet && isEthereumWallet(primaryWallet)) {
			const client = await primaryWallet.getWalletClient(
				DEFAULT_CHAIN.id.toString(),
			)
			const publicClient = await primaryWallet.getPublicClient()
			const balance = await publicClient.readContract({
				address: usdcContractAddress,
				abi: usdcContractAbi,
				functionName: 'balanceOf',
				args: [primaryWallet.address as Address],
			})
			const approveAmount = await publicClient.readContract({
				address: tokenAddress,
				abi: usdcContractAbi,
				functionName: 'allowance',
				args: [primaryWallet.address as Address, linkToLamboAddress],
			})

			if (
				tokenAddress === usdcContractAddress &&
				Number(balance) < tokenAmount
			) {
				const mintUSDCTx = await client.writeContract({
					address: usdcContractAddress,
					abi: usdcContractAbi,
					functionName: 'mint',
					args: [primaryWallet.address as Address, BigInt(tokenAmount)],
				})
			}
			if (Number(approveAmount) < tokenAmount) {
				const approveTx = await client.writeContract({
					address: tokenAddress,
					abi: usdcContractAbi,
					functionName: 'approve',
					args: [linkToLamboAddress, BigInt(tokenAmount)],
				})
			}
			const createLinkTx = await client.writeContract({
				address: linkToLamboAddress,
				abi: linkToLamboAbi,
				functionName: 'createLink',
				args: [
					tokenAddress,
					BigInt(tokenAmount),
					keccak256(encodeAbiParameters([{ type: 'string' }], [password])),
				],
			})
			toast.dismiss(loadingToastId)
			toast.success('Link created!')

			// Store the password on walrus
			const aggregator = 'https://aggregator.walrus-testnet.walrus.space'
			const publisher = 'https://publisher.walrus-testnet.walrus.space'

			const response = await fetch(`${publisher}/v1/store`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					password,
				}),
			})
			const data = await response.json()
			console.log(data)
			const blobId = data.newlyCreated.blobObject.blobId
			const storedPasswords = localStorage.getItem('storedPasswords')
			if (!storedPasswords) {
				localStorage.setItem('storedPasswords', blobId + ':' + password)
			} else {
				localStorage.setItem(
					'storedPasswords',
					storedPasswords + '|' + blobId + ':' + password,
				)
			}
			onCreated()
		}
	}

	return (
		<div>
			<Button
				onClick={handleTransaction}
				disabled={!tokenAddress || !tokenAmount || !password}
			>
				Create Link
			</Button>
		</div>
	)
}
