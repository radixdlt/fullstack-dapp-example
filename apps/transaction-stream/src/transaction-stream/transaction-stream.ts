import { GatewayApiClient } from '../gateway'
import { concatMap, from, tap, map, withLatestFrom, filter, switchMap, timer } from 'rxjs'
import { TransactionStreamSubjects } from './subjects'
import { HandleTransactionResult, handleTransactionResult } from './helpers/handleTransactionResult'

export type TransactionStreamInput = {
  fromStateVersion?: number
  initialStatus?: 'run' | 'stop'
  dependencies: { gatewayApiClient: GatewayApiClient; subjects?: TransactionStreamSubjects }
}
export type TransactionStream = ReturnType<typeof TransactionStream>
export const TransactionStream = ({
  fromStateVersion = 0,
  initialStatus = 'run',
  dependencies
}: TransactionStreamInput) => {
  const subjects =
    dependencies.subjects ?? TransactionStreamSubjects({ fromStateVersion, status: initialStatus })
  const { getTransactions } = dependencies.gatewayApiClient

  const fetchAndProcessTransactions = (stateVersion: number) =>
    from(getTransactions(stateVersion)).pipe(
      map((result) => handleTransactionResult(result, stateVersion!))
    )

  const continueStream = (delay: number) => subjects.triggerSubject.next(delay)

  const emitValuesToObservers = (result: HandleTransactionResult) => {
    if (result.isErr()) {
      subjects.statusSubject.next('stop')
      return subjects.errorSubject.next(result.error)
    }

    const { transactions, stateVersion } = result.value
    subjects.currentStateVersionSubject.next(stateVersion)
    subjects.transactionsSubject.next({ transactions, continueStream, stateVersion })
  }

  const stateVersion$ = subjects.triggerSubject.pipe(
    switchMap((delayTime) => timer(delayTime)),
    withLatestFrom(subjects.statusSubject, subjects.currentStateVersionSubject),
    filter(([, status]) => status === 'run'),
    map(([, , stateVersion]) => stateVersion)
  )

  const stream$ = stateVersion$.pipe(
    concatMap(fetchAndProcessTransactions),
    tap(emitValuesToObservers)
  )

  const subscription = stream$.subscribe()

  const destroy = () => {
    subscription.unsubscribe()
  }

  // start the stream
  continueStream(0)

  return {
    get startStateVersion() {
      return subjects.startStateVersionSubject.value
    },
    get currentStateVersion() {
      return subjects.currentStateVersionSubject.value
    },
    get status() {
      return subjects.statusSubject.value
    },
    setStatus: (status: 'run' | 'stop', delay: number) => {
      subjects.statusSubject.next(status)
      if (status === 'run') {
        subjects.triggerSubject.next(delay)
      }
    },
    error$: subjects.errorSubject.asObservable(),
    transactions$: subjects.transactionsSubject.asObservable(),
    destroy
  }
}
