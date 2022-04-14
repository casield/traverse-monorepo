import {
    createContext,
    FC,
    ReactElement,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react'
import * as Colyseus from 'colyseus.js' // not necessary if included via <script> tag.
import { onConnectRoom } from 'logic/onConnectRoom'

export type ClientContext = {
    client?: Colyseus.Client
    room?: Colyseus.Room
    connectToRoom?: () => void
    setMap?: (map: google.maps.Map) => void
    map?: google.maps.Map
}

export const ClientContext = createContext<ClientContext>({})
export const useClient = () => useContext(ClientContext)

const client = new Colyseus.Client('ws://localhost:2567')

export const ClientProvider: FC<{ children: ReactElement }> = (props) => {
    const [room, setRoom] = useState<Colyseus.Room>()
    const [map, setMapState] = useState<google.maps.Map>()
    const connectToRoom = useCallback(async () => {
        if (!map) throw Error('No map detected')
        const newRoom = await client.joinOrCreate('world_room')
        setRoom(newRoom)
        onConnectRoom(newRoom, map)
    }, [room, map])

    const setMap = useCallback(
        async (map: google.maps.Map) => {
            setMapState(map)
        },
        [map]
    )

    useEffect(() => {
        return () => {
            room?.leave(true)
        }
    }, [])

    return (
        <ClientContext.Provider
            value={{ client, room, connectToRoom, setMap, map }}
        >
            {props.children}
        </ClientContext.Provider>
    )
}
