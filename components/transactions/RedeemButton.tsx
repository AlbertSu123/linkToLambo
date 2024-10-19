import React from 'react'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { isEthereumWallet } from '@dynamic-labs/ethereum'
import { toHex } from 'viem'
import { Button } from '../ui/button'
import { linkToLamboAbi, linkToLamboAddress } from '@/lib/contracts/LinkToLambo'
import { DEFAULT_CHAIN } from '@/lib/constants'

export default function RedeemButton({
	password,
}: {
	password: string | null
}) {
	const { primaryWallet } = useDynamicContext()

	const handleTransaction = async () => {
		if (!password) {
			return
		}
		if (primaryWallet && isEthereumWallet(primaryWallet)) {
			const client = await primaryWallet.getWalletClient(
				DEFAULT_CHAIN.id.toString(),
			)
			const redeemTx = await client.writeContract({
				address: linkToLamboAddress,
				abi: linkToLamboAbi,
				functionName: 'redeemLink',
				args: [BigInt(password)],
			})
			console.log('redeemTx', redeemTx)
		}
	}
	return (
		<div>
			<Button onClick={handleTransaction} disabled={!password}>
				Redeem
			</Button>
		</div>
	)
}
