import React from 'react'
import { useDynamicContext, useIsLoggedIn } from '@dynamic-labs/sdk-react-core'
import { isEthereumWallet } from '@dynamic-labs/ethereum'
import { Button } from '../ui/button'
import { adminWalletClient } from '@/lib/constants'
import { Address, parseEther } from 'viem'
import { toast } from 'sonner'

export default function SendEthButton() {
	const { primaryWallet } = useDynamicContext()
	const isLoggedIn = useIsLoggedIn()

	const handleTransaction = async () => {
		if (primaryWallet && isEthereumWallet(primaryWallet)) {
			const loading = toast.loading('Sending gas...')
			const redeemTx = await adminWalletClient.sendTransaction({
				to: primaryWallet.address as Address,
				value: parseEther('0.0001'),
			})
			toast.dismiss(loading)
			toast.success('Gas sent!')
		}
	}
	return (
		<div>
			<Button onClick={handleTransaction} disabled={!isLoggedIn}>
				Get Gas
			</Button>
		</div>
	)
}
