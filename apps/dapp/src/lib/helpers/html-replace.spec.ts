import { htmlReplace } from './html-replace'
import { describe, expect, it } from 'vitest'

describe('htmlReplace', () => {
  it('should replace all occurrences of the keys with the values', () => {
    const out = htmlReplace('<div>{key1}</div><div>{key2}</div>', {
      key1: 'value1',
      key2: 'value2'
    })
    expect(out).toEqual('<div>value1</div><div>value2</div>')
  })
})
