import React from 'react'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { isEthereumWallet } from '@dynamic-labs/ethereum'
import { Button } from '../ui/button'
import { linkToLamboAbi, linkToLamboAddress } from '@/lib/contracts/LinkToLambo'
import { DEFAULT_CHAIN } from '@/lib/constants'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function RedeemButton({
	password,
}: {
	password: string | null
}) {
	const { primaryWallet } = useDynamicContext()
	const router = useRouter()

	const handleTransaction = async () => {
		if (!password) {
			return
		}

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
			toast.success('Token redeemed!')
			router.push('/')
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
