import React from 'react'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { isEthereumWallet } from '@dynamic-labs/ethereum'
import {
	Address,
	encodeAbiParameters,
	keccak256,
	parseEther,
	toHex,
} from 'viem'
import { Button } from '../ui/button'
import { usdcContractAbi, usdcContractAddress } from '@/lib/contracts/USDC'
import { linkToLamboAbi, linkToLamboAddress } from '@/lib/contracts/LinkToLambo'
import { DEFAULT_CHAIN } from '@/lib/constants'

export default function CreateLinkButton({
	tokenAddress,
	tokenAmount,
	password,
}: {
	tokenAddress: Address | null
	tokenAmount: number | null
	password: string | null
}) {
	const { primaryWallet } = useDynamicContext()

	const handleTransaction = async () => {
		if (!password || !tokenAddress || !tokenAmount) {
			return
		}
		if (primaryWallet && isEthereumWallet(primaryWallet)) {
			const client = await primaryWallet.getWalletClient(
				DEFAULT_CHAIN.id.toString(),
			)

			if (tokenAddress === usdcContractAddress) {
				const mintUSDCTx = await client.writeContract({
					address: usdcContractAddress,
					abi: usdcContractAbi,
					functionName: 'mint',
					args: [primaryWallet.address as Address, BigInt(tokenAmount)],
				})
			}
			const approveTx = await client.writeContract({
				address: tokenAddress,
				abi: usdcContractAbi,
				functionName: 'approve',
				args: [linkToLamboAddress, BigInt(tokenAmount)],
			})
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
