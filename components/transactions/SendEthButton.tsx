import React from 'react'
import { useDynamicContext, useIsLoggedIn } from '@dynamic-labs/sdk-react-core'
import { isEthereumWallet } from '@dynamic-labs/ethereum'
import { Button } from '../ui/button'
import { account, getChain } from '@/lib/constants'
import { Address, createWalletClient, http, parseEther, parseGwei } from 'viem'
import { toast } from 'sonner'

export default function SendEthButton() {
	const { primaryWallet, network } = useDynamicContext()
	const isLoggedIn = useIsLoggedIn()

	const handleTransaction = async () => {
		if (primaryWallet && isEthereumWallet(primaryWallet)) {
			const loading = toast.loading('Sending gas...')
			const adminWalletClient = createWalletClient({
				account,
				chain: getChain(Number(network)),
				transport: http(),
			})
			const redeemTx = await adminWalletClient.sendTransaction({
				to: primaryWallet.address as Address,
				value: parseEther(Number(network) == 1101 ? '0.0001' : '0.02'),
				gasPrice: Number(network) === 545 ? parseGwei('20') : undefined,
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
