export type CreateSwapManifestProps = {
  userAddress: string
  fromTokenAddress: string
  toTokenAddress: string
  amount: string
  swapComponent: string
}

export const createSwapManifest = ({
  userAddress,
  fromTokenAddress,
  amount,
  swapComponent
}: CreateSwapManifestProps) => `
  CALL_METHOD
    Address("${userAddress}")
    "withdraw"
    Address("${fromTokenAddress}")
    Decimal("${amount}");

  TAKE_FROM_WORKTOP
    Address("${fromTokenAddress}")
    Decimal("${amount}")
    Bucket("bucket_of_clams");

  CALL_METHOD
    Address("${swapComponent}")
    "swap"
    Bucket("bucket_of_clams");

  CALL_METHOD
    Address("${userAddress}")
    "deposit_batch"
    Expression("ENTIRE_WORKTOP");

`
