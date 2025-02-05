'use client'

import { Button } from "@nextui-org/react"
import ListView from './components/ListView'
import Link from "next/link"

export default function page(){
  return (
    <div className='h-screen flex flex-col '>
      <div className="flex justify-between">
      <h1>Products</h1>
      <Link href='/admin/products/form'><button className="bg-[#313131] text-sm text-white px-4 py-2 rounded-lg">Create</button></Link>
      </div>

      <ListView />

    </div>
  )
}
