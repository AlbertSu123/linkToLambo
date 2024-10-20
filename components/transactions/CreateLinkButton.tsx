import React from 'react'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { isEthereumWallet } from '@dynamic-labs/ethereum'
import { Address, encodeAbiParameters, keccak256 } from 'viem'
import { Button } from '../ui/button'
import { usdcContractAbi, usdcContractAddress } from '@/lib/contracts/USDC'
import { linkToLamboAbi, linkToLamboAddress } from '@/lib/contracts/LinkToLambo'
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
	const { primaryWallet, network } = useDynamicContext()

	const handleTransaction = async () => {
		if (!password || !tokenAddress || !tokenAmount) {
			return
		}
		const loadingToastId = toast.loading('Creating link...')
		if (primaryWallet && isEthereumWallet(primaryWallet) && network) {
			const client = await primaryWallet.getWalletClient(network.toString())
			const publicClient = await primaryWallet.getPublicClient()
			const balance = await publicClient.readContract({
				address: usdcContractAddress[Number(network)],
				abi: usdcContractAbi,
				functionName: 'balanceOf',
				args: [primaryWallet.address as Address],
			})
			const approveAmount = await publicClient.readContract({
				address: tokenAddress,
				abi: usdcContractAbi,
				functionName: 'allowance',
				args: [
					primaryWallet.address as Address,
					linkToLamboAddress[Number(network)],
				],
			})

			if (
				tokenAddress === usdcContractAddress[Number(network)] &&
				Number(balance) < tokenAmount
			) {
				const mintUSDCTx = await client.writeContract({
					address: usdcContractAddress[Number(network)],
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
					args: [linkToLamboAddress[Number(network)], BigInt(tokenAmount)],
				})
			}
			const createLinkTx = await client.writeContract({
				address: linkToLamboAddress[Number(network)],
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
			const aggregator = 'https://walrus-testnet-aggregator.nodes.guru'
			const publisher = 'https://walrus-testnet-publisher.nodes.guru'

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
			const blobId = data.newlyCreated.blobObject.blobId
			const storedBlobs = localStorage.getItem('storedBlobs')
			if (!storedBlobs) {
				localStorage.setItem('storedBlobs', blobId)
			} else {
				localStorage.setItem('storedBlobs', storedBlobs + '|' + blobId)
			}
			const storedPasswords = localStorage.getItem('storedPasswords')
			if (!storedPasswords) {
				localStorage.setItem('storedPasswords', password)
			} else {
				localStorage.setItem(
					'storedPasswords',
					storedPasswords + '|' + password,
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
