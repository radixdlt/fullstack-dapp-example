import client from 'prom-client'

export const Metrics = {
  eventQueue: {
    waitingJobs: new client.Histogram({
      name: 'event_queue_waiting_queue_jobs',
      help: 'The number of waiting jobs in the event queue'
    }),
    completedJobs: new client.Histogram({
      name: 'event_queue_completed_queue_jobs',
      help: 'The number of completed jobs in the event queue'
    }),
    failedJobs: new client.Histogram({
      name: 'event_queue_failed_queue_jobs',
      help: 'The number of failed jobs in the event queue'
    }),
    activeJobs: new client.Histogram({
      name: 'event_queue_active_queue_jobs',
      help: 'The number of active jobs in the event queue'
    })
  },
  transactionQueue: {
    waitingJobs: new client.Histogram({
      name: 'transaction_queue_waiting_queue_jobs',
      help: 'The number of waiting jobs in the transaction queue'
    }),
    completedJobs: new client.Histogram({
      name: 'transaction_queue_completed_queue_jobs',
      help: 'The number of completed jobs in the transaction queue'
    }),
    failedJobs: new client.Histogram({
      name: 'transaction_queue_failed_queue_jobs',
      help: 'The number of failed jobs in the transaction queue'
    }),
    activeJobs: new client.Histogram({
      name: 'transaction_queue_active_queue_jobs',
      help: 'The number of active jobs in the transaction queue'
    })
  }
} as const
