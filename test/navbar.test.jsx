import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from '../src/components/Navbar'
import { CartProvider } from '../src/context/CartContext'
import { describe, it, expect } from 'vitest'

describe('Navbar', () => {
  it('syncs search input from URL on /products', () => {
    render(
      <MemoryRouter initialEntries={["/products?search=rose"]}>
        <CartProvider>
          <Navbar />
        </CartProvider>
      </MemoryRouter>
    )

    const inputs = screen.getAllByPlaceholderText(/search/i)
    const input = inputs.find((el) => el.value === 'rose')
    expect(input).toBeDefined()
    expect(input.value).toBe('rose')
  })
})
