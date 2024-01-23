import { BehaviorSubject, Subject } from 'rxjs';
import {
	StreamTransactionsResponse,
	type ErrorResponse as GatewayErrorResponse
} from '@radixdlt/babylon-gateway-api-sdk';
import { GetTransactionsErrorOutput } from '../gateway';

export type TransactionStreamSubjects = ReturnType<typeof TransactionStreamSubjects>;
export const TransactionStreamSubjects = ({
	fromStateVersion,
	status
}: {
	fromStateVersion: number;
	status: 'stop' | 'run';
}) => ({
	startStateVersionSubject: new BehaviorSubject<number | undefined>(fromStateVersion),
	currentStateVersionSubject: new BehaviorSubject<number>(fromStateVersion),
	statusSubject: new BehaviorSubject<'stop' | 'run'>(status),
	triggerSubject: new Subject<void>(),
	errorSubject: new Subject<GetTransactionsErrorOutput>(),
	transactionsSubject: new Subject<StreamTransactionsResponse['items']>()
});
