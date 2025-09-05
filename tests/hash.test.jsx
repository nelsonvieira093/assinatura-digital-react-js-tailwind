import { describe, it, expect } from 'vitest'
import { bufferToHex } from '../src/utils/hash'

describe('bufferToHex', () => {
  it('converte corretamente', () => {
    const arr = new Uint8Array([0, 15, 255])
    const hex = bufferToHex(arr.buffer)
    expect(hex).toBe('000fff')
  })
})
