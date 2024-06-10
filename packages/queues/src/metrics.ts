import { type ConnectionOptions, Queue, Worker } from 'bullmq'
import client from 'prom-client'
import { Queues, getQueues } from './queues'
import http from 'http'
import type { AppLogger } from 'common'

export type QueueMetrics = ReturnType<typeof QueueMetrics>
export const QueueMetrics = (name: string) => {
  return {
    waitingJobs: new client.Histogram({
      name: `${name}_queue_waiting_jobs`,
      help: `The number of waiting jobs in the ${name} queue`
    }),
    completedJobs: new client.Histogram({
      name: `${name}_queue_completed_jobs`,
      help: `The number of completed jobs in the ${name} queue`
    }),
    failedJobs: new client.Histogram({
      name: `${name}_queue_failed_jobs`,
      help: `The number of failed jobs in the ${name} queue`
    }),
    activeJobs: new client.Histogram({
      name: `${name}_queue_active_jobs`,
      help: `The number of active jobs in the ${name} queue`
    })
  }
}

const setupQueueEvents = (queue: Queue, trackMetricsFn: QueueMetrics) => {
  queue.on('waiting', async () => {
    trackMetricsFn.waitingJobs.observe(await queue.getJobCountByTypes('wait'))
  })

  queue.on('progress', async () => {
    trackMetricsFn.activeJobs.observe(await queue.getJobCountByTypes('active'))
  })
}

const setupWorkerEvents = (worker: Worker, queue: Queue, trackMetricsFn: QueueMetrics) => {
  worker.on('failed', async () => {
    trackMetricsFn.failedJobs.observe(await queue.getJobCountByTypes('failed'))
  })

  worker.on('completed', async () => {
    trackMetricsFn.completedJobs.observe(await queue.getJobCountByTypes('completed'))
  })
}

export const SetupQueueMetrics = ({
  connection,
  port = 9210,
  logger
}: {
  connection: ConnectionOptions
  port?: number
  logger?: AppLogger
}) => {
  const { transactionQueue, eventQueue, systemQueue } = getQueues(connection)

  const queueMetrics = {
    eventQueue: QueueMetrics('event'),
    transactionQueue: QueueMetrics('transaction'),
    systemQueue: QueueMetrics('system')
  } as const

  const eventWorker = new Worker(Queues.EventQueue, null, { connection })
  const transactionWorker = new Worker(Queues.TransactionQueue, null, { connection })
  const systemWorker = new Worker(Queues.SystemQueue, null, { connection })

  setupQueueEvents(transactionQueue.queue, queueMetrics.transactionQueue)
  setupQueueEvents(eventQueue.queue, queueMetrics.eventQueue)
  setupQueueEvents(systemQueue.queue, queueMetrics.systemQueue)

  setupWorkerEvents(eventWorker, eventQueue.queue, queueMetrics.eventQueue)
  setupWorkerEvents(transactionWorker, transactionQueue.queue, queueMetrics.transactionQueue)
  setupWorkerEvents(systemWorker, systemQueue.queue, queueMetrics.systemQueue)

  const metricsServer = http.createServer(async (req, res) => {
    if (req.url === '/metrics') {
      res.writeHead(200)
      res.end(await client.register.metrics())
    } else {
      res.writeHead(404)
      res.end()
    }
  })

  metricsServer.listen(port)
  logger?.debug({ method: 'SetupQueueMetrics', port })

  return client
}
