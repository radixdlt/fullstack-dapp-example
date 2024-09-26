import type { GoldenTicket } from 'database'
import ExcelJS from 'exceljs'
import Papa from 'papaparse'

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
  while (sheet.rowCount > 1) {
    sheet.spliceRows(2, 1)
  }
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

export const readRows = async (file: File) => {
  const tickets: string[] = []

  let resolve: (value: string[]) => void
  const promise = new Promise<string[]>((_resolve) => {
    resolve = _resolve
  })

  Papa.parse(file, {
    complete(results: Papa.ParseResult<string>) {
      results.data.forEach((row, i) => {
        if (i > 0) tickets.push(new URL(row[0]).searchParams.get('t')!)
        if (i === results.data.length - 1) resolve(tickets)
      })
    }
  })

  return promise
}
