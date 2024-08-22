import type { GoldenTicket } from 'database'
import ExcelJS from 'exceljs'

const workbook = new ExcelJS.Workbook()
const sheet = workbook.addWorksheet('Batch Links')
sheet.columns = [
  {
    header: 'link',
    key: 'link',
    width: 40
  }
]

export const writeRows = (tickets: GoldenTicket[], baseUrl: string) => {
  tickets.forEach((ticket) => {
    sheet.addRow({ link: `${baseUrl}?t=${encodeURIComponent(ticket.id)}` })
  })
}

export const clear = () => {
  sheet.spliceRows(2, sheet.rowCount - 1)
}

export const download = async () => {
  const buffer = await workbook.csv.writeBuffer()
  const blob = new Blob([buffer], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'batch-links.csv'
  a.click()
  URL.revokeObjectURL(url)
}
