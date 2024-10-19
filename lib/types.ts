export type LoanType = {
	loanId: bigint
	borrowAmount: bigint
	borrowAsset: string
	borrower: string
	borrowerHasRepaid: boolean
	collateralAsset: string
	collateralAssetId: bigint
	collateralPercentage: bigint
	expiration: bigint
	interestRate: bigint
	isActive: boolean
	lender: string
	oracle: string
	startTimestamp: bigint
}
