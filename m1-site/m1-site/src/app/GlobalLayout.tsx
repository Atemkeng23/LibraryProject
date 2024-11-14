// GlobalLayout.tsx
'use client'
import { useRouter } from "next/navigation"
import { FC, ReactElement } from "react"
import './GlobalLayout.css'
import { Button } from "../components/Button"

type Props = {
  children: ReactElement | ReactElement[]
}

export const GlobalLayout: FC<Props> = ({ children }) => {
  const router = useRouter()

  return (
      <div className="bg-slate-50">
        <Button onClick={() => router.push('/')}>Home</Button>
        <Button onClick={() => router.push('/books')}>Books</Button>
        <Button onClick={() => router.push('/authors')}>Authors</Button>
        <div className="absolute bg-slate-100 h-full w-full">
          {children}
        </div>
      </div>
  )
}
