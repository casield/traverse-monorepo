import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ClientContext } from '../src/providers/ServerProvider'
import * as Colyseus from 'colyseus.js'
const client = new Colyseus.Client('ws://localhost:2567')

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ClientContext.Provider value={{ client }}>
            <Component {...pageProps} />
        </ClientContext.Provider>
    )
}

export default MyApp
