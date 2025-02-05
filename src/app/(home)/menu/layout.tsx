
import Header from '@/components/Header'
import { CartProvider } from '@/store/CartProvider'
import React from 'react'

export default function layout({children}) {
  return (
    <div>    
        {children}
        </div>
  )
}
