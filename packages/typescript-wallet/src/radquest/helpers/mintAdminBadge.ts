import { radixEngineClient } from '../../config'

export const mintAdminBadge = ({
	adminBadgeAddress,
	accountAddress,
	superAdminBadgeAddress
}: {
	superAdminBadgeAddress: string
	accountAddress: string
	adminBadgeAddress: string
}) =>
	radixEngineClient
		.getManifestBuilder()
		.andThen(({ wellKnownAddresses, convertStringManifest, submitTransaction }) =>
			convertStringManifest(`
        CALL_METHOD 
          Address("${wellKnownAddresses.accountAddress.payerAccount}") 
          "lock_fee"
          Decimal("10")
        ;

        CALL_METHOD
          Address("${wellKnownAddresses.accountAddress.dAppDefinitionAccount}")
          "create_proof_of_amount"
          Address("${superAdminBadgeAddress}")
          Decimal("1")
        ;

        MINT_FUNGIBLE 
          Address("${adminBadgeAddress}")
          Decimal("1")
        ;

        CALL_METHOD
          Address("${accountAddress}")
          "try_deposit_batch_or_abort"
          Expression("ENTIRE_WORKTOP")
          Enum<0u8>()
        ;
        
        `)
				.andThen((transactionManifest) =>
					submitTransaction(transactionManifest, ['dAppDefinitionAccount'])
				)
				.andThen(({ txId }) =>
					radixEngineClient.gatewayClient.pollTransactionStatus(txId).map(() => txId)
				)
		)
