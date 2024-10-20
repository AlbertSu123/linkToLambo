import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { WagmiProvider } from 'wagmi'
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core'
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum'
import { Toaster } from 'sonner'
import '@/styles/globals.css'
import { getConfig } from '@/lib/wagmi'
import { evmNetworks } from '@/lib/constants'

export default function App({ Component, pageProps }: AppProps) {
	const [config] = useState(() => getConfig())
	const [queryClient] = useState(() => new QueryClient())

	return (
		<WagmiProvider config={config} initialState={pageProps.initialState}>
			<QueryClientProvider client={queryClient}>
				<DynamicContextProvider
					settings={{
						environmentId: 'f8b26bda-3d5a-4c6c-86e3-ce0fc5008e8c',
						walletConnectors: [EthereumWalletConnectors],
						overrides: { evmNetworks },
					}}
				>
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						disableTransitionOnChange
					>
						<Toaster />
						<Component {...pageProps} />
					</ThemeProvider>
				</DynamicContextProvider>
			</QueryClientProvider>
		</WagmiProvider>
	)
}
