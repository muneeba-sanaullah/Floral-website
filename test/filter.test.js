import { describe, it, expect } from 'vitest'
import filterProducts from '../src/utils/filterProducts'

const products = [
  { id: 1, name: 'Red Roses Bouquet', category: 'Bouquet' },
  { id: 2, name: 'Single Sunflower', category: 'Flower' },
  { id: 3, name: 'Chocolate Box', category: 'Gifts' },
]

describe('filterProducts', () => {
  it('returns all when search is empty', () => {
    const res = filterProducts(products, '', 'All')
    expect(res.length).toBe(3)
  })

  it('filters by token', () => {
    const res = filterProducts(products, 'rose', 'All')
    expect(res.map(p => p.id)).toEqual([1])
  })

  it('filters by category', () => {
    const res = filterProducts(products, '', 'Bouquet')
    expect(res.map(p => p.id)).toEqual([1])
  })

  it('fuzzy matches typos when enabled', () => {
    const res = filterProducts(products, 'rsoes', 'All', { fuzzy: true, threshold: 0.4 })
    expect(res.map(p => p.id)).toEqual([1])
  })
})
