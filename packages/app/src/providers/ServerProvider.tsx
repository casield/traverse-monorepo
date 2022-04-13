import { createContext, useContext } from 'react'
import * as Colyseus from 'colyseus.js' // not necessary if included via <script> tag.

export type ClientContext = {
    client?: Colyseus.Client
}

export const ClientContext = createContext<ClientContext>({})
export const useClient = () => useContext(ClientContext)
