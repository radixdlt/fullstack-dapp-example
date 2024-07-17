export type CreateSwapManifestProps = {
  userAccountAddress: string
  fromTokenAddress: string
  amount: string
  swapComponent: string
}

export const createSwapManifest = ({
  userAccountAddress,
  fromTokenAddress,
  amount,
  swapComponent
}: CreateSwapManifestProps) => `
  CALL_METHOD
    Address("${userAccountAddress}")
    "withdraw"
    Address("${fromTokenAddress}")
    Decimal("${amount}")
    ;
  TAKE_FROM_WORKTOP
    Address("${fromTokenAddress}")
    Decimal("${amount}")
    Bucket("clams")
    ;
  CALL_METHOD
    Address("${swapComponent}")
    "swap"
    Bucket("clams")
    ;
  CALL_METHOD
    Address("${userAccountAddress}")
    "deposit_batch"
    Expression("ENTIRE_WORKTOP")
    ;
`
