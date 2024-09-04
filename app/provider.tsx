// wrapping our app with session provider
// there are lots of other provider like theme provider, redux provider, etc.
// we will create custom provider in root layout or  sub layout to wrap our app with it.
"use client"

import { SessionProvider } from "next-auth/react"

export function Providers({children}: {children: React.ReactNode}) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}