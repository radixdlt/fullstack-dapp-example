import { createQrSvgDataUrl } from '@svelte-put/qr'
import type { GoldenTicket } from 'database'
import JSZip from 'jszip'

const downloadURI = (uri: string, name: string) => {
  const link = document.createElement('a')
  link.download = name
  link.href = uri
  link.click()
}

export const createZip = async (tickets: GoldenTicket[], baseUrl: string) => {
  const qrCodeUrls = await Promise.all(
    tickets.map(async (ticket) => ({
      id: ticket.id,
      url: await createQrSvgDataUrl({
        data: `${baseUrl}?t=${encodeURIComponent(ticket.id)}`
      })
    }))
  )

  const zip = new JSZip()
  qrCodeUrls.forEach(({ url, id }) => {
    zip.file(`qr-code-${id}.svg`, url.split(',')[1], { base64: true })
  })
  const content = await zip.generateAsync({ type: 'blob' })
  const url = URL.createObjectURL(content)
  downloadURI(url, 'qr-codes.zip')
}
