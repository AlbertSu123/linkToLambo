import { LoanType } from '@/lib/types'
import { Button } from './button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './card'
import { zeroAddress } from 'viem'
import { useRouter } from 'next/router'
import Image from 'next/image'

export const Loan = ({ loan }: { loan: LoanType }) => {
	const router = useRouter()

	return (
		<Card className='overflow-hidden hover:shadow-lg transition-shadow duration-300'>
			<Image
				src={`https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=400&q=80&ixid=${loan.loanId}`}
				alt='Beach house'
				width={400}
				height={200}
				className='w-full h-48 object-cover'
			/>
			<CardHeader className='p-4'>
				<CardTitle className='text-lg font-semibold text-custom-primary'>
					Loan #{loan.loanId.toString()}
				</CardTitle>
				<CardDescription className='text-sm text-gray-500'>
					Beach House Loan
				</CardDescription>
			</CardHeader>
			<CardContent className='p-4 pt-0'>
				<p className='text-sm'>
					<span className='font-medium'>Active:</span>{' '}
					{loan.isActive ? 'Yes' : 'No'}
				</p>
				<p className='text-sm'>
					<span className='font-medium'>Borrow Amount:</span> $
					{loan.borrowAmount.toLocaleString()}
				</p>
				<p className='text-sm'>
					<span className='font-medium'>Expiration:</span>{' '}
					{new Date(Number(loan.expiration) * 1000).toLocaleDateString()}
				</p>
				<p className='text-sm'>
					<span className='font-medium'>Interest:</span>{' '}
					{loan.interestRate.toLocaleString()}%
				</p>
			</CardContent>
			<CardFooter className='p-4 pt-0 flex justify-between'>
				{loan.oracle == zeroAddress && (
					<Button
						onClick={() => router.push(`/price/${loan.loanId}`)}
						className='bg-custom-primary text-white hover:bg-custom-accent hover:text-custom-primary transition-colors duration-300'
					>
						Price Loan
					</Button>
				)}
				{loan.lender == zeroAddress && (
					<Button
						onClick={() => router.push(`/lend/${loan.loanId}`)}
						className='bg-custom-primary text-white hover:bg-custom-accent hover:text-custom-primary transition-colors duration-300'
					>
						Lend
					</Button>
				)}
			</CardFooter>
		</Card>
	)
}
