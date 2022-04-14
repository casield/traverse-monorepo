import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import { ClientContext, ClientProvider } from '../src/providers/ClientProvider'
import * as Colyseus from 'colyseus.js'
import { useCallback, useState } from 'react'
const client = new Colyseus.Client('ws://localhost:2567')

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ClientProvider>
            <Component {...pageProps} />
        </ClientProvider>
    )
}

export default MyApp
