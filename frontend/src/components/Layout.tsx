import Navbar from './Navbar'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="p-4">{children}</main>
    </>
  )
}
