import { ResultAsync } from 'neverthrow'
import type { AppLogger } from '.'

export const resultWrapperWithLogger =
    (logger?: AppLogger) =>
        (name: string) =>
            <T, P, I extends Array<P>>(method: (...args: I) => Promise<T>) =>
                (...args: I) =>
                    ResultAsync.fromPromise(method(...args), (error) => {
                        logger?.error({
                            error: (error as Error).message,
                            method: name,
                            model: 'GoldenTicketModel'
                        })
                        return error as Error
                    })
