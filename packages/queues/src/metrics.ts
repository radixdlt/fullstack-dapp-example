import { type ConnectionOptions, Queue, QueueEvents } from 'bullmq'
import client from 'prom-client'
import { Queues, getQueues } from './queues'
import http from 'http'
import type { AppLogger } from 'common'

export type QueueMetrics = ReturnType<typeof QueueMetrics>
export const QueueMetrics = (name: string) => {
  return {
    waitingJobs: new client.Gauge({
      name: `${name}_queue_waiting_jobs`,
      help: `The number of waiting jobs in the ${name} queue`
    }),
    completedJobs: new client.Gauge({
      name: `${name}_queue_completed_jobs`,
      help: `The number of completed jobs in the ${name} queue`
    }),
    failedJobs: new client.Gauge({
      name: `${name}_queue_failed_jobs`,
      help: `The number of failed jobs in the ${name} queue`
    }),
    activeJobs: new client.Gauge({
      name: `${name}_queue_active_jobs`,
      help: `The number of active jobs in the ${name} queue`
    })
  }
}

const setupQueueEvents = (input: {
  queue: Queue
  queueName: keyof typeof Queues
  connection: ConnectionOptions
  trackMetricsFn: QueueMetrics
  logger?: AppLogger
}) => {
  const queueEvent = new QueueEvents(input.queueName, { connection: input.connection })
  const childLogger = input.logger?.child({ queue: input.queueName, method: 'queueMetrics' })

  const setWaitingJobs = async () => {
    const value = await input.queue.getJobCountByTypes('wait')
    childLogger?.debug({ status: `waiting`, value })
    input.trackMetricsFn.waitingJobs.set(value)
  }
  queueEvent.on('waiting', async () => {
    await setWaitingJobs()
  })
  setWaitingJobs()

  const setProgressJobs = async () => {
    const value = await input.queue.getJobCountByTypes('active')
    childLogger?.debug({ status: `inProgress`, value })
    input.trackMetricsFn.activeJobs.set(value)
  }

  queueEvent.on('progress', async () => {
    await setProgressJobs()
  })
  setProgressJobs()

  const setFailedJobs = async () => {
    const value = await input.queue.getJobCountByTypes('failed')
    childLogger?.debug({ status: 'failed', value })
    input.trackMetricsFn.failedJobs.set(value)
  }

  queueEvent.on('failed', async () => {
    await setFailedJobs()
  })
  setFailedJobs()

  const setCompletedJobs = async () => {
    const value = await input.queue.getJobCountByTypes('completed')
    childLogger?.debug({ status: 'completed', value })
    input.trackMetricsFn.completedJobs.set(value)
  }

  queueEvent.on('completed', async () => {
    await setCompletedJobs()
  })
  setCompletedJobs()
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

  setupQueueEvents({
    queueName: Queues.TransactionQueue,
    connection,
    queue: transactionQueue.queue,
    trackMetricsFn: queueMetrics.transactionQueue,
    logger
  })
  setupQueueEvents({
    queueName: Queues.EventQueue,
    connection,
    queue: eventQueue.queue,
    trackMetricsFn: queueMetrics.eventQueue,
    logger
  })
  setupQueueEvents({
    queueName: Queues.SystemQueue,
    connection,
    queue: systemQueue.queue,
    trackMetricsFn: queueMetrics.systemQueue,
    logger
  })

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
  logger?.debug({ method: 'SetupQueueMetrics', port, url: `http://localhost:${port}/metrics` })

  return client
}
