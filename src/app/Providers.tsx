
import { SessionProvider } from "next-auth/react"

 
export default function Providersarea({ children }: {
    children: React.ReactNode
}) {
  return (
    <SessionProvider >

     {children}
    </SessionProvider>
  )
}