import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ClientContext } from '../src/providers/ClientProvider'
import * as Colyseus from 'colyseus.js'
import { useCallback, useState } from 'react'
const client = new Colyseus.Client('ws://localhost:2567')

function MyApp({ Component, pageProps }: AppProps) {
    const [room, setRoom] = useState<Colyseus.Room>()
    const connectToRoom = useCallback(async () => {
        const newRoom = await client.joinOrCreate('world_room')
        setRoom(newRoom)
    }, [room])
    return (
        <ClientContext.Provider value={{ client, room, connectToRoom }}>
            <Component {...pageProps} />
        </ClientContext.Provider>
    )
}

export default MyApp
