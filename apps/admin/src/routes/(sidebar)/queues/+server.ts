import { error, json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import type { QueueName } from 'queues'

export type GetQueuesResponse = {
  queues: {
    name: string
    isPaused: boolean
    count: {
      [index: string]: number
    }
  }[]
}

export const GET: RequestHandler = async ({ locals }) => {
  const allQueues = Object.entries(locals.queues)

  const values: {
    name: string
    isPaused: boolean
    count: {
      [index: string]: number
    }
  }[] = []

  for (const [name, value] of allQueues) {
    values.push({
      name,
      isPaused: await value.queue.isPaused(),
      count: await value.queue.getJobCounts()
    })
    const bufferQueue = value.getBufferQueue()
    if (bufferQueue) {
      values.push({
        name: bufferQueue.name,
        isPaused: await bufferQueue.queue.isPaused(),
        count: await value.queue.getJobCounts()
      })
    }
  }

  return json({ queues: values }, { status: 200 })
}

export const PUT: RequestHandler = async ({ locals, request }) => {
  const { name, shouldPause }: { name: QueueName; shouldPause: boolean } = await request.json()

  const queue = locals.queues[name]

  if (!queue) return error(404, { message: 'Queue not found' })

  if (shouldPause) await queue.queue.pause()
  else await queue.queue.resume()

  return json({}, { status: 200 })
}
